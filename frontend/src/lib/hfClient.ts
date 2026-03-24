import axios from 'axios';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatWithAI = async (messages: Message[]) => {
  try {
    const response = await axios.post('/api/ai', { messages });
    return response.data.content;
  } catch (error: any) {
    console.error('AI API Error:', error.response?.data || error.message);
    throw new Error('Failed to get response from AI Tutor. Please try again later.');
  }
};
