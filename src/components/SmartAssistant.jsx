import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
}

function matchCategory(tokens) {
  for (const cat of categories) {
    const catTokens = cat.toLowerCase().split(/\s+/)
    if (catTokens.some((ct) => tokens.includes(ct))) return cat
  }
  if (tokens.includes('travel')) return 'Accessories'
  if (tokens.includes('wear') || tokens.includes('wearable')) return 'Electronics'
  return null
}

function extractBudget(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t === 'under' && i + 1 < tokens.length) {
      const n = parseInt(tokens[i + 1].replace(/[^0-9]/g, ''), 10)
      if (!isNaN(n)) return n
    }
    if (t === 'below' && i + 1 < tokens.length) {
      const n = parseInt(tokens[i + 1].replace(/[^0-9]/g, ''), 10)
      if (!isNaN(n)) return n
    }
    const match = t.match(/^(\d{2,6})$/)
    if (match) {
      const n = parseInt(match[1], 10)
      if (n >= 50) return n
    }
  }
  return null
}

function extractKeywords(tokens) {
  const stop = new Set([
    'i', 'need', 'want', 'looking', 'for', 'something', 'please', 'show',
    'me', 'find', 'get', 'buy', 'a', 'an', 'the', 'under', 'below', 'above',
    'and', 'with', 'that', 'is', 'are', 'to', 'my',
  ])
  return tokens.filter((t) => !stop.has(t))
}

function recommend(query) {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  const category = matchCategory(tokens)
  const budget = extractBudget(tokens)
  const keywords = extractKeywords(tokens)

  let results = products.map((p) => {
    let score = 0
    const nameTokens = tokenize(p.name)
    const descTokens = tokenize(p.description)
    keywords.forEach((kw) => {
      if (nameTokens.includes(kw)) score += 3
      else if (descTokens.includes(kw)) score += 1
      else if (nameTokens.some((nt) => nt.includes(kw) || kw.includes(nt))) score += 2
    })
    if (category && p.category === category) score += 4
    if (budget) {
      if (p.price <= budget) score += 3
      else score -= 2
    }
    return { ...p, score }
  })

  results = results.filter((r) => r.score > 0)
  if (budget) results = results.filter((r) => r.price <= budget)
  results.sort((a, b) => b.score - a.score || b.rating - a.rating)
  return results.slice(0, 3)
}

const suggestions = [
  'I need something for travel under 1500',
  'Show me electronics under 2000',
  'Looking for fashion items',
  'Something for my desk',
]

export default function SmartAssistant() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) return
    setResults(recommend(query))
    setSearched(true)
  }

  const handleSuggestion = (s) => {
    setQuery(s)
    setResults(recommend(s))
    setSearched(true)
  }

  const reset = () => {
    setQuery('')
    setResults([])
    setSearched(false)
  }

  return (
    <>
      <button
        className="sa-fab"
        onClick={() => setOpen(!open)}
        aria-label="ShopNest Smart Assistant"
      >
        {open ? '\u2715' : '\u2764'}
      </button>

      {open && (
        <div className="sa-panel">
          <div className="sa-header">
            <div>
              <h3 className="sa-title">ShopNest Assistant</h3>
              <p className="sa-subtitle">Tell us what you need</p>
            </div>
            <button className="sa-close" onClick={() => setOpen(false)} aria-label="Close">
              &times;
            </button>
          </div>

          <div className="sa-search">
            <input
              type="text"
              className="sa-input"
              placeholder="e.g. travel under 1500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSearch}>
              Suggest
            </button>
          </div>

          {!searched && (
            <div className="sa-suggestions">
              <p className="sa-suggestion-label">Try:</p>
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="sa-suggestion-chip"
                  onClick={() => handleSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {searched && (
            <div className="sa-results">
              {results.length === 0 ? (
                <p className="sa-no-results">
                  No matching products found. Try different keywords.
                </p>
              ) : (
                results.map((p) => (
                  <div key={p.id} className="sa-result-card">
                    <img src={p.image} alt={p.name} className="sa-result-image" />
                    <div className="sa-result-info">
                      <Link
                        to={`/product/${p.id}`}
                        onClick={() => setOpen(false)}
                        className="sa-result-name"
                      >
                        {p.name}
                      </Link>
                      <div className="sa-result-meta">
                        <span className="sa-result-price">
                          &#8377;{p.price.toLocaleString('en-IN')}
                        </span>
                        <span className="sa-result-rating">
                          &#9733; {p.rating.toFixed(1)}
                        </span>
                      </div>
                      <Link
                        to={`/product/${p.id}`}
                        onClick={() => setOpen(false)}
                        className="sa-result-link"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                ))
              )}
              <button className="sa-reset" onClick={reset}>
                Search again
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
