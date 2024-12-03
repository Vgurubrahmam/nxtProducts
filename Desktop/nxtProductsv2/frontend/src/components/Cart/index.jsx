import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'
import { toast } from 'react-toastify'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      
      const handleRemoveAll=()=>{
        const removeAllConfirmed=window.confirm("You want to remove all items in cart")
      if(removeAllConfirmed){
removeAllCartItems()
toast.success("All items removed from the  cart!")
      }
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button className="removeAll-btn" onClick={handleRemoveAll}>
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="cartSummary-con">
                  <CartSummary />
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
