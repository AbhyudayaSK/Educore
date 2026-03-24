const mysql = require('mysql2/promise');

async function resetDb() {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'System@123',
  };
  
  try {
    const conn = await mysql.createConnection(config);
    console.log('Dropping database lms_db...');
    await conn.query('DROP DATABASE IF EXISTS lms_db');
    console.log('Creating database lms_db...');
    await conn.query('CREATE DATABASE lms_db');
    await conn.end();
    console.log('✅ Database reset successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to reset database:', err.message);
    process.exit(1);
  }
}

resetDb();
