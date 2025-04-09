'use client';

import { useState, useEffect } from 'react';

export default function Transcript({ value }) {
    // State to control tooltip visibility
    const [showTooltip, setShowTooltip] = useState(false);

    // Function to copy text to clipboard
    const copyToClipboard = () => {
        // Copy the text value to clipboard
        navigator.clipboard.writeText(value);

        // Show the tooltip
        setShowTooltip(true);

        // Hide the tooltip after 2 seconds
        setTimeout(() => setShowTooltip(false), 2000);
    };

    // Button styles for better readability
    const buttonStyle = {
        right: '10px',
        top: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '0.375rem'
    };

    // Tooltip styles
    const tooltipStyle = {
        position: 'absolute',
        top: '-30px',
        right: '10px',
        backgroundColor: '#212529',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        opacity: showTooltip ? 1 : 0,
        transition: 'opacity 0.3s'
    };

    return (
        <div className="position-relative">
            {/* Transcript display area */}
            <textarea
                className=" form-control bg-transparent border-0 "
                rows='5'
                placeholder="Your transcription will appear here..."
                value={value}
                disabled
            />

            {/* Copy button */}
            <button
                className="btn btn-sm btn-secondary text-black position-absolute d-flex align-items-center gap-1"
                style={buttonStyle}
                onClick={copyToClipboard}
            >
                Copy
            </button>

            {/* Tooltip that appears when text is copied */}
            <div style={tooltipStyle}>Copied!</div>
        </div>
    );
}
