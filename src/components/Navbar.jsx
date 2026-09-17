import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartCount } = useCart()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    'navbar-link' + (isActive ? ' navbar-link-active' : '')

  const closeMenu = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-icon">SN</span>
          <span className="navbar-logo-text">ShopNest</span>
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`navbar-toggle-bar ${open ? 'open' : ''}`}></span>
          <span className={`navbar-toggle-bar ${open ? 'open' : ''}`}></span>
          <span className={`navbar-toggle-bar ${open ? 'open' : ''}`}></span>
        </button>

        <nav className={`navbar-nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink to="/orders" className={linkClass} onClick={closeMenu}>
            Orders
          </NavLink>
          <NavLink to="/cart" className={linkClass} onClick={closeMenu}>
            Cart
            {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
