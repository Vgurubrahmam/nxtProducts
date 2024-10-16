import {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const storedCartList = localStorage.getItem('cartList')
    return storedCartList ? JSON.parse(storedCartList) : []
  })
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])
  const removeCartItem = id => {
    setCartList(prevCartList =>
      prevCartList.filter(eachProduct => eachProduct.id !== id),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const addCartItem = product => {
    setCartList(prevCartList => {
      const existingProduct = prevCartList.find(
        eachProduct => eachProduct.id === product.id,
      )
      if (existingProduct) {
        return prevCartList.map(eachProduct =>
          eachProduct.id === product.id
            ? {
                ...eachProduct,
                quantity: eachProduct.quantity + product.quantity,
              }
            : eachProduct,
        )
      }
      return [...prevCartList, {...product, quantity: product.quantity}]
    })
  }

  const incrementCartItemQuantity = cartItemDetails => {
    setCartList(prevCartList =>
      prevCartList.map(eachProduct =>
        eachProduct.id === cartItemDetails.id
          ? {...eachProduct, quantity: eachProduct.quantity + 1}
          : eachProduct,
      ),
    )
  }

  const decrementCartItemQuantity = cartItemDetails => {
    setCartList(prevCartList =>
      prevCartList
        .map(eachProduct => {
          if (eachProduct.id === cartItemDetails.id) {
            const updatedQuantity = eachProduct.quantity - 1
            return updatedQuantity > 0
              ? {...eachProduct, quantity: updatedQuantity}
              : null
          }
          return eachProduct
        })
        .filter(eachProduct => eachProduct !== null),
    )
  }

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
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/products/:id"
          component={ProductItemDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
