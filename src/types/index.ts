export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  shortDescription: string
  category: string
  subcategory: string
  subsubcategory: string
  goal: string[]
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  servings?: number
  weight?: string
  flavors?: string[]
  tags?: string[]
  featured?: boolean
  bestSeller?: boolean
  newArrival?: boolean
  saleType?: 'clearance' | 'bundle' | 'seasonal' | 'last-chance'
}

export interface CartItem {
  product: Product
  quantity: number
  selectedFlavor?: string
}

export interface Category {
  name: string
  slug: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  name: string
  slug: string
  subsubcategories: SubSubcategory[]
}

export interface SubSubcategory {
  name: string
  slug: string
}

export interface Brand {
  name: string
  slug: string
  logo?: string
  description?: string
}

export interface SaleCategory {
  name: string
  slug: string
  description: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}
