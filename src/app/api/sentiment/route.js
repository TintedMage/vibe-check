import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        console.log('✅ Received request for sentiment analysis');

        const body = await request.json();
        // console.log('Request body:', body);
        // console.log('Request headers:', request.headers);

        const { text } = body;

        if (!text || text.trim() === '') {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        const cookieStore = await cookies(); // Awaiting cookies() as required
        const apiKey = cookieStore.get('apiKey')?.value || process.env.HUGGING_FACE_API_KEY;

        // Call Hugging Face API
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: text })
            }
        );

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json({ error }, { status: response.status });
        }

        const rawResult = await response.json();

        // Extract sentiment scores
        let formattedResult = {
            positive: 0,
            neutral: 0,
            negative: 0
        };

        if (
            Array.isArray(rawResult) &&
            rawResult.length > 0 &&
            Array.isArray(rawResult[0]) &&
            rawResult[0].length > 0
        ) {
            const items = rawResult[0];
            formattedResult = {
                positive: items.find(item => item.label.toLowerCase() === 'positive')?.score || 0,
                neutral: items.find(item => item.label.toLowerCase() === 'neutral')?.score || 0,
                negative: items.find(item => item.label.toLowerCase() === 'negative')?.score || 0,
            };
        }

        console.log('✅ Sentiment analysis result:', formattedResult);
        return NextResponse.json(formattedResult);
    } catch (error) {
        console.error('❌ Error analyzing sentiment:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
