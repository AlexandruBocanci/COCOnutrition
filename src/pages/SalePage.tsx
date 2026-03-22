import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Tag } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getProductsBySaleType } from '../data/products'
import { getSaleCategoryBySlug, saleCategories } from '../data/categories'
import { cn } from '@/lib/utils'

export default function SalePage() {
  const { saleType } = useParams()
  const saleCategory = saleType ? getSaleCategoryBySlug(saleType) : null
  const products = getProductsBySaleType(saleType)

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
            <Link
              to="/sale"
              className={cn(
                !saleType ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground transition-colors"
              )}
            >
              Reduceri
            </Link>
            {saleCategory && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{saleCategory.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Sale Header */}
      <div className="bg-accent text-accent-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-8 h-8" />
            <h1 className="text-3xl lg:text-4xl font-bold">
              {saleCategory ? saleCategory.name : 'Reduceri si oferte'}
            </h1>
          </div>
          <p className="text-accent-foreground/80 text-lg max-w-2xl">
            {saleCategory ? saleCategory.description : 'Descopera cele mai bune promotii la suplimente premium si produse de nutritie.'}
          </p>
        </div>
      </div>

      {/* Sale Categories */}
      {!saleType && (
        <div className="bg-card border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {saleCategories.map(category => (
                <Link
                  key={category.slug}
                  to={`/sale/${category.slug}`}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-accent/10 transition-colors group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? 'produs' : 'produse'} la reducere
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Nu exista produse la reducere momentan.</p>
            <Link to="/" className="inline-block mt-4 text-accent hover:text-accent/80">
              Continua cumparaturile
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
