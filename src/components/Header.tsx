import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, ChevronDown, ChevronRight, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { categories, brands, saleCategories } from '../data/categories'
import { cn } from '@/lib/utils'

type ActiveMenu = 'sport-nutrition' | 'food-snacks' | 'accessories' | 'lifestyle' | 'brands' | 'sale' | null

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null)
  const [mobileActiveSubcategory, setMobileActiveSubcategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()
  const { itemCount } = useCart()

  const handleMouseEnter = (menu: ActiveMenu) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
    }
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const getCategoryData = (slug: string) => {
    return categories.find(cat => cat.slug === slug)
  }

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            <p className="hidden sm:block">Livrare gratuita peste 350 Lei</p>
            <div className="flex items-center gap-6">
              <Link to="/about" className="hover:text-accent transition-colors">Despre noi</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl lg:text-2xl font-semibold tracking-tight">
              COCO<span className="text-accent">nutrition</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={handleMouseLeave}>
            {categories.map(category => (
              <div
                key={category.slug}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.slug as ActiveMenu)}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    activeMenu === category.slug ? "bg-secondary" : "hover:bg-secondary/50"
                  )}
                >
                  {category.name}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            ))}
            
            {/* Brands */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('brands')}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  activeMenu === 'brands' ? "bg-secondary" : "hover:bg-secondary/50"
                )}
              >
                Branduri
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            {/* Sale */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('sale')}
            >
              <Link
                to="/sale"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md text-accent",
                  activeMenu === 'sale' ? "bg-secondary" : "hover:bg-secondary/50"
                )}
              >
                Reduceri
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search - Desktop */}
            <div className="hidden lg:block relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Cauta produse..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 xl:w-72 h-10 pl-10 pr-4 bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              </form>
            </div>

            {/* Search - Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 hover:bg-secondary/50 rounded-md transition-colors"
              aria-label="Cauta"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button className="hidden sm:flex p-2 hover:bg-secondary/50 rounded-md transition-colors" aria-label="Cont">
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-secondary/50 rounded-md transition-colors"
              aria-label={`Cos cu ${itemCount} produse`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-secondary/50 rounded-md transition-colors"
              aria-label={mobileMenuOpen ? "Inchide meniul" : "Deschide meniul"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cauta produse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full h-11 pl-11 pr-4 bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
            </form>
          </div>
        )}
      </div>

      {/* Desktop Mega Menu */}
      {activeMenu && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-card text-card-foreground shadow-xl border-t border-border"
          onMouseEnter={() => menuTimeoutRef.current && clearTimeout(menuTimeoutRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeMenu === 'brands' ? (
              <div>
                <h3 className="text-lg font-semibold mb-6">Cumpara dupa brand</h3>
                <div className="grid grid-cols-4 gap-4">
                  {brands.map(brand => (
                    <Link
                      key={brand.slug}
                      to={`/brand/${brand.slug}`}
                      className="group p-4 rounded-lg hover:bg-muted transition-colors"
                    >
                      <p className="font-medium group-hover:text-accent transition-colors">{brand.name}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{brand.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : activeMenu === 'sale' ? (
              <div>
                <h3 className="text-lg font-semibold mb-6">Reduceri si oferte</h3>
                <div className="grid grid-cols-4 gap-6">
                  {saleCategories.map(sale => (
                    <Link
                      key={sale.slug}
                      to={`/sale/${sale.slug}`}
                      className="group p-4 rounded-lg bg-muted/50 hover:bg-accent/10 transition-colors"
                    >
                      <p className="font-medium text-accent group-hover:text-accent transition-colors">{sale.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{sale.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-8">
                {getCategoryData(activeMenu)?.subcategories.map(subcategory => (
                  <div key={subcategory.slug}>
                    <Link
                      to={`/category/${activeMenu}/${subcategory.slug}`}
                      className="font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      {subcategory.name}
                    </Link>
                    <ul className="mt-3 space-y-2">
                      {subcategory.subsubcategories.map(subsub => (
                        <li key={subsub.slug}>
                          <Link
                            to={`/category/${activeMenu}/${subcategory.slug}/${subsub.slug}`}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {subsub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(4rem+36px)] bg-card text-card-foreground z-50 overflow-y-auto">
          <nav className="max-w-lg mx-auto p-4">
            {/* Categories */}
            {categories.map(category => (
              <div key={category.slug} className="border-b border-border">
                <button
                  onClick={() => setMobileActiveCategory(
                    mobileActiveCategory === category.slug ? null : category.slug
                  )}
                  className="flex items-center justify-between w-full py-4 text-left font-medium"
                >
                  {category.name}
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    mobileActiveCategory === category.slug && "rotate-180"
                  )} />
                </button>
                
                {mobileActiveCategory === category.slug && (
                  <div className="pb-4 pl-4">
                    <Link
                      to={`/category/${category.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-accent"
                    >
                      Vezi toate {category.name}
                    </Link>
                    {category.subcategories.map(subcategory => (
                      <div key={subcategory.slug}>
                        <button
                          onClick={() => setMobileActiveSubcategory(
                            mobileActiveSubcategory === subcategory.slug ? null : subcategory.slug
                          )}
                          className="flex items-center justify-between w-full py-2 text-left text-sm"
                        >
                          {subcategory.name}
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform",
                            mobileActiveSubcategory === subcategory.slug && "rotate-90"
                          )} />
                        </button>
                        
                        {mobileActiveSubcategory === subcategory.slug && (
                          <div className="pl-4 pb-2">
                            <Link
                              to={`/category/${category.slug}/${subcategory.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 text-sm text-accent"
                            >
                              Vezi toate
                            </Link>
                            {subcategory.subsubcategories.map(subsub => (
                              <Link
                                key={subsub.slug}
                                to={`/category/${category.slug}/${subcategory.slug}/${subsub.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 text-sm text-muted-foreground"
                              >
                                {subsub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Brands */}
            <div className="border-b border-border">
              <button
                onClick={() => setMobileActiveCategory(
                  mobileActiveCategory === 'brands' ? null : 'brands'
                )}
                className="flex items-center justify-between w-full py-4 text-left font-medium"
              >
                Branduri
                <ChevronDown className={cn(
                  "w-5 h-5 transition-transform",
                  mobileActiveCategory === 'brands' && "rotate-180"
                )} />
              </button>
              
              {mobileActiveCategory === 'brands' && (
                <div className="pb-4 pl-4 grid grid-cols-2 gap-2">
                  {brands.map(brand => (
                    <Link
                      key={brand.slug}
                      to={`/brand/${brand.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 text-sm text-muted-foreground"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sale */}
            <div className="border-b border-border">
              <button
                onClick={() => setMobileActiveCategory(
                  mobileActiveCategory === 'sale' ? null : 'sale'
                )}
                className="flex items-center justify-between w-full py-4 text-left font-medium text-accent"
              >
                Reduceri
                <ChevronDown className={cn(
                  "w-5 h-5 transition-transform",
                  mobileActiveCategory === 'sale' && "rotate-180"
                )} />
              </button>
              
              {mobileActiveCategory === 'sale' && (
                <div className="pb-4 pl-4">
                  <Link
                    to="/sale"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-accent"
                  >
                    Vezi toate produsele la reducere
                  </Link>
                  {saleCategories.map(sale => (
                    <Link
                      key={sale.slug}
                      to={`/sale/${sale.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-muted-foreground"
                    >
                      {sale.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Links */}
            <div className="pt-6 space-y-4">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-muted-foreground"
              >
                Despre noi
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-muted-foreground"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

