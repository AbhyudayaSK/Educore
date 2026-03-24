import { pool } from '../../config/db';
import { Subject, Section, Video, VideoProgress } from '../../types';

export class SubjectRepository {
  async getSubjects(): Promise<Subject[]> {
    const [rows]: any = await pool.query(`
      SELECT 
        s.*, 
        COUNT(v.id) as total_videos, 
        COALESCE(SUM(v.duration_seconds), 0) as total_duration_seconds 
      FROM subjects s
      LEFT JOIN sections sec ON s.id = sec.subject_id
      LEFT JOIN videos v ON sec.id = v.section_id
      WHERE s.is_published = true 
      GROUP BY s.id 
      ORDER BY s.created_at DESC
    `);
    return rows as Subject[];
  }

  async getSubjectById(id: number): Promise<Subject | null> {
    const [rows]: any = await pool.query('SELECT * FROM subjects WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async getSectionsBySubject(subjectId: number): Promise<Section[]> {
    const [rows]: any = await pool.query('SELECT * FROM sections WHERE subject_id = ? ORDER BY order_index ASC', [subjectId]);
    return rows as Section[];
  }

  async getVideosBySection(sectionId: number): Promise<Video[]> {
    const [rows]: any = await pool.query('SELECT * FROM videos WHERE section_id = ? ORDER BY order_index ASC', [sectionId]);
    return rows as Video[];
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

  async getUserProgressForSubject(userId: number, subjectId: number): Promise<VideoProgress[]> {
    const [rows]: any = await pool.query(`
      SELECT p.* FROM video_progress p
      JOIN videos v ON p.video_id = v.id
      JOIN sections s ON v.section_id = s.id
      WHERE p.user_id = ? AND s.subject_id = ?
    `, [userId, subjectId]);
    return rows as VideoProgress[];
  }
}
