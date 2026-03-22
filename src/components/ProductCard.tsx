import { Link } from 'react-router-dom'
import { ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import { cn } from '@/lib/utils'
import { getProductImage } from '../lib/images'
import { formatRON } from '../lib/currency'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1, product.flavors?.[0])
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn(
        "group block bg-card rounded-lg overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
              -{discount}%
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
              Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
              New
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="w-full h-full p-4 transition-transform duration-300 group-hover:scale-105">
          <img
            src={getProductImage(product)}
            alt={product.name}
            className="w-full h-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground",
            "flex items-center justify-center opacity-0 translate-y-2",
            "transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0",
            "hover:bg-accent hover:text-accent-foreground"
          )}
          aria-label="Adauga in cos"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="font-medium text-card-foreground line-clamp-2 mb-2 min-h-[2.5rem] leading-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-card-foreground">
            {formatRON(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatRON(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Flavors hint */}
        {product.flavors && product.flavors.length > 1 && (
          <p className="text-xs text-muted-foreground mt-2">
            {product.flavors.length} arome disponibile
          </p>
        )}
      </div>
    </Link>
  )
}
