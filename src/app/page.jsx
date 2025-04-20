'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';
import styles from './page.module.css';
import Mic from '@/components/Mic';
import Transcript from '@/components/Transcript';
import useDeviceDetect from '@/hooks/useDeviceDetect';


function getVibeLevel({ positive, neutral, negative }) {
    // console.log('Vibe Level:', { positive, neutral, negative });
    const entries = [
        { label: 'positive', score: positive },
        { label: 'neutral', score: neutral },
        { label: 'negative', score: negative }
    ];

    // console.log('Entries:', entries);

    const top = entries.reduce((a, b) => b.score > a.score ? b : a);
    const conf = top.score, sentiment = top.label;

    if (sentiment === 'positive') {
        if (conf > 0.9) return { label: "Extreamly Positive", emoji: "✨", message: "You're radiating positivity!", sentiment };
        if (conf > 0.6) return { label: "Very Positive", emoji: "😊", message: "You're feeling pretty good.", sentiment };
        return { label: "Mildly Positive", emoji: "🌤️", message: "A gentle breeze of good vibes.", sentiment };
    }

    if (sentiment === 'neutral') {
        if (conf > 0.9) return { label: "Zen Mode", emoji: "🍵", message: "Completely unbothered. Inner peace unlocked.", sentiment };
        return { label: "Neutral Vibe", emoji: "😐 ", message: "Not good, not bad. Just... existing.", sentiment };
    }

    if (sentiment === 'negative') {
        if (conf > 0.9) return { label: "Vibe Emergency", emoji: "💀", message: "You're in the danger zone. Get snacks & hugs.", sentiment };
        if (conf > 0.6) return { label: "Bad Vibes", emoji: "😞", message: "Tough moment. Take a deep breath.", sentiment };
        return { label: "Slightly Off", emoji: "😕", message: "Not the worst, but definitely off.", sentiment };
    }

    return { label: "Unknown Vibe", emoji: "🤔❓", message: "Can't detect your vibe.", sentiment: "neutral" };
}


const MoodBackground = ({ sentiment }) => {
    const backgrounds = {
        positive: {
            background: 'radial-gradient(circle at 30% 30%, rgba(40, 167, 69, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(40, 167, 69, 0.3) 0%, transparent 50%), #0a0a0a'
        },
        negative: {
            background: 'radial-gradient(circle at 30% 30%, rgba(220, 53, 69, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(220, 53, 69, 0.3) 0%, transparent 50%), #0a0a0a'
        },
        neutral: {
            background: 'radial-gradient(circle at 30% 30%, rgba(0, 49, 83, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 49, 83, 0.3) 0%, transparent 50%), #0a0a0a'
        }
    };

    const currentSentiment = sentiment?.toLowerCase() || 'neutral';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: '#0a0a0a',
        }}>
            {Object.keys(backgrounds).map(mood => (
                <div
                    key={mood}
                    style={{
                        ...backgrounds[mood],
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: mood === currentSentiment ? 1 : 0,
                        transition: 'opacity 0.4s ease-in',
                    }}
                />
            ))}
        </div>
    );
};

const MAX_FREE_CREDITS = 10;

export default function Home({ }) {
    // Initialize ref to false to ensure initial load happens
    const initialLoadDone = useRef(false);

    const [apiKey, setApiKey] = useState(false);
    const [creditsUsed, setCreditsUsed] = useState(0);
    const [finalTranscript, setFinalTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [moodData, setMoodData] = useState({ label: "", emoji: "", message: "", sentiment: "" });
    const [fetchData, setFetchData] = useState(false);

    const { isMobile } = useDeviceDetect();


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
                // console.log('Credits loaded:', isNaN(parsedCredits) ? 0 : parsedCredits);

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
                // console.log('Credits updated in storage:', creditsUsed);
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
            // console.warn('Recording stopped without capturing any text');
            return;
        }

        try {
            setFetchData(true);
            const response = await fetch('/api/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: finalTranscript }),
            });

            console.log('Sentiment analysis response:', response);


            if (!response.ok) {
                setCreditsUsed(prev => prev - 1);
                alert("The credit has been refunded due to an error in the analysis. Please try again.");
                throw new Error('Network response was not ok');
            }


            const data = await response.json();
            // console.log('Sentiment analysis response:', data.negative, data.positive, data.neutral);
            setMoodData(getVibeLevel({ positive: data.positive, neutral: data.neutral, negative: data.negative }));

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
            // console.warn('Recording stopped without capturing any text');
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
            neutral: '#fff427',
        };
        return colors[label?.toLowerCase()] || '#007bff';
    };





    const remainingCredits = MAX_FREE_CREDITS - creditsUsed;


    return (
        <div className={`${styles.container} container pt-3 mt-5`}>
            <MoodBackground sentiment={moodData.sentiment} />

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
                                <Transcript
                                    value={listening ? (
                                        isMobile
                                            ? finalTranscript
                                            : finalTranscript + ' ' + interimTranscript
                                    ) : finalTranscript}
                                />
                            </div>
                            <div className="col-md-6 px-auto p-3 ">
                                <h3 className="mb-3 text-center"> {moodData.label !== "" ? moodData.emoji : ("Vibes!")}</h3>
                                {moodData.sentiment && (
                                    <div className="text-center">
                                        <span style={{ color: getMoodColor(moodData.sentiment) }} className='d-block fs-5'>{moodData.label}</span>
                                        <span className='d-block fs-6 pt-2'>{moodData.message}</span>
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
