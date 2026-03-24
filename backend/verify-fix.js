const mysql = require('mysql2/promise');

async function verify() {
  console.log('--- Start Verification ---');
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'System@123',
    database: 'lms_db'
  };
  
  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to lms_db');
    
    const [tables] = await conn.query('SHOW TABLES');
    const tableList = tables.map(t => Object.values(t)[0]);
    console.log('Tables in DB:', tableList.join(', '));
    
    const [users] = await conn.query('SELECT count(*) as count FROM users');
    console.log('Users count:', users[0].count);

    const [subjects] = await conn.query('SELECT count(*) as count FROM subjects');
    console.log('Subjects count:', subjects[0].count);

    if (tableList.includes('refresh_tokens')) {
       console.log('✅ Found refresh_tokens table');
    } else {
       console.log('❌ FATAL: refresh_tokens table STILL MISSING');
    }

    await conn.end();
  } catch (err) {
    console.error('❌ Verification failed:', err.message);
  }
  console.log('--- End Verification ---');
}

verify();
