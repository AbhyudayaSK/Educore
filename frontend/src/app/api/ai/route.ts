import { NextResponse } from 'next/server';
import axios from 'axios';

const HF_ACCESS_KEY = process.env.HUGGING_FACE_ACCESS_KEY;
const MODEL_ID = 'meta-llama/Meta-Llama-3-8B-Instruct';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!HF_ACCESS_KEY) {
      return NextResponse.json({ error: 'AI integration not configured' }, { status: 500 });
    }

    const response = await axios.post(
      `https://router.huggingface.co/v1/chat/completions`,
      {
        model: MODEL_ID,
        messages: messages,
        max_tokens: 500,
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${HF_ACCESS_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ content: response.data.choices[0].message.content });
  } catch (error: any) {
    console.error('AI Route Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to get response from AI Tutor' },
      { status: error.response?.status || 500 }
    );
  }
}
