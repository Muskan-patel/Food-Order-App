import { createContext, useReducer } from "react";

// Initial cart state
const defaultCartState = {
  items: []
};

// Create context with default values
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  totalAmount: 0
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // Validate item has required properties
    if (!action.item || !action.item.id) {
      console.error('Invalid item added to cart:', action.item);
      return state;
    }

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + (action.quantity || 1)
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ 
        ...action.item, 
        quantity: action.quantity || 1 
      });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    if (!action.id) {
      console.error('No ID provided for item removal');
      return state;
    }

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // If item doesn't exist, return current state
    if (existingCartItemIndex === -1) {
      return state;
    }

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  
  if (action.type === 'CLEAR_CART') {
    return {...state, items: []};
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  function addItem(item, quantity = 1) {
    dispatchCartAction({ type: 'ADD_ITEM', item, quantity });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }
  
  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  // Calculate total amount
  const totalAmount = cart.items.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
    totalAmount
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;