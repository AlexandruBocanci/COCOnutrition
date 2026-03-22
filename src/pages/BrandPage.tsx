import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getProductsByBrand } from '../data/products'
import { getBrandBySlug } from '../data/categories'

export default function BrandPage() {
  const { brand } = useParams()
  const brandData = brand ? getBrandBySlug(brand) : null
  const brandProducts = brand ? getProductsByBrand(brand) : []

  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Brand inexistent</h1>
          <p className="text-muted-foreground mb-4">Brandul cautat nu exista.</p>
          <Link to="/" className="text-accent hover:text-accent/80">
            Inapoi la acasa
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Acasa
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Branduri</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{brandData.name}</span>
          </nav>
        </div>
      </div>

      {/* Brand Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{brandData.name}</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">{brandData.description}</p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {brandProducts.length} {brandProducts.length === 1 ? 'produs' : 'produse'}
          </p>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Nu exista inca produse disponibile pentru acest brand.</p>
          </div>
        )}
      </div>
    </div>
  )
}

