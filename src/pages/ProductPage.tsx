import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Star, Minus, Plus, ShoppingBag, Check, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import { getProductBySlug, getProductsByCategory } from '../data/products'
import { getCategoryBySlug, getSubcategoryBySlug } from '../data/categories'
import { cn } from '@/lib/utils'
import { getProductImage } from '../lib/images'
import { formatRON } from '../lib/currency'

function getNutritionFacts(product: ReturnType<typeof getProductBySlug> | null) {
  if (!product) return []

  const protein = product.category === 'sport-nutrition' ? 24 : product.category === 'food-snacks' ? 15 : 0
  const carbs = product.category === 'sport-nutrition' ? 4 : product.category === 'food-snacks' ? 18 : 2
  const fats = product.category === 'food-snacks' ? 8 : product.category === 'lifestyle' ? 1 : 2
  const calories = protein * 4 + carbs * 4 + fats * 9

  return [
    ['Portie', product.weight || '1 portie'],
    ['Portii per recipient', String(product.servings || 1)],
    ['Calorii', String(calories)],
    ['Proteine', `${protein}g`],
    ['Carbohidrati', `${carbs}g`],
    ['Grasimi', `${fats}g`],
  ]
}

export default function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : null
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const nutritionFacts = useMemo(() => getNutritionFacts(product), [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Produs inexistent</h1>
          <p className="text-muted-foreground mb-4">Produsul cautat nu exista.</p>
          <Link to="/" className="text-accent hover:text-accent/80">Inapoi la acasa</Link>
        </div>
      </div>
    )
  }

  const categoryData = getCategoryBySlug(product.category)
  const subcategoryData = getSubcategoryBySlug(product.category, product.subcategory)
  const relatedProducts = getProductsByCategory(product.category, product.subcategory)
    .filter((item) => item.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const handleAddToCart = () => {
    addItem(product, quantity, selectedFlavor || undefined)
    setAddedToCart(true)
    window.setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Acasa</Link>
            {categoryData && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                <Link to={`/category/${product.category}`} className="text-muted-foreground hover:text-foreground transition-colors">{categoryData.name}</Link>
              </>
            )}
            {subcategoryData && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                <Link to={`/category/${product.category}/${product.subcategory}`} className="text-muted-foreground hover:text-foreground transition-colors">{subcategoryData.name}</Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="relative">
            <div className="aspect-square bg-card rounded-xl overflow-hidden sticky top-24">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {discount > 0 && <span className="px-3 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded">-{discount}% REDUCERE</span>}
                {product.bestSeller && <span className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded">Cel mai vandut</span>}
                {product.newArrival && <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded">Nou</span>}
              </div>
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <Link to={`/brand/${product.brand.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-accent font-medium uppercase tracking-wider hover:text-accent/80 transition-colors">
              {product.brand}
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-2 mb-4 text-balance">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn('w-5 h-5', i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted-foreground/30')} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()} recenzii)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">{formatRON(product.price)}</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">{formatRON(product.originalPrice)}</span>}
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">{product.shortDescription}</p>

            {product.flavors && product.flavors.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Aroma: <span className="text-muted-foreground font-normal">{selectedFlavor}</span></label>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(flavor => (
                    <button key={flavor} onClick={() => setSelectedFlavor(flavor)} className={cn('px-4 py-2 rounded-md text-sm font-medium transition-all', selectedFlavor === flavor ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80')}>
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border rounded-md">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Scade cantitatea">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Creste cantitatea">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={handleAddToCart} disabled={!product.inStock} className={cn('flex-1 flex items-center justify-center gap-2 h-12 px-8 rounded-md font-medium transition-all', product.inStock ? addedToCart ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed')}>
                {addedToCart ? <><Check className="w-5 h-5" />Adaugat in cos</> : product.inStock ? <><ShoppingBag className="w-5 h-5" />Adauga in cos</> : 'Stoc epuizat'}
              </button>
            </div>

            {(product.servings || product.weight) && (
              <div className="flex flex-wrap gap-6 py-4 border-t border-b border-border mb-8 text-sm">
                {product.servings && <div><span className="text-muted-foreground">Portii:</span> <span className="font-medium">{product.servings}</span></div>}
                {product.weight && <div><span className="text-muted-foreground">Cantitate:</span> <span className="font-medium">{product.weight}</span></div>}
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg"><Truck className="w-5 h-5 text-accent mb-2" /><span className="text-xs text-muted-foreground">Livrare rapida</span></div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg"><RotateCcw className="w-5 h-5 text-accent mb-2" /><span className="text-xs text-muted-foreground">Retur usor</span></div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg"><ShieldCheck className="w-5 h-5 text-accent mb-2" /><span className="text-xs text-muted-foreground">Calitate testata</span></div>
            </div>

            {product.goal.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Perfect pentru</h3>
                <div className="flex flex-wrap gap-2">
                  {product.goal.map(goal => (
                    <Link key={goal} to={`/search?q=${encodeURIComponent(goal)}`} className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {goal}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2 mt-10">
              <div>
                <h3 className="text-lg font-semibold mb-3">Descriere</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Informatii nutritionale</h3>
                <div className="rounded-lg border border-border overflow-hidden bg-card">
                  {nutritionFacts.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-bold mb-8">S-ar putea sa iti placa</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
