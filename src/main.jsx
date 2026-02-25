import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { validateEnv } from './utils/validateEnv'

// Validate environment variables before rendering app
// This will throw an error with helpful instructions if required vars are missing
try {
  validateEnv();
} catch (error) {
  // Show error in the UI instead of blank page
  const root = document.getElementById('root');
  root.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #1a1a1a;
      color: #fff;
      font-family: monospace;
      padding: 2rem;
    ">
      <div style="
        max-width: 600px;
        padding: 2rem;
        background: #2a2a2a;
        border: 2px solid #c9a961;
        border-radius: 8px;
      ">
        <h1 style="color: #c9a961; margin-bottom: 1rem;">⚠️ Configuration Error</h1>
        <p style="margin-bottom: 1rem;">Required environment variables are missing.</p>
        <p style="margin-bottom: 1rem; color: #888;">
          Please check the browser console for detailed instructions.
        </p>
        <code style="
          display: block;
          padding: 1rem;
          background: #1a1a1a;
          border-radius: 4px;
          overflow-x: auto;
        ">${error.message}</code>
      </div>
    </div>
  `;
  throw error; // Re-throw to show in console
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
