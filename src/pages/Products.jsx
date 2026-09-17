import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All Categories'

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const c = searchParams.get('category') || 'All Categories'
    setCategory(c)
  }, [searchParams])

  const updateCategory = (cat) => {
    setCategory(cat)
    if (cat === 'All Categories') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'All Categories') {
      list = list.filter((p) => p.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return list
  }, [category, search, sort])

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">All Products</h1>
        <p className="page-subtitle">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      <div className="products-toolbar">
        <div className="toolbar-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="toolbar-filters">
          <select
            className="filter-select"
            value={category}
            onChange={(e) => updateCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#128269;</div>
          <h2>No products found</h2>
          <p>Try adjusting your search or filters to find what you need.</p>
          <button
            className="btn btn-primary"
            onClick={() => { setSearch(''); updateCategory('All Categories'); setSort('default') }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
