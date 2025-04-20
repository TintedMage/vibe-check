'use client';

import styles from '../page.module.css';
import Link from 'next/link';

export default function About() {
    return (
        <div className={`${styles.container} container pt-5 mt-5 text-center`}>

            {/* Introduction Card with Pattern Background */}
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="bg-dark bg-opacity-25 rounded-4 p-5 mb-5 shadow text-center position-relative overflow-hidden">

                        <div className="position-relative z-1">

                            <h2 className={`${styles.heading} display-6 fs-1 mb-4 mt-4`}>What is Vibe Check?</h2>
                            <div className="mx-auto mb-4"
                                style={{
                                    width: '120px',
                                    height: '5px',
                                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                                }}
                            ></div>
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <p className="lead mb-4 fw-normal">
                                        Vibe Check listens to what you say and shows you how you sound. Just speak into your microphone and watch as the app reflects your emotional tone with fun emojis and messages. <br /><br /> Whether you're feeling 😊 positive, 😐 neutral, or 😞 negative, Vibe Check gives you a real-time window into the emotional content of your words – like chatting with a friend who really gets your vibe.<br />Lol, Have Fun!🤗
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <h2 className="h3 fw-bold mb-4">Stuff I Used</h2>
                            <p className="mb-4">
                                I built Vibe Check with modern web technologies including Next.js, React, and the Web Speech API.
                                The sentiment analysis is powered by Hugging Face's state-of-the-art natural language processing models.
                            </p>
                            <div className="row g-4 justify-content-center">
                                {[
                                    { name: 'Next.js', color: '#0070f3', icon: '⚡' },
                                    { name: 'React', color: '#61dafb', icon: '⚛️' },
                                    { name: 'Web Speech API', color: '#ff4081', icon: '🎤' },
                                    { name: 'Hugging Face', color: '#ffbd59', icon: '🤗' },
                                    { name: 'Bootstrap', color: '#7952b3', icon: '🅱️' }
                                ].map((tech, idx) => (
                                    <div className="col-md-4 col-sm-6" key={idx}>
                                        <div className="card bg-dark bg-opacity-50 h-100 border-0 shadow-sm">
                                            <div className="card-body d-flex flex-column align-items-center">
                                                <div className="fs-1 mb-2">{tech.icon}</div>
                                                <h5 className="card-title" style={{ color: tech.color }}>{tech.name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>



                    {/* Key Features section with simple two-column bullet points */}
                    <div className="mt-5 mb-5">
                        <h2 className=" mb-4 fw-bold pt-3">Key Features I Built</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="bg-dark bg-opacity-25 rounded-4 p-4 h-100">
                                    <h4 className="border-bottom pb-2 mb-3 text-center">Core Functionality</h4>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">🎤</div>
                                                <div>Real-time speech recognition using Web Speech API</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">🧠</div>
                                                <div>Sentiment analysis powered by Hugging Face AI models</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">😊</div>
                                                <div>Dynamic mood detection (positive, neutral, negative)</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">💬</div>
                                                <div>Custom emoji and message feedback based on emotion intensity</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">📝</div>
                                                <div>Live transcription with interim results display</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="bg-dark bg-opacity-25 rounded-4 p-4 h-100">
                                    <h4 className="border-bottom pb-2 mb-3 text-center">Technical Implementation</h4>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">🎟️</div>
                                                <div>Free tier with 10 credits for new users</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">🔒</div>
                                                <div>Secure API key storage using HTTP-only cookies</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">📱</div>
                                                <div>Mobile device compatibility warnings</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">🎨</div>
                                                <div>Dynamic background that changes based on mood</div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="me-2">💾</div>
                                                <div>LocalStorage for tracking usage credits</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial / Personal Reflection */}
                    <div className="bg-dark bg-opacity-50 rounded-4 p-5 mb-5 shadow text-center position-relative">
                        <div className="position-absolute top-0 start-0 ms-3 mt-3 display-1 opacity-25" style={{ fontFamily: 'serif' }}>"</div>
                        <div className="position-absolute bottom-0 end-0 me-3 mb-3 display-1 opacity-25" style={{ fontFamily: 'serif' }}>"</div>

                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <p className="lead fst-italic mb-4">
                                    "Building Vibe Check taught me that the most valuable projects are those that push you outside
                                    your comfort zone. With each feature I implemented, I gained not just technical skills but also
                                    the confidence to tackle increasingly complex development challenges."
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="rounded-circle overflow-hidden me-3" style={{ width: "50px", height: "50px", backgroundColor: "#6366f1" }}>
                                        <div className="h-100 d-flex align-items-center justify-content-center text-white">KN</div>
                                    </div>
                                    <div className="text-start">
                                        <p className="mb-0 fw-bold">My Reflection</p>
                                        <p className="small text-muted mb-0">Me Probably...😋</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action with improved styling */}
                    <div className="bg-dark bg-opacity-10 rounded-4 p-5 mb-5 shadow text-center position-relative overflow-hidden">


                        <div className="position-relative z-1">
                            <h2 className="display-6 fw-bold mb-4">Ready to Try Vibe Check?</h2>
                            <p className="mb-4">Experience real-time sentiment analysis and see the emotional tone of your speech</p>
                            <div>
                                <Link href="/" className="btn btn-primary btn-lg me-3 px-4 py-2 shadow-lg">
                                    Try Vibe Check Now
                                </Link>
                                <Link href="/settings" className="btn btn-outline-light px-4 py-2">
                                    Configure Settings
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    );
}