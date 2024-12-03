import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from './context/CartContext';

import './App.css';
import SignUpForm from './components/SignUpForm';

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const storedCartList = localStorage.getItem('cartList');
    return storedCartList ? JSON.parse(storedCartList) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  const removeCartItem = (id) => {
    setCartList((prevCartList) =>
      prevCartList.filter((eachProduct) => eachProduct.id !== id)
    );
  };

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const addCartItem = (product) => {
    setCartList((prevCartList) => {
      const existingProduct = prevCartList.find(
        (eachProduct) => eachProduct.id === product.id
      );
      if (existingProduct) {
        return prevCartList.map((eachProduct) =>
          eachProduct.id === product.id
            ? {
                ...eachProduct,
                quantity: eachProduct.quantity + (product.quantity || 1),
              }
            : eachProduct
        );
      }
      return [...prevCartList, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const incrementCartItemQuantity = (cartItemDetails) => {
    setCartList((prevCartList) =>
      prevCartList.map((eachProduct) =>
        eachProduct.id === cartItemDetails.id
          ? { ...eachProduct, quantity: eachProduct.quantity + 1 }
          : eachProduct
      )
    );
  };

  const decrementCartItemQuantity = (cartItemDetails) => {
    setCartList((prevCartList) =>
      prevCartList
        .map((eachProduct) => {
          if (eachProduct.id === cartItemDetails.id) {
            const updatedQuantity = eachProduct.quantity - 1;
            return updatedQuantity > 0
              ? { ...eachProduct, quantity: updatedQuantity }
              : null;
          }
          return eachProduct;
        })
        .filter((eachProduct) => eachProduct !== null)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductItemDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </CartContext.Provider>
  );
};

export default App;
