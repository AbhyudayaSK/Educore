const mysql = require('mysql2/promise');
const fs = require('fs');
async function test() {
  const pool = mysql.createPool('mysql://root:System@123@localhost:3306/lms_db');
  const [rows] = await pool.query('SELECT * FROM video_progress');
  const [subjects] = await pool.query('SELECT * FROM subjects');
  const out = {
    progress: rows,
    subjectsCount: subjects.length,
    timestamp: new Date().toISOString()
  };
  fs.writeFileSync('db-debug.json', JSON.stringify(out, null, 2));
  console.log('Results written to db-debug.json');
  process.exit(0);
}
test().catch(err => {
  fs.writeFileSync('db-error.txt', err.stack);
  process.exit(1);
});
