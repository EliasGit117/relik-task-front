import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/lib/axios-config.ts';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
