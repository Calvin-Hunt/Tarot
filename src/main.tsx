import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { ReadingProvider } from '@/context/ReadingContext';
import { StarfieldCanvas } from '@/components/StarfieldCanvas';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PreferencesProvider>
      <ReadingProvider>
        <StarfieldCanvas />
        <App />
      </ReadingProvider>
    </PreferencesProvider>
  </React.StrictMode>,
);
