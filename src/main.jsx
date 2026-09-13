import React from'react';
import{createRoot}from'react-dom/client';
import ExactApp from'./exact-app.jsx';
import'./reference-images.css';

createRoot(document.getElementById('root')).render(<ExactApp/>);
