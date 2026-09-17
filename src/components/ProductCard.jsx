import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image-link">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-card-image"
        />
      </Link>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-card-name">
          {product.name}
        </Link>
        <div className="product-card-rating">
          <span className="rating-star">&#9733;</span>
          {product.rating.toFixed(1)}
        </div>
        <div className="product-card-price">&#8377;{product.price.toLocaleString('en-IN')}</div>
        <div className="product-card-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
