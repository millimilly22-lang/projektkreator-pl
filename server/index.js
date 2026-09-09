import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 5175);
const PUBLIC_APP_URL = process.env.PUBLIC_APP_URL || 'http://localhost:5174';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'liashany4@gmail.com';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || OWNER_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM = process.env.RESEND_FROM || 'ProjektKreator.pl <onboarding@resend.dev>';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'requests.json');
fs.mkdirSync(DATA_DIR, { recursive: true });

function readStore() {
  try {
    if (fs.existsSync(STORE_PATH)) return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
  } catch {}
  return { seqByYear: {}, requests: [] };
}
function writeStore(store) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}
function clean(v='') { return String(v ?? '').trim(); }
function safeHtml(v='') { return clean(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function nextTicket() {
  const store = readStore();
  const year = new Date().getFullYear();
  const next = Number(store.seqByYear[year] || 0) + 1;
  store.seqByYear[year] = next;
  const ticket = `PK-${year}-${String(next).padStart(3,'0')}`;
  return { store, next, ticket };
}

async function sendResendEmail({ to, subject, html, replyTo, attachments=[] }) {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');
  const payload = {
    from: RESEND_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    reply_to: replyTo,
    attachments
  };
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Resend error ${response.status}`);
  return data;
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 5 }
});

app.get('/api/health', (_, res) => res.json({ ok:true, emailConfigured:!!RESEND_API_KEY, provider:'resend', owner:CONTACT_EMAIL }));
app.get('/api/settings/public', (_, res) => res.json({ settings: { email: CONTACT_EMAIL, company_name:'ProjektKreator.pl', website: PUBLIC_APP_URL } }));

app.post('/api/requests', upload.array('files', 5), async (req, res) => {
  try {
    const body = req.body || {};
    const kind = clean(body.kind) === 'question' ? 'question' : 'project';
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const message = clean(body.message || body.description);
    if (!name || !email || !message) return res.status(400).json({ error:'Podaj imię, e-mail i treść zgłoszenia.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error:'Podaj poprawny adres e-mail.' });
    if (!RESEND_API_KEY) return res.status(503).json({ error:'Wysyłka e-mail nie jest jeszcze skonfigurowana.' });

    const { store, next, ticket } = nextTicket();
    const createdAt = new Date().toISOString();
    const record = {
      ticket, queueNumber:next, kind, name, email, phone,
      service:clean(body.service), price:clean(body.price), businessName:clean(body.businessName),
      industry:clean(body.industry), website:clean(body.website), style:clean(body.style), color:clean(body.color),
      extras:clean(body.extras), message, filenames:(req.files||[]).map(f=>f.originalname), createdAt
    };

    const ownerSubject = `${ticket} — ${kind === 'project' ? 'Nowy projekt' : 'Nowe pytanie'} od ${name}`;
    const ownerHtml = `
      <h2>${safeHtml(ownerSubject)}</h2>
      <p><strong>Numer zgłoszenia:</strong> ${ticket}<br><strong>Numer w kolejce:</strong> #${next}</p>
      <p><strong>Klient:</strong> ${safeHtml(name)}<br><strong>E-mail:</strong> ${safeHtml(email)}${phone?`<br><strong>Telefon:</strong> ${safeHtml(phone)}`:''}</p>
      ${record.service?`<p><strong>Usługa:</strong> ${safeHtml(record.service)} ${record.price?`— ${safeHtml(record.price)}`:''}</p>`:''}
      ${record.businessName?`<p><strong>Firma / projekt:</strong> ${safeHtml(record.businessName)}</p>`:''}
      ${record.industry?`<p><strong>Branża:</strong> ${safeHtml(record.industry)}</p>`:''}
      ${record.website?`<p><strong>Obecna strona:</strong> ${safeHtml(record.website)}</p>`:''}
      ${record.style?`<p><strong>Styl:</strong> ${safeHtml(record.style)}${record.color?` • ${safeHtml(record.color)}`:''}</p>`:''}
      ${record.extras?`<p><strong>Dodatki:</strong> ${safeHtml(record.extras)}</p>`:''}
      <hr><p><strong>Treść:</strong></p><p>${safeHtml(message).replace(/\n/g,'<br>')}</p>
      <p>Odpowiedz na tę wiadomość — pole Reply-To jest ustawione na adres klienta.</p>`;

    const attachments = (req.files || []).map(f => ({
      filename: f.originalname,
      content: f.buffer.toString('base64')
    }));

    await sendResendEmail({
      to: OWNER_EMAIL,
      subject: ownerSubject,
      html: ownerHtml,
      replyTo: email,
      attachments
    });

    store.requests.unshift(record);
    store.requests = store.requests.slice(0, 1000);
    writeStore(store);

    res.status(201).json({ ticket, queueNumber:next, kind, emailSent:true });
  } catch (error) {
    console.error('Request email error:', error);
    res.status(500).json({ error:'Nie udało się wysłać wiadomości. Spróbuj ponownie.' });
  }
});

const dist = path.join(rootDir, 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => console.log(`ProjektKreator.pl: http://localhost:${PORT}`));
