/**
 * Cart Slice - Redux Toolkit
 * Exercise 1.2: The Global Store
 * Features: addItem, removeItem, clearCart, memoized selectors
 * Author: Hoang Bao Minh
 */

import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0
};

// Helper function to calculate total
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart or increment quantity if exists
     */
    addItem: (state, action) => {
      const { id, name, price, image } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          quantity: 1
        });
      }

      state.totalAmount = calculateTotal(state.items);
    },

    /**
     * Remove item from cart or decrement quantity
     */
    removeItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
      }

      state.totalAmount = calculateTotal(state.items);
    },

    /**
     * Update item quantity directly
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        state.totalAmount = calculateTotal(state.items);
      } else if (item && quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
        state.totalAmount = calculateTotal(state.items);
      }
    },

    /**
     * Clear entire cart
     */
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    }
  }
});

// Export actions
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Base selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

/**
 * Memoized selector for cart item count
 * Challenge: Uses createSelector for performance optimization
 */
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

/**
 * Memoized selector for 10% tax calculation
 * Challenge: Only recalculates when totalAmount changes
 */
export const selectCartTax = createSelector(
  [selectCartTotalAmount],
  (totalAmount) => {
    const TAX_RATE = 0.1; // 10%
    return Number((totalAmount * TAX_RATE).toFixed(2));
  }
);

/**
 * Memoized selector for grand total (amount + tax)
 */
export const selectCartGrandTotal = createSelector(
  [selectCartTotalAmount, selectCartTax],
  (totalAmount, tax) => Number((totalAmount + tax).toFixed(2))
);

/**
 * Memoized selector to check if an item exists in cart
 */
export const selectItemInCart = createSelector(
  [selectCartItems, (_, itemId) => itemId],
  (items, itemId) => items.find((item) => item.id === itemId)
);

export default cartSlice.reducer;
