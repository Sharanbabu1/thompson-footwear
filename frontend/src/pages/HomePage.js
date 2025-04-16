// HomePage.js – Fully Updated by Sharan Adhikari 24071844

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  //  Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = () => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (["men", "women", "children"].includes(trimmed)) {
      navigate(`/products?category=${trimmed}`);
    } else if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Message sending failed. Please try again.');
    }
  };

  return (
    <div className="homepage">
      <div className="hero-image">
        <img src="/images/thompson-banner.png" alt="Thompson Footwear Banner" />
      </div>

      <div className="hero-text">
        <h1>Welcome to Thompson Footwear 👟</h1>
        <p>Your one-stop shop for quality shoes for Men, Women, and Kids.</p>
        <Link to="/products">
          <button className="shop-now">Shop Now</button>
        </Link>
      </div>

      {/* 🔍 Search Bar */}
      <div className="search-bar" style={{ textAlign: 'center', margin: '30px' }}>
        <input
          type="text"
          placeholder="Search or type 'men', 'women', 'children'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 15px',
            marginLeft: '10px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      <div className="tagline">
        <h2> Style That Moves With You</h2>
        <p>Step into comfort, step into confidence. Shop Men, Women, and Kids shoes now.</p>
      </div>

      <div className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-cards">
          <button className="category-card men" onClick={() => navigate('/products?category=men')}>Men</button>
          <button className="category-card women" onClick={() => navigate('/products?category=women')}>Women</button>
          <button className="category-card kids" onClick={() => navigate('/products?category=children')}>Kids</button>
        </div>
      </div>

      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Thompson Footwear has been serving the local community for over a decade.
          Our commitment to comfort, style, and value sets us apart from the rest.
        </p>
        <p>
          Whether you're looking for trendy sneakers, durable boots, or classy formal shoes,
          we have something for everyone. Now online and ready to serve all across Australia!
        </p>
      </div>

      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-list">
          <blockquote>"Super comfy and stylish. I wear them every day!" – Amanda T.</blockquote>
          <blockquote>"My kids love their new shoes. Great prices too!" – Jason M.</blockquote>
          <blockquote>"Fast delivery and amazing customer service." – Priya S.</blockquote>
        </div>
      </div>

      <div className="why-us">
        <h2>Why Shop With Us?</h2>
        <ul>
          <li>✔️ Free Shipping over $50</li>
          <li>✔️ 10+ Years of Trust</li>
          <li>✔️ Quality Guaranteed</li>
          <li>✔️ 24/7 Customer Support</li>
        </ul>
      </div>

      <div className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get exclusive deals and 10% off your first order!</p>
        <input type="email" placeholder="Your email address" />
        <button>Subscribe</button>
      </div>

      <div className="contact-map">
        <h2>Visit Our Store</h2>
        <p>25 King Street, Morley, WA 6062</p>
        <p>Email: michael.thompson@thompsonfootwear.com | Phone: (02) 1234 5678</p>
        <iframe
          title="store-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.557330230218!2d115.90452337555458!3d-31.89910337403406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32b0f3b9ea2573%3A0x9e305a00e8e49155!2s25%20King%20St%2C%20Morley%20WA%206062%2C%20Australia!5e0!3m2!1sen!2sau!4v1719908721156!5m2!1sen!2sau"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-form-section">
        <h2>Get in Touch</h2>
        <p>Have a question, feedback, or just want to say hi? Drop us a message!</p>

        {submitted ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
             Thanks for contacting us. We’ll get in touch soon!
          </p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your message"
                required
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        )}
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Thompson Footwear. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
