/**
 * ShoppingCart Component - Exercise 1.2 Demo
 * Demonstrates Redux Toolkit with createSlice and createSelector
 * Author: Hoang Bao Minh
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTax,
  selectCartGrandTotal,
  selectCartItemCount
} from '../../store/slices/cartSlice';
import './ShoppingCart.css';

// Sample products for demo
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Premium Headphones', price: 299.99, image: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 179.99, image: '⌨️' },
  { id: 3, name: 'Ultra Wide Monitor', price: 599.99, image: '🖥️' },
  { id: 4, name: 'Wireless Mouse', price: 89.99, image: '🖱️' },
  { id: 5, name: 'USB-C Hub', price: 49.99, image: '🔌' },
  { id: 6, name: 'Webcam HD', price: 129.99, image: '📷' }
];

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const tax = useSelector(selectCartTax);
  const grandTotal = useSelector(selectCartGrandTotal);
  const itemCount = useSelector(selectCartItemCount);
  const [activeTab, setActiveTab] = useState('products');

  const handleAddItem = (product) => {
    dispatch(addItem(product));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="shopping-cart-container">
      <div className="cart-header">
        <h3 className="card-title">
          <span className="icon">🛒</span>
          Shopping Cart
        </h3>
        {itemCount > 0 && <span className="badge badge-gold">{itemCount} items</span>}
      </div>

      <div className="cart-tabs">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          Cart ({itemCount})
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="products-grid animate-fade-in">
          {SAMPLE_PRODUCTS.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            return (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  {cartItem ? (
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        −
                      </button>
                      <span className="qty-value">{cartItem.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleAddItem(product)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddItem(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'cart' && (
        <div className="cart-content animate-fade-in">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">🛒</span>
              <p>Your cart is empty</p>
              <button
                className="btn btn-secondary"
                onClick={() => setActiveTab('products')}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">{item.image}</div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="item-quantity">
                      <button
                        className="qty-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)
                        }
                        min="0"
                        className="qty-input"
                      />
                      <button
                        className="qty-btn"
                        onClick={() => handleAddItem(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span className="text-accent">${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <div className="summary-actions">
                  <button className="btn btn-secondary" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                  <button className="btn btn-primary">Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="code-example">
        <h4>Redux Toolkit Implementation</h4>
        <pre>
          <code>{`// Memoized selector with createSelector
export const selectCartTax = createSelector(
  [selectCartTotalAmount],
  (totalAmount) => {
    const TAX_RATE = 0.1; // 10%
    return Number((totalAmount * TAX_RATE).toFixed(2));
  }
);

// Only recalculates when totalAmount changes!`}</code>
        </pre>
      </div>
    </div>
  );
};

export default ShoppingCart;
