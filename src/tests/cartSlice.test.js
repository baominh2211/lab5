/**
 * Cart Slice Tests
 * Redux Toolkit state management tests
 * Author: Hoang Bao Minh
 */

import cartReducer, {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTax,
  selectCartGrandTotal,
  selectCartItemCount
} from '../store/slices/cartSlice';

describe('Cart Slice', () => {
  const initialState = {
    items: [],
    totalAmount: 0
  };

  const sampleProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    image: '🧪'
  };

  /**
   * Test 1: Initial state
   */
  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  /**
   * Test 2: Add new item
   */
  it('should add a new item to cart', () => {
    const state = cartReducer(initialState, addItem(sampleProduct));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      ...sampleProduct,
      quantity: 1
    });
    expect(state.totalAmount).toBe(100);
  });

  /**
   * Test 3: Increment quantity for existing item
   */
  it('should increment quantity for existing item', () => {
    const stateWithItem = {
      items: [{ ...sampleProduct, quantity: 1 }],
      totalAmount: 100
    };

    const state = cartReducer(stateWithItem, addItem(sampleProduct));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalAmount).toBe(200);
  });

  /**
   * Test 4: Remove item (decrement quantity)
   */
  it('should decrement quantity when removing item', () => {
    const stateWithItem = {
      items: [{ ...sampleProduct, quantity: 2 }],
      totalAmount: 200
    };

    const state = cartReducer(stateWithItem, removeItem({ id: 1 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalAmount).toBe(100);
  });

  /**
   * Test 5: Remove item completely when quantity is 1
   */
  it('should remove item completely when quantity reaches 0', () => {
    const stateWithItem = {
      items: [{ ...sampleProduct, quantity: 1 }],
      totalAmount: 100
    };

    const state = cartReducer(stateWithItem, removeItem({ id: 1 }));

    expect(state.items).toHaveLength(0);
    expect(state.totalAmount).toBe(0);
  });

  /**
   * Test 6: Update quantity directly
   */
  it('should update quantity directly', () => {
    const stateWithItem = {
      items: [{ ...sampleProduct, quantity: 1 }],
      totalAmount: 100
    };

    const state = cartReducer(
      stateWithItem,
      updateQuantity({ id: 1, quantity: 5 })
    );

    expect(state.items[0].quantity).toBe(5);
    expect(state.totalAmount).toBe(500);
  });

  /**
   * Test 7: Clear cart
   */
  it('should clear all items from cart', () => {
    const stateWithItems = {
      items: [
        { ...sampleProduct, quantity: 2 },
        { id: 2, name: 'Product 2', price: 50, quantity: 3 }
      ],
      totalAmount: 350
    };

    const state = cartReducer(stateWithItems, clearCart());

    expect(state.items).toHaveLength(0);
    expect(state.totalAmount).toBe(0);
  });
});

describe('Cart Selectors', () => {
  const stateWithItems = {
    cart: {
      items: [
        { id: 1, name: 'Product 1', price: 100, quantity: 2 },
        { id: 2, name: 'Product 2', price: 50, quantity: 3 }
      ],
      totalAmount: 350
    }
  };

  /**
   * Test 8: selectCartItems
   */
  it('should select cart items', () => {
    expect(selectCartItems(stateWithItems)).toHaveLength(2);
  });

  /**
   * Test 9: selectCartTotalAmount
   */
  it('should select total amount', () => {
    expect(selectCartTotalAmount(stateWithItems)).toBe(350);
  });

  /**
   * Test 10: selectCartItemCount (memoized)
   */
  it('should calculate total item count', () => {
    expect(selectCartItemCount(stateWithItems)).toBe(5);
  });

  /**
   * Test 11: selectCartTax (memoized, 10%)
   */
  it('should calculate 10% tax', () => {
    expect(selectCartTax(stateWithItems)).toBe(35);
  });

  /**
   * Test 12: selectCartGrandTotal (memoized)
   */
  it('should calculate grand total with tax', () => {
    expect(selectCartGrandTotal(stateWithItems)).toBe(385);
  });
});
