import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { cn } from '@/lib/utils'
import { getProductImage } from '../lib/images'
import { formatRON } from '../lib/currency'

export default function CartPage() {
  const { state, updateQuantity, removeItem, subtotal } = useCart()
  const { items } = state

  const shipping = subtotal >= 350 ? 0 : 24.99
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Cosul tau este gol</h1>
            <p className="text-muted-foreground mb-8">
              Se pare ca nu ai adaugat inca produse in cos. Incepe cumparaturile pentru a gasi suplimentele potrivite obiectivelor tale.
            </p>
            <Link
              to="/category/sport-nutrition"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Incepe cumparaturile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
            <span className="text-foreground font-medium">Cos de cumparaturi</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-2xl lg:text-3xl font-bold mb-8">Cos de cumparaturi</h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => {
                const itemKey = `${item.product.id}-${item.selectedFlavor || ''}`
                return (
                  <div
                    key={itemKey}
                    className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg shrink-0 overflow-hidden"
                    >
                      <img
                        src={getProductImage(item.product)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-medium text-foreground hover:text-accent transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.product.brand}
                      </p>
                      {item.selectedFlavor && (
                        <p className="text-sm text-muted-foreground">
                          Aroma: {item.selectedFlavor}
                        </p>
                      )}

                      {/* Mobile Price */}
                      <div className="sm:hidden mt-2">
                        <span className="font-semibold">
                          {formatRON(item.product.price * item.quantity)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedFlavor
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Scade cantitatea"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedFlavor
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Creste cantitatea"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedFlavor)
                          }
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Elimina produs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden sm:block text-right shrink-0">
                      <p className="font-semibold text-lg">
                        {formatRON(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          {formatRON(item.product.price)} / buc
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6">Sumar comanda</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatRON(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livrare</span>
                  <span className={cn("font-medium", shipping === 0 && "text-green-600")}>
                    {shipping === 0 ? 'Gratuit' : formatRON(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Mai adauga {formatRON(350 - subtotal)} pentru livrare gratuita
                  </p>
                )}
              </div>

              <div className="flex justify-between py-6 border-b border-border">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{formatRON(total)}</span>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3 mt-6 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Continua catre plata
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/category/sport-nutrition"
                className="flex items-center justify-center w-full py-3 mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continua cumparaturile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
