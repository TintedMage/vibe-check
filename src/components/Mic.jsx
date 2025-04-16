'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Microphone component that captures speech and converts it to text
 */
export default function Mic({ onTranscript, onListeningChange, className, iconClass, onBeforeListening, disabled }) {
    // Store speech recognition instance
    const recognitionRef = useRef(null);
    // Track if currently recording
    const [isListening, setIsListening] = useState(false);



    useEffect(() => {
        // Check browser support
        if (!('webkitSpeechRecognition' in window)) {
            alert('Web Speech API not supported!');
            return;
        }

        // Create and configure speech recognition
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;      // Don't stop after first result
        recognition.interimResults = true;  // Get results while speaking
        recognition.lang = 'en-US';         // Set language

        // When recording starts
        recognition.onstart = () => {
            setIsListening(true);
            if (onListeningChange) onListeningChange(true);
        };

        // When recording stops
        recognition.onend = () => {
            setIsListening(false);
            if (onListeningChange) onListeningChange(false);
        };

        // Handle recognition errors
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert(`Speech recognition error: ${event.error}`);
            setIsListening(false);
            if (onListeningChange) onListeningChange(false);
        };

        // When speech is recognized
        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            // Process all results, separating final from interim
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            // Send both final and interim transcripts to parent
            if (onTranscript) {
                // If we have new final transcript, send it with interim
                if (finalTranscript) {
                    onTranscript(finalTranscript, interimTranscript);
                }
                // Otherwise just send the interim for live updates
                else if (interimTranscript) {
                    onTranscript('', interimTranscript);
                }
            }
        };

        recognitionRef.current = recognition;

        // Cleanup on unmount
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    // Toggle mic on/off
    const toggleMic = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        try {
            if (isListening) {
                // Always allow stopping regardless of disabled state
                recognition.stop();
                setIsListening(false);
                if (onListeningChange) onListeningChange(false);
            } else {
                // Only check disabled and onBeforeListening when starting
                if (disabled) return;

                // Check with parent component if we can start recording
                if (onBeforeListening && !onBeforeListening()) {
                    return;
                }

                recognition.start();
            }
        } catch (error) {
            console.error('Error toggling microphone:', error);
            setIsListening(false);
            if (onListeningChange) onListeningChange(false);
        }

    };

    return (
        <button
            className={className}
            onClick={toggleMic}
            aria-label={isListening ? "Stop listening" : "Start listening"}

        >
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}
