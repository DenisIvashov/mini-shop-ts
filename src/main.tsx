import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  HashRouter, Routes, Route } from 'react-router-dom'
import { CartContext } from './context/CartContext';
import { useState } from 'react';
import type { CartItem } from './context/CartContext';
import App from './App';
import './App.css'
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import SuccessPage from './pages/SuccessPage';
import NotFoundPage from './pages/NotFoundPage';

function Root() {
    const [cart, setCart] = useState<CartItem[]>([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<CatalogPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="success" element={<SuccessPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
        </CartContext.Provider>
    );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
        <Root />
    </HashRouter>
  </StrictMode>,
)