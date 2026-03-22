import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Product, CartItem } from '../types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedFlavor?: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; selectedFlavor?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; selectedFlavor?: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] }

interface CartContextType {
  state: CartState
  addItem: (product: Product, quantity?: number, selectedFlavor?: string) => void
  removeItem: (productId: string, selectedFlavor?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedFlavor?: string) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (isOpen: boolean) => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, selectedFlavor } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.selectedFlavor === selectedFlavor
      )

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return { ...state, items: updatedItems }
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, selectedFlavor }],
      }
    }

    case 'REMOVE_ITEM': {
      const { productId, selectedFlavor } = action.payload
      return {
        ...state,
        items: state.items.filter(
          item => !(item.product.id === productId && item.selectedFlavor === selectedFlavor)
        ),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, selectedFlavor } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            item => !(item.product.id === productId && item.selectedFlavor === selectedFlavor)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId && item.selectedFlavor === selectedFlavor
            ? { ...item, quantity }
            : item
        ),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload }

    case 'LOAD_CART':
      return { ...state, items: action.payload }

    default:
      return state
  }
}

const CART_STORAGE_KEY = 'coconutrition-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [state.items])

  const addItem = (product: Product, quantity = 1, selectedFlavor?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedFlavor } })
  }

  const removeItem = (productId: string, selectedFlavor?: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, selectedFlavor } })
  }

  const updateQuantity = (productId: string, quantity: number, selectedFlavor?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, selectedFlavor } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const setCartOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen })
  }

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
