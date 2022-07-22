import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import Banners from './components/Banners';
import Footer from './components/Footer';

export default function App () {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Banners />
        <AppRoutes />
        <ToastContainer autoClose={3000} />
      </CartProvider>
      <Footer />
    </BrowserRouter>
  );
};
