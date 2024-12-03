import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},  // Function to add item to cart
  removeCartItem: () => {}, // Function to remove item from cart
  removeAllCartItems: () => {}, // Function to remove all items
  incrementCartItemQuantity: () => {}, // Function to increment quantity
  decrementCartItemQuantity: () => {}, // Function to decrement quantity
})

export default CartContext
