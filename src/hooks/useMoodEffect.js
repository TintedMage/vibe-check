import { useEffect } from 'react';

export function useMoodEffect(sentiment) {
    useEffect(() => {
        // Set the initial neutral color
        if (!sentiment) {
            document.documentElement.style.setProperty('--col2', '#003153');
            return;
        }

        // Normalize the sentiment
        const mood = sentiment.toLowerCase();

        // Define colors for different moods
        const moodColors = {
            positive: '#28a745', // Green
            negative: '#dc3545', // Red
            neutral: '#007bff',  // Blue
            mixed: '#ffc107',    // Yellow/Amber (in case you add this mood)
        };

        // Set the color based on mood, with fallback
        const color = moodColors[mood] || '#003153';
        document.documentElement.style.setProperty('--col2', color);

        // Reset on component unmount
        return () => {
            document.documentElement.style.setProperty('--col2', '#003153');
        };
    }, [sentiment]);
}