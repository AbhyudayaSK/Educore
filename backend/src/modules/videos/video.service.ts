import { VideoRepository } from './video.repository';

const repository = new VideoRepository();

export class VideoService {
  async getVideoDetails(videoId: number, userId: number | null) {
    const video = await repository.getVideoById(videoId);
    if (!video) throw new Error('Video not found');

    const section = await repository.getSectionById(video.section_id);
    if (!section) throw new Error('Section not found');

    const subject = await repository.getSubjectById(section.subject_id);
    if (!subject) throw new Error('Subject not found');

    const orderedVideos = await repository.getSubjectVideosOrdered(subject.id);
    const currentIndex = orderedVideos.findIndex(v => v.id === video.id);

    const previousVideo = currentIndex > 0 ? orderedVideos[currentIndex - 1] : null;
    const nextVideo = currentIndex < orderedVideos.length - 1 ? orderedVideos[currentIndex + 1] : null;

    let locked = false;
    let unlock_reason: string | null = null;

    if (previousVideo) {
      if (!userId) {
        locked = true;
        unlock_reason = 'Login required to unlock';
      } else {
        const prevProgress = await repository.getUserProgress(userId, previousVideo.id);
        if (!prevProgress?.is_completed) {
          locked = true;
          unlock_reason = `You must complete "${previousVideo.title}" first`;
        }
      }
    }

    return {
      id: video.id,
      title: video.title,
      description: video.description,
      youtube_url: video.youtube_url,
      order_index: video.order_index,
      duration_seconds: video.duration_seconds,
      section: { id: section.id, title: section.title },
      subject: { id: subject.id, title: subject.title },
      previous_video_id: previousVideo?.id || null,
      next_video_id: nextVideo?.id || null,
      locked,
      unlock_reason
    };
  }
}
