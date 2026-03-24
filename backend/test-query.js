const mysql = require('mysql2/promise');
const fs = require('fs');

async function test() {
  const pool = mysql.createPool('mysql://root:System@123@localhost:3306/lms_db');
  
  const userId = 1; // Assuming test user ID is 1
  
  try {
    const [rows] = await pool.query(`
      SELECT s.*, 
        (SELECT count(*) FROM videos v2 JOIN sections s2 ON v2.section_id = s2.id WHERE s2.subject_id = s.id) as total_videos,
        (SELECT count(*) FROM video_progress p2 
         JOIN videos v3 ON p2.video_id = v3.id 
         JOIN sections s3 ON v3.section_id = s3.id 
         WHERE s3.subject_id = s.id AND p2.user_id = ? AND p2.is_completed = true) as completed_videos,
        MAX(p.updated_at) as last_progress_update
      FROM subjects s
      JOIN sections sec ON s.id = sec.subject_id
      JOIN videos v ON sec.id = v.section_id
      JOIN video_progress p ON v.id = p.video_id
      WHERE p.user_id = ?
      GROUP BY s.id
      ORDER BY last_progress_update DESC
    `, [userId, userId]);

    fs.writeFileSync('query-debug.json', JSON.stringify({
      success: true,
      data: rows,
      count: rows.length
    }, null, 2));
    console.log('Query successful, results in query-debug.json');
  } catch (err) {
    fs.writeFileSync('query-error.json', JSON.stringify({
      success: false,
      error: err.message,
      stack: err.stack
    }, null, 2));
    console.error('Query failed:', err.message);
  }
  process.exit(0);
}

test();
