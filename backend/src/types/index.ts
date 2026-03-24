export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Subject {
  id: number;
  title: string;
  slug: string;
  description: string;
  is_published: boolean;
  thumbnail_url?: string;
  total_videos?: number;
  total_duration_seconds?: number;
}

export interface Section {
  id: number;
  subject_id: number;
  title: string;
  order_index: number;
}

export interface Video {
  id: number;
  section_id: number;
  title: string;
  description: string;
  youtube_url: string;
  order_index: number;
  duration_seconds: number;
}

export interface VideoProgress {
  id: number;
  user_id: number;
  video_id: number;
  last_position_seconds: number;
  is_completed: boolean;
  completed_at: Date | null;
}
