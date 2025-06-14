const express = require('express');
const router = express.Router();
const db = require('../config/db');

// SIGNUP – Create new user
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    // Create new user, is_admin defaults to 0
    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { name, email, is_admin: 0 } 
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// LOGIN – Check user credentials (UPDATED WITH BETTER ERROR HANDLING)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length > 0) {
      const user = users[0];
      console.log('✅ User logged in successfully:', user.email);
      
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_admin: user.is_admin // Send is_admin to frontend
        }
      });
    } else {
      console.log('❌ Login failed for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// GET all users – Admin view
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: 'Failed to load users' });
  }
});

module.exports = router;