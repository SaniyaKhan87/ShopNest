import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import { getFeaturedProducts, categories, categoryImages, heroImage } from '../data/products'

export default function Home() {
  const featured = getFeaturedProducts()

  const whyCards = [
    { icon: '\u{1F6CD}', title: 'Easy Shopping', desc: 'Browse, search, and filter products effortlessly with a clean interface.' },
    { icon: '\u2714', title: 'Quality Products', desc: 'Carefully curated products across electronics, fashion, and home needs.' },
    { icon: '\u{1F6D2}', title: 'Simple Checkout', desc: 'A straightforward checkout flow with clear order summaries.' },
    { icon: '\u{1F69A}', title: 'Fast Delivery', desc: 'Free delivery on orders over &#8377;999, so you get more for less.' },
  ]

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-badge">Welcome to ShopNest</span>
            <h1 className="hero-title">Everything You Need, All in One Place.</h1>
            <p className="hero-desc">
              Discover quality products, explore new collections, and enjoy a
              simple shopping experience with ShopNest.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
              <Link to="/products" className="btn btn-outline btn-lg">Explore Products</Link>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroImage} alt="ShopNest online shopping" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="section-link">View All &rarr;</Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section section-alt">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat} name={cat} image={categoryImages[cat]} />
          ))}
        </div>
      </section>

      {/* Why ShopNest */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Why ShopNest</h2>
        </div>
        <div className="why-grid">
          {whyCards.map((w) => (
            <div key={w.title} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <h3 className="why-title">{w.title}</h3>
              <p className="why-desc" dangerouslySetInnerHTML={{ __html: w.desc }} />
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-inner">
          <h2 className="promo-title">Find Something You'll Love</h2>
          <p className="promo-desc">
            Explore our full collection of products across every category.
          </p>
          <Link to="/products" className="btn btn-white btn-lg">Explore Collection</Link>
        </div>
      </section>
    </div>
  )
}
