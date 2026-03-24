import { ProgressRepository } from './progress.repository';

const repository = new ProgressRepository();

export class ProgressService {
  async getSubjectProgress(userId: number, subjectId: number) {
    const stats = await repository.getSubjectProgress(userId, subjectId);
    const percent_complete = stats.total_videos > 0 ? Math.round((stats.completed_videos / stats.total_videos) * 100) : 0;
    return { ...stats, percent_complete };
  }

  async getVideoProgress(userId: number, videoId: number) {
    return repository.getVideoProgress(userId, videoId);
  }

  async updateVideoProgress(userId: number, videoId: number, lastPositionSeconds: number, isCompleted: boolean) {
    await repository.upsertVideoProgress(userId, videoId, lastPositionSeconds, isCompleted);
  }

  async getEnrolledSubjects(userId: number) {
    const subjects = await repository.getEnrolledSubjects(userId);
    return subjects.map((s: any) => {
      const total_videos = parseInt(s.total_videos);
      const completed_videos = parseInt(s.completed_videos);
      const percent_complete = total_videos > 0 ? Math.round((completed_videos / total_videos) * 100) : 0;
      return { ...s, total_videos, completed_videos, percent_complete };
    });
  }

  async deleteSubjectProgress(userId: number, subjectId: number) {
    return await repository.deleteSubjectProgress(userId, subjectId);
  }
}
