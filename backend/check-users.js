const mysql = require('mysql2/promise');
const fs = require('fs');

async function checkUsers() {
  try {
    const pool = mysql.createPool({
      uri: 'mysql://root:System@123@localhost:3306/lms_db',
      ssl: { rejectUnauthorized: false }
    });
    
    console.log('Connecting to database...');
    const [rows] = await pool.query('SELECT id, email, name FROM users');
    
    const output = {
      users: rows,
      count: rows.length,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('users-list.json', JSON.stringify(output, null, 2));
    console.log(`Success! Found ${rows.length} users. Results in users-list.json`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    fs.writeFileSync('users-error.txt', err.stack);
    process.exit(1);
  }
}

checkUsers();
