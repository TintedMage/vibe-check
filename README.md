# Comprehensive Guide to the Vibe Check Web Application

## 1. Technical Stack & Architecture Overview

Vibe Check is a web application built with modern technologies that performs real-time sentiment analysis on spoken words. Here's a breakdown of the technical foundation:

- **Framework**: Built with Next.js (React-based framework) using the App Router architecture
- **Frontend**: JavaScript with React components and hooks for state management
- **Styling**: Combination of CSS Modules (for component scoping) and Bootstrap (for responsive layout)
- **API Integration**: Hugging Face AI models for sentiment analysis
- **Authentication**: Custom API key system with secure cookie storage
- **Storage**: LocalStorage for tracking usage credits

## 2. Core Functionality

The application provides these main functions:

- **Speech Recognition**: Captures spoken words through the device microphone
- **Transcription**: Displays real-time transcription of speech
- **Sentiment Analysis**: Analyzes the emotional tone of the speech
- **Credit System**: Limits free usage to encourage API key registration

## 3. Component Architecture

The application is built with these key components:

### Main Components
- **Home**: The main page component that orchestrates all functionality
- **Mic**: Custom microphone component that handles speech recognition
- **Transcript**: Displays transcribed text with copy functionality
- **FirstVisitAlert**: Provides new user guidance
- **Settings**: Manages user's API key for unlimited usage

### Server Components
- **API Routes**: Next.js API routes for secure communication with external services
- **Server Actions**: Modern Next.js actions for secure form handling (setApiCookie.js)

## 4. Technical Implementation Details

### Speech Recognition Implementation
The speech recognition is implemented using the Web Speech API.
```javascript
// In Mic.jsx
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;      // Don't stop after first result
recognition.interimResults = true;  // Get results while speaking
recognition.lang = 'en-US';         // Set language
```

### Credit System Implementation
The application tracks usage with a credit system.
```javascript
// Initialize credits from localStorage on component mount
useEffect(() => {
    try {
        if (!initialLoadDone.current) {
            const storedCredits = localStorage.getItem('creditsUsed');
            const parsedCredits = storedCredits ? parseInt(storedCredits, 10) : 0;
            setCreditsUsed(isNaN(parsedCredits) ? 0 : parsedCredits);
            initialLoadDone.current = true;
        }
    } catch (error) {
        console.error('Error accessing localStorage:', error);
    }
}, []);
```

### Sentiment Analysis API Integration
Analysis is performed by sending the text to Hugging Face API.
```javascript
const response = await fetch('/api/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: finalTranscript }),
});
```

### API Key Management
API keys are securely stored using HTTP-only cookies.
```javascript
// In setApiCookie.js
cookies().set("apiKey", apiKey, {
    httpOnly: true,     // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Prevents CSRF
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
});
```

## 5. User Experience & UI Design

### Responsive Design
The app uses Bootstrap's responsive grid system and custom CSS to ensure a good experience on different devices.
```jsx
<div className={`${styles.container} container pt-5 mt-5`}>
    <div className="row justify-content-center">
        {/* Responsive column layout */}
    </div>
</div>
```

### Visual Feedback
Color-coded sentiment results provide immediate understanding.
```javascript
const getMoodColor = (label) => {
    const colors = {
        positive: '#28a745',
        negative: '#dc3545',
    };
    return colors[label?.toLowerCase()] || '#007bff';
};
```

### Custom Cursor Effects
A unique cursor enhances the UI experience.

## 6. Advanced Features

### Browser Compatibility Checks
The application checks for API support and browser compatibility.

### Usage Limitations & Monetization Strategy
Free tier users get 10 credits, then must provide their own API key.
```javascript
const MAX_FREE_CREDITS = 10;

// Check if credits are exhausted
if (creditsUsed >= MAX_FREE_CREDITS) {
    console.log('No credits remaining');
    return false; // Prevent recording
}
```

### State Management
React hooks manage the application state.
```javascript
const [apiKey, setApiKey] = useState(false);
const [creditsUsed, setCreditsUsed] = useState(0);
const [finalTranscript, setFinalTranscript] = useState('');
// ...etc
```

## 7. Deployment & Performance
The site is built to be deployed on Vercel's platform. Performance optimizations include:
- Server components where appropriate
- Client components only where interactivity is needed
- Lazy loading of heavy components
- Optimized asset loading

## 8. Security Considerations
- API keys are stored in HTTP-only cookies for protection
- Server-side API calls protect the API key from client exposure
- Form validation prevents improper input
- Secure defaults for cookie settings

This comprehensive breakdown demonstrates the technical architecture and capabilities of the Vibe Check application.
Thank you for visiting!