import { Link } from 'react-router-dom'
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Clock } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { categories, goals } from '../data/categories'
import { getBestSellers, getNewArrivals, getFeaturedProducts, products } from '../data/products'
import { getCategoryImage, getHeroImage } from '../lib/images'

export default function HomePage() {
  const bestSellers = getBestSellers().slice(0, 8)
  const newArrivals = getNewArrivals()
  const featuredProducts = getFeaturedProducts()
  const saleProducts = products.filter(p => p.originalPrice).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-6">
                Colectia noului sezon
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Alimenteaza-ti <span className="text-accent">performanta</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                Nutritie sportiva premium si suplimente pentru sportivii care vor ce e mai bun. Formule sustinute stiintific, gust excelent.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/category/sport-nutrition"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 transition-colors"
                >
                  Cumpara acum
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/sale"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 transition-colors"
                >
                  Vezi reducerile
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={getHeroImage()}
                  alt="Premium sports nutrition products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Livrare gratuita</p>
                <p className="text-xs text-muted-foreground">La comenzi peste 350 Lei</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Plata securizata</p>
                <p className="text-xs text-muted-foreground">100% protejata</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Retur usor</p>
                <p className="text-xs text-muted-foreground">Retur in 30 de zile</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Livrare rapida</p>
                <p className="text-xs text-muted-foreground">1-3 zile lucratoare</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Cumpara dupa categorie</h2>
              <p className="text-muted-foreground mt-2">Gaseste exact ce ai nevoie</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-primary to-secondary"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
                <img
                  src={getCategoryImage(category.slug)}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-semibold text-primary-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    {category.subcategories.length} subcategorii
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Cele mai vandute</h2>
              <p className="text-muted-foreground mt-2">Cele mai populare produse</p>
            </div>
            <Link
              to="/category/sport-nutrition"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Vezi toate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/category/sport-nutrition"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent"
            >
              Vezi toate produsele
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Goal */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Cumpara dupa obiectiv</h2>
            <p className="text-muted-foreground mt-2">Gaseste produse potrivite obiectivelor tale</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {goals.map(goal => (
              <Link
                key={goal}
                to={`/search?q=${encodeURIComponent(goal)}`}
                className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                {goal}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-accent text-sm font-medium uppercase tracking-wider">Recomandate</span>
                <h2 className="text-2xl lg:text-3xl font-bold mt-2">Alegerile editorului</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Noutati</h2>
                <p className="text-muted-foreground mt-2">Au aparut acum - fii printre primii</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sale Banner */}
      {saleProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-accent/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-accent text-sm font-medium uppercase tracking-wider">Timp limitat</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">Oferte speciale</h2>
                <p className="text-muted-foreground mt-2">Nu rata aceste promotii</p>
              </div>
              <Link
                to="/sale"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Vezi toate reducerile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 lg:py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold">Ramai la curent</h2>
            <p className="text-secondary-foreground/70 mt-3 mb-8">
              Aboneaza-te pentru oferte exclusive, acces rapid la produse noi si sfaturi fitness.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Introdu email-ul"
                className="flex-1 px-4 py-3 bg-primary/50 border border-primary rounded-md text-secondary-foreground placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 transition-colors"
              >
                Aboneaza-te
              </button>
            </form>
            <p className="text-xs text-secondary-foreground/50 mt-4">
              Prin abonare, esti de acord cu Politica de confidentialitate. Te poti dezabona oricand.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
