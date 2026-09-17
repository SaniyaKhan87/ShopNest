import { Link } from 'react-router-dom'

export default function CategoryCard({ name, image }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(name)}`}
      className="category-card"
    >
      <div className="category-card-image-wrap">
        <img src={image} alt={name} className="category-card-image" />
      </div>
      <div className="category-card-body">
        <h3 className="category-card-name">{name}</h3>
        <span className="category-card-cta">Shop Now &rarr;</span>
      </div>
    </Link>
  )
}
