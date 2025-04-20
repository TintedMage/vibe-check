"use client"

import { useState, useEffect } from 'react';

const FirstVisitAlert = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if this is a first visit
        const hasAcknowledgedVisit = localStorage.getItem('visitAcknowledged') === 'true';

        // Only show alert if they haven't acknowledged a previous visit
        if (!hasAcknowledgedVisit) {
            setIsVisible(true);
        }
    }, []);

    const handleOkClick = () => {
        // Mark that they've acknowledged the visit when they click OK
        localStorage.setItem('visitAcknowledged', 'true');
        setIsVisible(false);
        console.log("Ok clicked, alert hidden and acknowledged");
    }

    // Conditional rendering
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed-top h-100 d-flex flex-column justify-content-center"
            role="alert"
            style={{ backdropFilter: 'blur(15px)', zIndex: 1050 }}>
            <div className="container d-flex justify-content-center">
                <div className="bg-dark p-5 card text-center shadow-lg d-flex align-items-center">
                    <h1>Welcome!</h1>
                    <p className="card-text lead text-warning">
                        This app may not work as intended on mobile devices.
                        <span className="card-text lead text-success-emphasis">
                            <br />For the best experience, please use a desktop browser, either Chrome or Edge.
                        </span>
                    </p>
                    <p className="card-text mb-4">
                        This website also uses cookies! Thank you for understanding!
                    </p>
                    <button
                        onClick={handleOkClick}
                        className="btn btn-primary btn-sm"
                        style={{ width: '5rem' }}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FirstVisitAlert;