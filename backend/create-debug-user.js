const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function createDebugUser() {
  try {
    const pool = mysql.createPool({
      uri: 'mysql://root:System@123@localhost:3306/lms_db',
      ssl: { rejectUnauthorized: false }
    });
    
    const email = 'debug@gmail.com';
    const password = 'password123';
    const name = 'Debug User';
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Check if exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('User already exists');
      fs.writeFileSync('debug-user-status.txt', 'exists');
    } else {
      await pool.query('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name]);
      console.log('User created successfully');
      fs.writeFileSync('debug-user-status.txt', 'created');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    fs.writeFileSync('debug-user-error.txt', err.stack);
    process.exit(1);
  }
}

createDebugUser();
