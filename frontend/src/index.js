import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct method for React 18+
import App from './App';
import './index.css';

// Create the root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
