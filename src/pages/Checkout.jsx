import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
}

export default function Checkout() {
  const { cart, subtotal, delivery, grandTotal, placeOrder } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [placedOrder, setPlacedOrder] = useState(null)

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="page-wrap">
        <div className="empty-state">
          <div className="empty-icon">&#128722;</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some products before checking out.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  if (placedOrder) {
    return (
      <div className="page-wrap">
        <div className="order-success">
          <div className="order-success-icon">&#10004;</div>
          <h1 className="order-success-title">Order Placed Successfully!</h1>
          <p className="order-success-desc">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="order-success-id">
            <span>Order ID</span>
            <strong>{placedOrder.id}</strong>
          </div>
          <div className="order-success-actions">
            <Link to="/orders" className="btn btn-primary btn-lg">View Orders</Link>
            <Link to="/products" className="btn btn-outline btn-lg">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Enter a valid 10-digit phone'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!form.pincode.trim()) e.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(form.pincode.replace(/\D/g, ''))) e.pincode = 'Enter a valid 6-digit pincode'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    const order = placeOrder(form)
    setPlacedOrder(order)
  }

  const formFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210' },
    { name: 'address', label: 'Address', type: 'text', placeholder: '123 Main Street, Apartment 4' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Mumbai' },
    { name: 'state', label: 'State', type: 'text', placeholder: 'Maharashtra' },
    { name: 'pincode', label: 'Pincode', type: 'text', placeholder: '400001' },
  ]

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">Complete your order details below</p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
        <div className="checkout-form">
          <h2 className="checkout-section-title">Customer Details</h2>
          <div className="form-grid">
            {formFields.map((f) => (
              <div key={f.name} className={`form-field ${f.name === 'address' ? 'form-field-full' : ''}`}>
                <label htmlFor={f.name} className="form-label">{f.label}</label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  className={`form-input ${errors[f.name] ? 'form-input-error' : ''}`}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange}
                />
                {errors[f.name] && <span className="form-error">{errors[f.name]}</span>}
              </div>
            ))}
          </div>
        </div>

        <aside className="checkout-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="checkout-summary-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-summary-item">
                <img src={item.image} alt={item.name} className="checkout-summary-item-image" />
                <div className="checkout-summary-item-info">
                  <span className="checkout-summary-item-name">{item.name}</span>
                  <span className="checkout-summary-item-qty">
                    {item.quantity} &times; &#8377;{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="checkout-summary-item-total">
                  &#8377;{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
          <div className="cart-summary-divider"></div>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery</span>
            <span>
              {delivery === 0 ? <span className="free-delivery">FREE</span> : `₹${delivery}`}
            </span>
          </div>
          <div className="cart-summary-divider"></div>
          <div className="cart-summary-row cart-summary-total">
            <span>Grand Total</span>
            <span>&#8377;{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Place Order
          </button>
        </aside>
      </form>
    </div>
  )
}
