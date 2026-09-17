import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, subtotal, delivery, grandTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="page-wrap">
        <div className="empty-state">
          <div className="empty-icon">&#128722;</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery</span>
            <span>
              {delivery === 0 ? (
                <span className="free-delivery">FREE</span>
              ) : (
                `₹${delivery}`
              )}
            </span>
          </div>
          {delivery > 0 && (
            <p className="cart-summary-note">
              Add &#8377;{(999 - subtotal).toLocaleString('en-IN')} more for FREE delivery
            </p>
          )}
          <div className="cart-summary-divider"></div>
          <div className="cart-summary-row cart-summary-total">
            <span>Grand Total</span>
            <span>&#8377;{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="btn btn-outline btn-block">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
