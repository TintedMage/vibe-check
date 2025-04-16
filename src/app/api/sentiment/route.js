import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';

export async function POST(request) {
    console.log('Received request for sentiment analysis');

    const cookieStore = cookies();
    const apiKey = cookieStore.get('apiKey')?.value || process.env.HUGGING_FACE_API_KEY;
    console.log('API Key:', apiKey);


    try {
        const { text } = await request.json();

        if (!text || text.trim() === '') {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        // Call Hugging Face API for sentiment analysis
        const response = await fetch(
            "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
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

        // Format the result for easier consumption
        let formattedResult = {
            sentiment: "UNKNOWN",
            score: 0,
            confidence: 0,
            rawData: rawResult
        };

        // Extract data from the nested array structure
        if (Array.isArray(rawResult) &&
            rawResult.length > 0 &&
            Array.isArray(rawResult[0]) &&
            rawResult[0].length > 0) {

            // Get the first (usually highest-scoring) sentiment
            const topSentiment = rawResult[0][0];

            formattedResult = {
                sentiment: topSentiment.label,
                score: topSentiment.score,
                confidence: Math.round(topSentiment.score * 100),
                rawData: rawResult
            };
        }

        return NextResponse.json(formattedResult);
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}