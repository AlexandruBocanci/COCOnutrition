import { useMemo, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { searchProducts } from '../data/products'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)

  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchProducts(query)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = searchInput.trim()
    if (!value) return
    navigate(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Acasa
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Cautare</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {query ? `Rezultate cautare pentru "${query}"` : 'Cautare'}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-2xl mb-4">
          <div className="flex gap-3">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cauta produse, branduri, categorii..."
              className="flex-1 h-12 px-4 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="px-5 h-12 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
              Cauta
            </button>
          </div>
        </form>
        <p className="text-muted-foreground">
          {results.length} {results.length === 1 ? 'produs gasit' : 'produse gasite'}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {query && results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">Nu am gasit produse pentru "{query}".</p>
            <p className="text-muted-foreground mb-6">Incearca un termen mai general sau navigheaza prin categorii.</p>
            <Link to="/category/sport-nutrition" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Vezi produse
            </Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Introdu un termen de cautare pentru a gasi produse.</p>
          </div>
        )}
      </div>
    </div>
  )
}
