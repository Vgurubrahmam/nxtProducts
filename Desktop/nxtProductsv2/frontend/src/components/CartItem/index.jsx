import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'

import './index.css'
import { toast } from 'react-toastify'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      
        
      const onRemoveCartItem = (title) => {
        const eachItemRemove=window.confirm("You want to remove cart?")
      if(eachItemRemove){
        removeCartItem(id)
        toast.success(`${title} removed from cart!`)

      }}
      // TODO: Update the functionality to increment and decrement quantity of the cart item
      const onIncrementCartItemQuantity = () => {
        incrementCartItemQuantity(cartItemDetails)
      }
      const onDncrementCartItemQuantity = () => {
  if (quantity > 1) {
    decrementCartItemQuantity(cartItemDetails)
  } else {
    removeCartItem(id) 
    toast.success(`${title} removed from cart!`)
  }
}
      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={()=>onDncrementCartItemQuantity(title,quantity)}
                data-testid="minus"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementCartItemQuantity}
                data-testid="plus"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                data-testid="remove"
                onClick={()=>onRemoveCartItem(title)}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={()=>onRemoveCartItem(title)}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
