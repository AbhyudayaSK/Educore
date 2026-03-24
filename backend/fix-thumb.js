const mysql = require('mysql2/promise');

async function fixThumbnail() {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'System@123',
    database: 'lms_db'
  };
  
  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to lms_db');
    
    const newUrl = 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80';
    const [result] = await conn.query(
      'UPDATE subjects SET thumbnail_url = ? WHERE title = ?',
      [newUrl, 'Digital Product Design']
    );
    
    console.log(`✅ Updated ${result.affectedRows} row(s).`);
    await conn.end();
  } catch (err) {
    console.error('❌ Fix failed:', err.message);
  }
}

fixThumbnail();
