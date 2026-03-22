import type { Category, Brand, SaleCategory } from '../types'

export const categories: Category[] = [
  {
    name: 'Sport Nutrition',
    slug: 'sport-nutrition',
    subcategories: [
      {
        name: 'Proteins',
        slug: 'proteins',
        subsubcategories: [
          { name: 'Whey Protein', slug: 'whey-protein' },
          { name: 'Whey Isolate', slug: 'whey-isolate' },
          { name: 'Casein', slug: 'casein' },
          { name: 'Plant-Based Protein', slug: 'plant-based-protein' },
          { name: 'Mass Gainers', slug: 'mass-gainers' },
          { name: 'Protein Blends', slug: 'protein-blends' },
        ],
      },
      {
        name: 'Amino Acids',
        slug: 'amino-acids',
        subsubcategories: [
          { name: 'BCAA', slug: 'bcaa' },
          { name: 'EAA', slug: 'eaa' },
          { name: 'Glutamine', slug: 'glutamine' },
          { name: 'Citrulline', slug: 'citrulline' },
          { name: 'Beta-Alanine', slug: 'beta-alanine' },
        ],
      },
      {
        name: 'Pre-Workout',
        slug: 'pre-workout',
        subsubcategories: [
          { name: 'Stimulant Pre-Workout', slug: 'stimulant-pre-workout' },
          { name: 'Stim-Free Pre-Workout', slug: 'stim-free-pre-workout' },
          { name: 'Pump Formulas', slug: 'pump-formulas' },
        ],
      },
      {
        name: 'Creatine',
        slug: 'creatine',
        subsubcategories: [
          { name: 'Creatine Monohydrate', slug: 'creatine-monohydrate' },
          { name: 'Creatine HCL', slug: 'creatine-hcl' },
          { name: 'Creatine Blends', slug: 'creatine-blends' },
        ],
      },
      {
        name: 'Intra-Workout',
        slug: 'intra-workout',
        subsubcategories: [
          { name: 'Carb Powders', slug: 'carb-powders' },
          { name: 'Electrolyte Mixes', slug: 'electrolyte-mixes' },
          { name: 'Hydration Formulas', slug: 'hydration-formulas' },
        ],
      },
      {
        name: 'Post-Workout & Recovery',
        slug: 'post-workout-recovery',
        subsubcategories: [
          { name: 'Recovery Blends', slug: 'recovery-blends' },
          { name: 'Joint Support', slug: 'joint-support' },
          { name: 'Sleep & Relaxation', slug: 'sleep-relaxation' },
        ],
      },
    ],
  },
  {
    name: 'Food & Snacks',
    slug: 'food-snacks',
    subcategories: [
      {
        name: 'Protein Bars',
        slug: 'protein-bars',
        subsubcategories: [
          { name: 'High-Protein Bars', slug: 'high-protein-bars' },
          { name: 'Low-Carb Bars', slug: 'low-carb-bars' },
          { name: 'Vegan Bars', slug: 'vegan-bars' },
          { name: 'Energy Bars', slug: 'energy-bars' },
        ],
      },
      {
        name: 'Healthy Snacks',
        slug: 'healthy-snacks',
        subsubcategories: [
          { name: 'Protein Chips', slug: 'protein-chips' },
          { name: 'Nut Butters', slug: 'nut-butters' },
          { name: 'Rice Cakes', slug: 'rice-cakes' },
          { name: 'Dried Fruits', slug: 'dried-fruits' },
        ],
      },
      {
        name: 'Drinks',
        slug: 'drinks',
        subsubcategories: [
          { name: 'Ready-to-Drink Protein', slug: 'rtd-protein' },
          { name: 'Energy Drinks', slug: 'energy-drinks' },
          { name: 'Coffee & Tea', slug: 'coffee-tea' },
        ],
      },
      {
        name: 'Cooking & Baking',
        slug: 'cooking-baking',
        subsubcategories: [
          { name: 'Protein Pancake Mix', slug: 'protein-pancake-mix' },
          { name: 'Sugar-Free Syrups', slug: 'sugar-free-syrups' },
          { name: 'Protein Oats', slug: 'protein-oats' },
          { name: 'Flavoring Drops', slug: 'flavoring-drops' },
        ],
      },
    ],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    subcategories: [
      {
        name: 'Shakers & Bottles',
        slug: 'shakers-bottles',
        subsubcategories: [
          { name: 'Shaker Bottles', slug: 'shaker-bottles' },
          { name: 'Water Bottles', slug: 'water-bottles' },
          { name: 'Mixer Balls', slug: 'mixer-balls' },
        ],
      },
      {
        name: 'Gym Gear',
        slug: 'gym-gear',
        subsubcategories: [
          { name: 'Gym Bags', slug: 'gym-bags' },
          { name: 'Lifting Gloves', slug: 'lifting-gloves' },
          { name: 'Wrist Wraps', slug: 'wrist-wraps' },
          { name: 'Lifting Belts', slug: 'lifting-belts' },
          { name: 'Resistance Bands', slug: 'resistance-bands' },
        ],
      },
      {
        name: 'Meal Prep',
        slug: 'meal-prep',
        subsubcategories: [
          { name: 'Food Containers', slug: 'food-containers' },
          { name: 'Pill Organizers', slug: 'pill-organizers' },
          { name: 'Kitchen Scales', slug: 'kitchen-scales' },
        ],
      },
    ],
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    subcategories: [
      {
        name: 'Vitamins & Minerals',
        slug: 'vitamins-minerals',
        subsubcategories: [
          { name: 'Multivitamins', slug: 'multivitamins' },
          { name: 'Vitamin D', slug: 'vitamin-d' },
          { name: 'Vitamin C', slug: 'vitamin-c' },
          { name: 'Zinc', slug: 'zinc' },
          { name: 'Magnesium', slug: 'magnesium' },
          { name: 'Iron', slug: 'iron' },
        ],
      },
      {
        name: 'Omega & Fatty Acids',
        slug: 'omega-fatty-acids',
        subsubcategories: [
          { name: 'Omega-3', slug: 'omega-3' },
          { name: 'Fish Oil', slug: 'fish-oil' },
          { name: 'Krill Oil', slug: 'krill-oil' },
        ],
      },
      {
        name: 'Gut Health',
        slug: 'gut-health',
        subsubcategories: [
          { name: 'Probiotics', slug: 'probiotics' },
          { name: 'Digestive Enzymes', slug: 'digestive-enzymes' },
          { name: 'Fiber Supplements', slug: 'fiber-supplements' },
        ],
      },
      {
        name: 'Superfoods',
        slug: 'superfoods',
        subsubcategories: [
          { name: 'Greens Powders', slug: 'greens-powders' },
          { name: 'Spirulina', slug: 'spirulina' },
          { name: 'Chlorella', slug: 'chlorella' },
        ],
      },
      {
        name: 'Beauty & Wellness',
        slug: 'beauty-wellness',
        subsubcategories: [
          { name: 'Collagen', slug: 'collagen' },
          { name: 'Biotin', slug: 'biotin' },
          { name: 'Skin & Hair', slug: 'skin-hair' },
        ],
      },
    ],
  },
]

