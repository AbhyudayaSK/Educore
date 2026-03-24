import { pool } from '../../config/db';
import { Video, Section, Subject, VideoProgress } from '../../types';

export class VideoRepository {
  async getVideoById(videoId: number): Promise<Video | null> {
    const [rows]: any = await pool.query('SELECT * FROM videos WHERE id = ?', [videoId]);
    return rows[0] || null;
  }

  async getSectionById(sectionId: number): Promise<Section | null> {
    const [rows]: any = await pool.query('SELECT * FROM sections WHERE id = ?', [sectionId]);
    return rows[0] || null;
  }

  async getSubjectById(subjectId: number): Promise<Subject | null> {
    const [rows]: any = await pool.query('SELECT * FROM subjects WHERE id = ?', [subjectId]);
    return rows[0] || null;
  }

  async getSubjectVideosOrdered(subjectId: number): Promise<Video[]> {
    const [rows]: any = await pool.query(`
      SELECT v.* FROM videos v
      JOIN sections s ON v.section_id = s.id
      WHERE s.subject_id = ?
      ORDER BY s.order_index ASC, v.order_index ASC
    `, [subjectId]);
    return rows as Video[];
  }

  async getUserProgress(userId: number, videoId: number): Promise<VideoProgress | null> {
    const [rows]: any = await pool.query('SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?', [userId, videoId]);
    return rows[0] || null;
  }
}
