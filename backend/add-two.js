const mysql = require('mysql2/promise');

async function addTwoMore() {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'System@123',
    database: 'lms_db'
  };
  
  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to lms_db');
    
    // Add Subjects
    const subjects = [
      [14, 'Ethereum & Web3 Development', 'web3-solidity', 'Build decentralized applications with Solidity.', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80', true],
      [15, 'Quantum Computing Basics', 'quantum-basics', 'Introduction to qubits, gates, and quantum algorithms.', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80', true]
    ];
    
    for (const s of subjects) {
        await conn.query('INSERT IGNORE INTO subjects (id, title, slug, description, thumbnail_url, is_published) VALUES (?, ?, ?, ?, ?, ?)', s);
    }
    console.log('✅ Added subjects.');

    // Add Sections
    const sections = [
      [17, 14, 'Solidity Basics', 0],
      [18, 15, 'Qubits & Gates', 0]
    ];
    for (const sec of sections) {
        await conn.query('INSERT IGNORE INTO sections (id, subject_id, title, order_index) VALUES (?, ?, ?, ?)', sec);
    }
    console.log('✅ Added sections.');

    // Add Videos
    const videos = [
      [17, 17, 'Solidity Intro', 'Writing smart contracts', 'https://www.youtube.com/watch?v=M576WGiDBdQ', 0, 3200],
      [18, 18, 'Intro to Quantum', 'What is a qubit?', 'https://www.youtube.com/watch?v=JhHMJCUmq28', 0, 2700]
    ];
    for (const v of videos) {
        await conn.query('INSERT IGNORE INTO videos (id, section_id, title, description, youtube_url, order_index, duration_seconds) VALUES (?, ?, ?, ?, ?, ?, ?)', v);
    }
    console.log('✅ Added videos.');

    await conn.end();
  } catch (err) {
    console.error('❌ Addition failed:', err.message);
  }
}

addTwoMore();