export const brands: Brand[] = [
  { name: 'Optimum Nutrition', slug: 'optimum-nutrition', description: 'The gold standard in sports nutrition since 1986.' },
  { name: 'MyProtein', slug: 'myprotein', description: 'Europe\'s leading sports nutrition brand.' },
  { name: 'Dymatize', slug: 'dymatize', description: 'Science-backed formulas for serious athletes.' },
  { name: 'BSN', slug: 'bsn', description: 'Finish first with award-winning formulas.' },
  { name: 'MuscleTech', slug: 'muscletech', description: 'America\'s #1 selling body-building supplement brand.' },
  { name: 'Ghost', slug: 'ghost', description: 'Legendary flavors and transparent formulas.' },
  { name: 'Cellucor', slug: 'cellucor', description: 'Home of C4, the world\'s best-selling pre-workout.' },
  { name: 'JNX Sports', slug: 'jnx-sports', description: 'Hardcore formulas for hardcore athletes.' },
  { name: 'Rule One', slug: 'rule-one', description: 'Simple. Clean. Results.' },
  { name: 'Applied Nutrition', slug: 'applied-nutrition', description: 'Premium quality, accessible pricing.' },
  { name: 'PhD Nutrition', slug: 'phd-nutrition', description: 'Pioneering sports nutrition since 2006.' },
  { name: 'Grenade', slug: 'grenade', description: 'Explosive taste, explosive results.' },
]

export const saleCategories: SaleCategory[] = [
  { name: 'Clearance', slug: 'clearance', description: 'Final stock at unbeatable prices. Limited quantities available.' },
  { name: 'Bundles', slug: 'bundles', description: 'Curated product bundles for maximum savings.' },
  { name: 'Seasonal Offers', slug: 'seasonal', description: 'Limited-time seasonal promotions and deals.' },
  { name: 'Last Chance', slug: 'last-chance', description: 'Your last chance to grab these products before they\'re gone.' },
]

export const goals = [
  'Build Muscle',
  'Lose Weight',
  'Increase Energy',
  'Improve Recovery',
  'Boost Endurance',
  'Support Health',
  'Enhance Focus',
]

export function getCategoryBySlug(categorySlug: string): Category | undefined {
  return categories.find(cat => cat.slug === categorySlug)
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  const category = getCategoryBySlug(categorySlug)
  return category?.subcategories.find(sub => sub.slug === subcategorySlug)
}

export function getSubsubcategoryBySlug(categorySlug: string, subcategorySlug: string, subsubSlug: string) {
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug)
  return subcategory?.subsubcategories.find(subsub => subsub.slug === subsubSlug)
}

export function getBrandBySlug(brandSlug: string): Brand | undefined {
  return brands.find(brand => brand.slug === brandSlug)
}

export function getSaleCategoryBySlug(saleSlug: string): SaleCategory | undefined {
  return saleCategories.find(sale => sale.slug === saleSlug)
}
