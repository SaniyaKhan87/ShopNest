import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartItem({ item }) {
  const { incrementItem, decrementItem, removeItem } = useCart()

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item-image-link">
        <img src={item.image} alt={item.name} className="cart-item-image" />
      </Link>
      <div className="cart-item-info">
        <Link to={`/product/${item.id}`} className="cart-item-name">
          {item.name}
        </Link>
        <span className="cart-item-category">{item.category}</span>
        <div className="cart-item-price">&#8377;{item.price.toLocaleString('en-IN')}</div>
      </div>
      <div className="cart-item-qty">
        <button
          className="qty-btn"
          onClick={() => decrementItem(item.id)}
          aria-label="Decrease quantity"
        >
          &minus;
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => incrementItem(item.id)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        &#8377;{(item.price * item.quantity).toLocaleString('en-IN')}
      </div>
      <button
        className="cart-item-remove"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        Remove
      </button>
    </div>
  )
}
