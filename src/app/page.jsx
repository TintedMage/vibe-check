'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';
import Mic from '@/components/Mic';
import Transcript from '@/components/Transcript';
import Cookies from 'js-cookie';

export default function Home() {
    const [finalTranscript, setFinalTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [moodData, setMoodData] = useState({ sentiment: '', confidence: 0 });
    const [fetchData, setFetchData] = useState(false);

    const [apiKey, setApiKey] = useState('');

    // Check for API key on mount
    useEffect(() => {
        const savedKey = Cookies.get('huggingface_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const getData = useCallback(async () => {
        if (!finalTranscript.trim()) {
            alert('No transcript captured. Please try again.');
            console.warn('Recording stopped without capturing any text');
            return;
        }

        try {
            setFetchData(true);
            const response = await fetch('/api/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: finalTranscript }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMoodData(data && typeof data === 'object' ? data : { sentiment: '', confidence: 0 });
            console.log('Sentiment Analysis Result:', data);
        } catch (error) {
            console.error('Error fetching sentiment analysis:', error);
        } finally {
            setFetchData(false);
        }
    }, [finalTranscript]);

    useEffect(() => {
        if (!listening && finalTranscript.trim()) {
            console.log('Stopped listening, analyzing sentiment...');
            getData();
        } else if (!listening && !finalTranscript.trim()) {
            console.warn('Recording stopped without capturing any text');
        }
    }, [listening, getData, finalTranscript]);

    const handleTranscript = (final, interim) => {
        if (final) {
            setFinalTranscript((prev) => prev + ' ' + final);
            console.log('final transcript: ' + final);
        }
        if (interim !== undefined) {
            setInterimTranscript(interim);
            console.log('interim transcript: ' + interim);
        }
    };

    const handleListeningChange = (isListening) => {
        setListening(isListening);
        if (isListening) {
            setFinalTranscript('');
            setInterimTranscript('');
        } else {
            setInterimTranscript('');
        }
    };

    const getMoodColor = (label) => {
        const colors = {
            positive: '#28a745',
            negative: '#dc3545',
        };
        return colors[label?.toLowerCase()] || '#007bff';
    };

    return (
        <div className={`${styles.container} container pt-5 mt-5`}>
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h1 className={`${styles.heading} pt-5`}>Vibe Check</h1>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <Mic
                        onTranscript={handleTranscript}
                        onListeningChange={handleListeningChange}
                        className={styles.mic_cont}
                        iconClass={styles.mic_icon}
                    />
                    {listening ? (
                        <div className="text-success mt-3 ">
                            🔴 listening... <span className="text-secondary">Click Again To Stop Recording!</span>
                        </div>
                    ) : (
                        <div className=" mt-3 text-secondary">Click On The Button Above To Start Recording!</div>
                    )}

                    {fetchData && (
                        <div className="text-center my-3">
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2">Analyzing sentiment...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="row mt-5 bg-dark bg-opacity-25 rounded px-2 py-3">
                <div className="col-12">
                    <div className="">
                        <div className="row d-flex justify-content-around">
                            <div className="col-md-6 p-auto border-end px-5 ">
                                <Transcript value={listening ? finalTranscript + ' ' + interimTranscript : finalTranscript} />
                            </div>
                            <div className="col-md-6 px-auto p-3 ">
                                <h3 className="mb-4 text-center">Vibes!</h3>
                                {moodData.sentiment && (
                                    <div className="text-center">
                                        <h4 style={{ color: getMoodColor(moodData.sentiment) }}>{moodData.sentiment}</h4>
                                        <p>Confidence: {Math.round(moodData.confidence)}%</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
