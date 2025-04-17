'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';
import styles from './page.module.css';
import Mic from '@/components/Mic';
import Transcript from '@/components/Transcript';

const MAX_FREE_CREDITS = 10;

export default function Home({ }) {
    // Initialize ref to false to ensure initial load happens
    const initialLoadDone = useRef(false);

    const [apiKey, setApiKey] = useState(false);
    const [creditsUsed, setCreditsUsed] = useState(0);
    const [finalTranscript, setFinalTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [moodData, setMoodData] = useState({ sentiment: '', confidence: 0 });
    const [fetchData, setFetchData] = useState(false);

    // Load credits from localStorage on mount
    useEffect(() => {

        // Check for the apiKeyFlag cookie
        const hasApiKey = Cookies.get('apiKeyFlag') === 'true';
        setApiKey(hasApiKey);
        console.log('API key present:', hasApiKey);

        try {
            // Only load if we haven't done so already
            if (!initialLoadDone.current) {
                const storedCredits = localStorage.getItem('creditsUsed');
                const parsedCredits = storedCredits ? parseInt(storedCredits, 10) : 0;

                setCreditsUsed(isNaN(parsedCredits) ? 0 : parsedCredits);
                console.log('Credits loaded:', isNaN(parsedCredits) ? 0 : parsedCredits);

                // Mark initial load as complete
                initialLoadDone.current = true;
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }, []);

    // Save credits to localStorage when they change
    useEffect(() => {
        try {
            // Only save after initial load to prevent overwriting with default values
            if (initialLoadDone.current) {
                localStorage.setItem('creditsUsed', creditsUsed.toString());
                console.log('Credits updated in storage:', creditsUsed);
            }
        } catch (error) {
            console.error('Error updating localStorage:', error);
        }
    }, [creditsUsed]);

    // Check if credits are available before allowing recording
    const handleMicClick = () => {
        // If API key is provided, always allow recording
        if (apiKey === true) {
            return true;
        }

        // Check if credits are exhausted
        if (creditsUsed >= MAX_FREE_CREDITS) {
            console.log('No credits remaining');
            return false; // Prevent recording
        }

        // Allow recording (credits will be incremented when recording starts)
        return true;
    };

    // Update credits when recording starts
    const handleListeningChange = (isListening) => {
        setListening(isListening);

        if (isListening) {
            // Only increment credits when starting a new recording
            if (!apiKey && creditsUsed < MAX_FREE_CREDITS) {
                setCreditsUsed(prev => prev + 1);
            }

            // Reset transcripts
            setFinalTranscript('');
            setInterimTranscript('');
        } else {
            setInterimTranscript('');
        }
    };

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
        }
        if (interim !== undefined) {
            setInterimTranscript(interim);
        }
    };

    const getMoodColor = (label) => {
        const colors = {
            positive: '#28a745',
            negative: '#dc3545',
        };
        return colors[label?.toLowerCase()] || '#007bff';
    };

    const remainingCredits = MAX_FREE_CREDITS - creditsUsed;

    return (
        <div className={`${styles.container} container pt-5 mt-5`}>
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h1 className={`${styles.heading} pt-5`}>Vibe Check</h1>
                </div>
            </div>

            {/* Credits indicator */}
            <div className="pb-2 text-center">
                <small className="text-muted">
                    {apiKey && (<span className='text-success'>Api Key Provided!</span>)}
                    {!apiKey && remainingCredits > 0 && (
                        <>Free credits remaining: <span className="badge bg-dark fs-6">{remainingCredits}</span></>
                    )}
                    {!apiKey && remainingCredits <= 0 && (
                        <span className="text-warning">Free credits exhausted. Please provide your API key in settings.</span>
                    )}
                </small>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <Mic
                        onTranscript={handleTranscript}
                        onListeningChange={handleListeningChange}
                        className={styles.mic_cont}
                        iconClass={styles.mic_icon}
                        onBeforeListening={handleMicClick}
                        disabled={apiKey === true ? false : remainingCredits <= 0}
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
