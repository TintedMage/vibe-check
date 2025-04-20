import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';

export async function POST(request) {
    console.log('Received request for sentiment analysis');

    const cookieStore = await cookies();
    const apiKey = cookieStore.get('apiKey')?.value || process.env.HUGGING_FACE_API_KEY;
    // console.log('API Key:', apiKey);


    try {
        const { text } = await request.json();

        if (!text || text.trim() === '') {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        // Call Hugging Face API for sentiment analysis
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
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
        // console.log('Raw result:', rawResult);

        // Format the result for easier consumption
        let formattedResult = {
            positive: 0,
            neutral: 0,
            negative: 0
        };

        // Extract data from the nested array structure
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

        // console.log(formattedResult);
        return NextResponse.json(formattedResult);
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}