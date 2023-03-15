import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import {
  AboutPage,
  HomePage,
  CartPage,
  ErrorPage,
  SingleProductPage,
  CheckoutPage,
  ProductsPage,
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='products/:id' element={<SingleProductPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
