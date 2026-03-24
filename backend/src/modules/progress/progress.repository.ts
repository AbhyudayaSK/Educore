import { pool } from '../../config/db';

export class ProgressRepository {
  async getSubjectProgress(userId: number, subjectId: number) {
    // get total videos
    const [totalRes]: any = await pool.query(`
      SELECT count(*) as total FROM videos v
      JOIN sections s ON v.section_id = s.id
      WHERE s.subject_id = ?
    `, [subjectId]);

    const [completedRes]: any = await pool.query(`
      SELECT count(*) as completed FROM video_progress p
      JOIN videos v ON p.video_id = v.id
      JOIN sections s ON v.section_id = s.id
      WHERE s.subject_id = ? AND p.user_id = ? AND p.is_completed = true
    `, [subjectId, userId]);

    const [lastRes]: any = await pool.query(`
      SELECT p.video_id, p.last_position_seconds FROM video_progress p
      JOIN videos v ON p.video_id = v.id
      JOIN sections s ON v.section_id = s.id
      WHERE s.subject_id = ? AND p.user_id = ?
      ORDER BY p.updated_at DESC LIMIT 1
    `, [subjectId, userId]);

    return {
      total_videos: parseInt(totalRes[0].total),
      completed_videos: parseInt(completedRes[0].completed),
      last_video_id: lastRes[0]?.video_id || null,
      last_position_seconds: lastRes[0]?.last_position_seconds || 0
    };
  }

  async getVideoProgress(userId: number, videoId: number) {
    const [rows]: any = await pool.query('SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?', [userId, videoId]);
    return rows[0] || null;
  }

  async upsertVideoProgress(userId: number, videoId: number, lastPositionSeconds: number, isCompleted: boolean) {
    const completedAt = isCompleted ? new Date() : null;
    await pool.query(`
      INSERT INTO video_progress (user_id, video_id, last_position_seconds, is_completed, completed_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
        last_position_seconds = VALUES(last_position_seconds),
        is_completed = CASE WHEN video_progress.is_completed THEN true ELSE VALUES(is_completed) END,
        completed_at = CASE WHEN video_progress.is_completed THEN video_progress.completed_at WHEN VALUES(is_completed) THEN VALUES(completed_at) ELSE null END,
        updated_at = NOW()
    `, [userId, videoId, lastPositionSeconds, isCompleted, completedAt]);
  }

  async getEnrolledSubjects(userId: number) {
    const [rows]: any = await pool.query(`
      SELECT s.id, s.title, s.description, s.thumbnail_url, s.slug,
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
      GROUP BY s.id, s.title, s.description, s.thumbnail_url, s.slug
      ORDER BY last_progress_update DESC
    `, [userId, userId]);
    return rows;
  }

  async deleteSubjectProgress(userId: number, subjectId: number) {
    await pool.query(`
      DELETE p FROM video_progress p
      JOIN videos v ON p.video_id = v.id
      JOIN sections s ON v.section_id = s.id
      WHERE p.user_id = ? AND s.subject_id = ?
    `, [userId, subjectId]);
  }
}
