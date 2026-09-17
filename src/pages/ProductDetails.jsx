import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="page-wrap">
        <div className="empty-state">
          <div className="empty-icon">&#128533;</div>
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  return (
    <div className="page-wrap">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/products">Products</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <span className="product-card-category">{product.category}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-rating">
            <span className="rating-star">&#9733;</span>
            {product.rating.toFixed(1)} / 5.0
          </div>
          <div className="product-detail-price">
            &#8377;{product.price.toLocaleString('en-IN')}
          </div>
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-qty">
            <label className="qty-label">Quantity</label>
            <div className="qty-selector">
              <button
                className="qty-btn qty-btn-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                &minus;
              </button>
              <span className="qty-value qty-value-lg">{quantity}</span>
              <button
                className="qty-btn qty-btn-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-detail-actions">
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-accent btn-lg" onClick={handleBuyNow}>
              Buy Now
            </button>
            <Link to="/products" className="btn btn-outline btn-lg">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
