// Cart.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cartContext';
import CheckoutModal from './CheckoutModal';
import GuestCheckoutModal from './GuestCheckoutModal';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  useEffect(() => {
    const handleOpenGuest = () => setShowGuestModal(true);
    window.addEventListener('openGuestCheckout', handleOpenGuest);
    return () => window.removeEventListener('openGuestCheckout', handleOpenGuest);
  }, []);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price;
  }, 0);

  return (
    <div style={{ padding: "40px" ,marginTop:'50px' }}>
      <h2>Your Cart 🛍️</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{
              display: "flex", alignItems: "center",
              marginBottom: "20px", gap: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px"
            }}>
              <img src={`/${item.image_url}`} alt={item.name} width="100" />
              <div>
                <h3>{item.name}</h3>
                <p>${parseFloat(item.price).toFixed(2)}</p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>

          <button 
            onClick={() => setShowModal(true)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Go to Checkout
          </button>
        </div>
      )}

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
      {showGuestModal && <GuestCheckoutModal onClose={() => setShowGuestModal(false)} />}
    </div>
  );
};

export default Cart;
