import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { FirebaseProvider } from './utils/firebaseContext.tsx';
import './index.css';

declare global {
  interface Window {
    DiacoSEO?: {
      set: (meta: Record<string, any>) => void;
      reset?: () => void;
      [key: string]: any;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </HelmetProvider>
  </StrictMode>,
);

// Register PWA Service Worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('PWA ServiceWorker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.error('PWA ServiceWorker registration failed:', error);
      });
  });
}

