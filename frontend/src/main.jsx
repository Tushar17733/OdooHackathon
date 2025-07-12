import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'; // <--- UPDATED: .jsx extension
import { AuthProvider } from './contexts/AuthContext.jsx'; // <--- UPDATED: .jsx extension
import './index.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';  // or any theme you like
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);