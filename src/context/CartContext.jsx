import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'shopnest_cart'
const ORDERS_KEY = 'shopnest_orders'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.product.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        )
      }
      return [...state, { ...action.product, quantity: action.quantity }]
    }
    case 'INCREMENT':
      return state.map((i) =>
        i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    case 'DECREMENT':
      return state
        .map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD', product, quantity })
  }, [])

  const incrementItem = useCallback((id) => {
    dispatch({ type: 'INCREMENT', id })
  }, [])

  const decrementItem = useCallback((id) => {
    dispatch({ type: 'DECREMENT', id })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const delivery = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 49
  const grandTotal = subtotal + delivery

  const placeOrder = useCallback(
    (customer) => {
      const orders = loadOrders()
      const order = {
        id: 'SN' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          image: i.image,
          quantity: i.quantity,
        })),
        subtotal,
        delivery,
        grandTotal,
        customer,
        status: 'Order Placed',
      }
      orders.unshift(order)
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
      dispatch({ type: 'CLEAR' })
      return order
    },
    [cart, subtotal, delivery, grandTotal]
  )

  const getOrders = useCallback(() => loadOrders(), [])

  const value = {
    cart,
    cartCount,
    subtotal,
    delivery,
    grandTotal,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    placeOrder,
    getOrders,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
