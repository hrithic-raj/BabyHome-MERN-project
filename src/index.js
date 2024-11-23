import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext';
// import { BuyContext, BuyProvider } from './contexts/BuyContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './Redux/store/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
          <App />
          <ToastContainer />
      </Provider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

