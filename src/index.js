import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from './AllRoutes';
import { store } from './app/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}><App /></Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
