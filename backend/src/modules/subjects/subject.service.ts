import { SubjectRepository } from './subject.repository';

const repository = new SubjectRepository();

export class SubjectService {
  async getSubjects() {
    return repository.getSubjects();
  }

  async getSubject(id: number) {
    const subject = await repository.getSubjectById(id);
    if (!subject) throw new Error('Subject not found');
    return subject;
  }

  async getSubjectTree(subjectId: number, userId: number | null) {
    const subject = await this.getSubject(subjectId);
    const sections = await repository.getSectionsBySubject(subjectId);
    const orderedVideos = await repository.getSubjectVideosOrdered(subjectId);
    
    let progressMap: Record<number, boolean> = {};
    if (userId) {
      const progress = await repository.getUserProgressForSubject(userId, subjectId);
      progressMap = progress.reduce((acc, p) => {
        acc[p.video_id] = p.is_completed;
        return acc;
      }, {} as Record<number, boolean>);
    }

    let isPreviousCompleted = true;
    
    const enrichedVideos = orderedVideos.map(video => {
      const isCompleted = progressMap[video.id] || false;
      const locked = !isPreviousCompleted;
      isPreviousCompleted = isCompleted;
      
      return {
        ...video,
        is_completed: isCompleted,
        locked
      };
    });

    const tree = {
      ...subject,
      sections: sections.map(sec => ({
        ...sec,
        videos: enrichedVideos.filter(v => v.section_id === sec.id)
      }))
    };

    return tree;
  }

  async getFirstVideo(subjectId: number) {
    const orderedVideos = await repository.getSubjectVideosOrdered(subjectId);
    if (orderedVideos.length === 0) throw new Error('No videos found for this subject');
    return orderedVideos[0];
  }
}
