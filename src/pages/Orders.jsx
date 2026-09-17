import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const statusSteps = ['Order Placed', 'Processing', 'Shipped', 'Delivered']

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Orders() {
  const { getOrders } = useCart()
  const orders = getOrders()

  if (orders.length === 0) {
    return (
      <div className="page-wrap">
        <div className="empty-state">
          <div className="empty-icon">&#128230;</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders. Start shopping to see them here.</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const stepIndex = statusSteps.indexOf(order.status)
          return (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <span className="order-card-id">Order #{order.id}</span>
                  <span className="order-card-date">{formatDate(order.date)}</span>
                </div>
                <span className={`order-status order-status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-info">
                      <Link to={`/product/${item.id}`} className="order-item-name">{item.name}</Link>
                      <span className="order-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="order-item-price">
                      &#8377;{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <div className="order-progress">
                  {statusSteps.map((step, i) => (
                    <div
                      key={step}
                      className={`order-progress-step ${i <= stepIndex ? 'active' : ''}`}
                    >
                      <span className="order-progress-dot"></span>
                      <span className="order-progress-label">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <strong>&#8377;{order.grandTotal.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
