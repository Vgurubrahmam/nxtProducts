// Write your code here
import {Link} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartListCount = cartList.length
      const priceOfCarts = cartList.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0,
      )
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      const makePayment = async () => {
        const stripe = await loadStripe('')
      }
      return (
        <div className="totalCart">
          <h1>
            <span>Order Total:</span> Rs {priceOfCarts}/-
          </h1>
          <p>{cartListCount} items in cart</p>
          <div>
            <Link to="/cart">
              {' '}
              <button className="checkout-btn" onClick={scrollToTop}>
                Checkout
              </button>
              <button onClick={makePayment}>Buy Now</button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
