import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">SN</span>
            <span className="footer-logo-text">ShopNest</span>
          </div>
          <p className="footer-desc">
            Everything You Need, All in One Place. Quality products at honest
            prices, delivered to your door.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?category=Electronics">Electronics</Link></li>
            <li><Link to="/products?category=Fashion">Fashion</Link></li>
            <li><Link to="/products?category=Home%20%26%20Living">Home & Living</Link></li>
            <li><Link to="/products?category=Accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>Email: support@shopnest.in</li>
            <li>Phone: +91 98765 43210</li>
            <li>Mumbai, Maharashtra, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</p>
      </div>
    </footer>
  )
}
