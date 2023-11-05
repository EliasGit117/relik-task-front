import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/api/axios-api.ts';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
