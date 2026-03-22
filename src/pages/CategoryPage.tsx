import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory, products } from '../data/products'
import { getCategoryBySlug, getSubcategoryBySlug, getSubsubcategoryBySlug, brands, goals } from '../data/categories'
import { cn } from '@/lib/utils'
import { formatRON } from '../lib/currency'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export default function CategoryPage() {
  const { category, subcategory, subsubcategory } = useParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['categories', 'price', 'brands', 'goals'])

  const categoryData = category ? getCategoryBySlug(category) : null
  const subcategoryData = category && subcategory ? getSubcategoryBySlug(category, subcategory) : null
  const subsubcategoryData = category && subcategory && subsubcategory
    ? getSubsubcategoryBySlug(category, subcategory, subsubcategory)
    : null

  const allProducts = useMemo(() => {
    if (!category) return products
    return getProductsByCategory(category, subcategory, subsubcategory)
  }, [category, subcategory, subsubcategory])

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p =>
        selectedBrands.some(brand =>
          p.brand.toLowerCase().replace(/\s+/g, '-') === brand
        )
      )
    }

    // Filter by goals
    if (selectedGoals.length > 0) {
      filtered = filtered.filter(p =>
        p.goal.some(g => selectedGoals.includes(g))
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0))
        break
      default:
        filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0))
    }

    return filtered
  }, [allProducts, priceRange, selectedBrands, selectedGoals, sortBy])

  const toggleFilter = (section: string) => {
    setExpandedFilters(prev =>
      prev.includes(section)
        ? prev.filter(f => f !== section)
        : [...prev, section]
    )
  }

  const toggleBrand = (brandSlug: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandSlug)
        ? prev.filter(b => b !== brandSlug)
        : [...prev, brandSlug]
    )
  }

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 200])
    setSelectedBrands([])
    setSelectedGoals([])
  }

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 200 || selectedBrands.length > 0 || selectedGoals.length > 0

  const pageTitle = subsubcategoryData?.name || subcategoryData?.name || categoryData?.name || 'Toate produsele'

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      {categoryData && (
        <div>
          <button
            onClick={() => toggleFilter('categories')}
            className="flex items-center justify-between w-full text-left font-semibold mb-3"
          >
            Categorii
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform",
              expandedFilters.includes('categories') && "rotate-180"
            )} />
          </button>
          {expandedFilters.includes('categories') && (
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={`/category/${category}`}
                  className={cn(
                    "block py-1 transition-colors",
                    !subcategory ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Toate {categoryData.name}
                </Link>
              </li>
              {categoryData.subcategories.map(sub => (
                <li key={sub.slug}>
                  <Link
                    to={`/category/${category}/${sub.slug}`}
                    className={cn(
                      "block py-1 transition-colors",
                      subcategory === sub.slug && !subsubcategory
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {sub.name}
                  </Link>
                  {subcategory === sub.slug && sub.subsubcategories.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {sub.subsubcategories.map(subsub => (
                        <li key={subsub.slug}>
                          <Link
                            to={`/category/${category}/${sub.slug}/${subsub.slug}`}
                            className={cn(
                              "block py-1 text-sm transition-colors",
                              subsubcategory === subsub.slug
                                ? "text-accent font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {subsub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleFilter('price')}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          Interval pret
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            expandedFilters.includes('price') && "rotate-180"
          )} />
        </button>
        {expandedFilters.includes('price') && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  min={0}
                  max={priceRange[1]}
                />
              </div>
              <span className="text-muted-foreground mt-5">-</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  min={priceRange[0]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div>
        <button
          onClick={() => toggleFilter('brands')}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          Branduri
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            expandedFilters.includes('brands') && "rotate-180"
          )} />
        </button>
        {expandedFilters.includes('brands') && (
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <li key={brand.slug}>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.slug)}
                    onChange={() => toggleBrand(brand.slug)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className={cn(
                    "transition-colors",
                    selectedBrands.includes(brand.slug) ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {brand.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Goals */}
      <div>
        <button
          onClick={() => toggleFilter('goals')}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          Obiective
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            expandedFilters.includes('goals') && "rotate-180"
          )} />
        </button>
        {expandedFilters.includes('goals') && (
          <ul className="space-y-2">
            {goals.map(goal => (
              <li key={goal}>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedGoals.includes(goal)}
                    onChange={() => toggleGoal(goal)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className={cn(
                    "transition-colors",
                    selectedGoals.includes(goal) ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {goal}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          Reseteaza toate filtrele
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Acasa
            </Link>
            {categoryData && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link
                  to={`/category/${category}`}
                  className={cn(
                    !subcategory ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  {categoryData.name}
                </Link>
              </>
            )}
            {subcategoryData && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link
                  to={`/category/${category}/${subcategory}`}
                  className={cn(
                    !subsubcategory ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  {subcategoryData.name}
                </Link>
              </>
            )}
            {subsubcategoryData && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{subsubcategoryData.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{pageTitle}</h1>
                <p className="text-muted-foreground mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'produs' : 'produse'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtre
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-accent rounded-full" />
                  )}
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border border-border rounded-md text-sm bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="featured">Recomandate</option>
                  <option value="price-asc">Pret: Crescator</option>
                  <option value="price-desc">Pret: Descrescator</option>
                  <option value="rating">Cel mai bun rating</option>
                  <option value="newest">Cele mai noi</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Filtre active:</span>
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                    {formatRON(priceRange[0])} - {formatRON(priceRange[1])}
                    <button
                      onClick={() => setPriceRange([0, 200])}
                      className="hover:text-accent"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedBrands.map(brandSlug => {
                  const brand = brands.find(b => b.slug === brandSlug)
                  return (
                    <span
                      key={brandSlug}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      {brand?.name}
                      <button
                        onClick={() => toggleBrand(brandSlug)}
                        className="hover:text-accent"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )
                })}
                {selectedGoals.map(goal => (
                  <span
                    key={goal}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {goal}
                    <button
                      onClick={() => toggleGoal(goal)}
                      className="hover:text-accent"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-accent hover:text-accent/80"
                >
                  Reseteaza
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Nu exista produse care sa corespunda criteriilor selectate.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-accent hover:text-accent/80"
                >
                  Reseteaza filtrele
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between">
              <h2 className="font-semibold">Filtre</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 hover:bg-muted rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
            <div className="sticky bottom-0 bg-card border-t border-border p-4">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md"
              >
                Arata {filteredProducts.length} produse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
