const mysql = require('mysql2/promise');
const fs = require('fs');

async function checkUserAbhi() {
  try {
    console.log('Starting...');
    const pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'System@123',
      database: 'lms_db',
      port: 3306
    });
    
    console.log('Querying...');
    const email = 'abhi@gmail.com';
    const [rows] = await pool.query('SELECT id, email, name FROM users WHERE email = ?', [email]);
    
    console.log('Done.');
    if (rows.length > 0) {
      fs.writeFileSync('abhi-user-status.json', JSON.stringify({ status: 'found', user: rows[0] }, null, 2));
    } else {
      fs.writeFileSync('abhi-user-status.json', JSON.stringify({ status: 'not_found' }, null, 2));
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    fs.writeFileSync('abhi-user-error.txt', err.stack);
    process.exit(1);
  }
}

checkUserAbhi();
