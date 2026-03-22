import type { Product } from '../types'

/**
 * Builds a public asset URL that respects Vite's BASE_URL
 * (required when app is served from a repo subpath on GitHub Pages).
 */
export function getAssetPath(path: string): string {
  const baseUrl = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${normalizedPath}`
}

/**
 * Map of category slugs to their local image filenames
 * All images should be placed in /public/images/categories/
 */
const categoryImages: Record<string, string> = {
  'sport-nutrition': 'images/categories/sport-nutrition.png',
  'food-snacks': 'images/categories/food-snacks.png',
  accessories: 'images/categories/accessories.png',
  lifestyle: 'images/categories/lifestyle.png',
}

const FALLBACK_IMAGE = 'placeholder.png'

/**
 * Get the category image path for a given category slug
 * Falls back to placeholder.png if category image is missing
 * 
 * @param slug - The category slug
 * @returns The path to the category image
 */
export function getCategoryImage(slug: string): string {
  return getAssetPath(categoryImages[slug] ?? FALLBACK_IMAGE)
}

/**
 * Get the product image path for a given product
 * Uses the product's images array (which contains local file paths)
 * Falls back to placeholder.png if image is missing
 * 
 * @param product - The product object
 * @returns The path to the product image
 */
export function getProductImage(product: Product): string {
  return product.images?.[0] ?? getAssetPath(FALLBACK_IMAGE)
}

/**
 * Get the hero image path
 * @returns The path to the hero image
 */
export function getHeroImage(): string {
  return getAssetPath('images/hero/hero-main.png')
}
