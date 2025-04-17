'use client';

import styles from '../page.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function About() {
    const [activeTab, setActiveTab] = useState('journey');

    return (
        <div className={`${styles.container} container pt-5 mt-5 text-center`}>
            {/* Header with improved styling */}
            <div className="row justify-content-center ">
                <div className="col-12">
                    <div className="position-relative pb-4">
                        <h1 className={`${styles.heading} display-4 pt-4`}>
                            About Vibe Check
                        </h1>
                        <div className="mx-auto"
                            style={{
                                width: '120px',
                                height: '5px',
                                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                            }}
                        ></div>
                        <div className="position-absolute top-0 start-50 translate-middle-x opacity-25"
                            style={{
                                width: '200px',
                                height: '200px',
                                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                                zIndex: '-1',
                                filter: 'blur(15px)'
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Introduction Card with Pattern Background */}
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="bg-dark bg-opacity-25 rounded-4 p-5 mb-5 shadow text-center position-relative overflow-hidden">
                        {/* Decorative pattern */}
                        <div className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23ffffff\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")',
                                backgroundSize: '20px 20px',
                                zIndex: '0',
                                opacity: '0.1'
                            }}
                        ></div>

                        <div className="position-relative z-1">
                            <div className="d-inline-block mb-4 position-relative">
                                <span className="badge bg-primary px-3 py-2 rounded-pill mb-3 fs-6">My Project</span>
                                <div className="position-absolute top-100 start-50 translate-middle"
                                    style={{
                                        width: '80%',
                                        height: '2px',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                                    }}
                                ></div>
                            </div>

                            <h2 className="display-6 fw-bold mb-4">What is Vibe Check?</h2>

                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <p className="lead mb-4 fw-normal">
                                        Vibe Check is my personal web application that analyzes the emotional tone of speech in real-time,
                                        helping understand the sentiment behind words.
                                    </p>
                                    <p className="mb-0">
                                        I built this using speech recognition technology and AI-powered sentiment analysis,
                                        transforming spoken words into actionable insights about emotional content.
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <h3 className="h3 mb-4">Technology I Used</h3>
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



                    {/* Key Features with animation classes */}
                    <h2 className="display-6 fw-bold mb-4 pt-3">Key Features I Built</h2>
                    <div className="row justify-content-center g-4 mb-5">
                        {[
                            {
                                title: "Speech Recognition",
                                desc: "Advanced real-time speech capture using the Web Speech API",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />,
                                color: "primary"
                            },
                            {
                                title: "Sentiment Analysis",
                                desc: "AI-powered emotion detection using Hugging Face models",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                                color: "success"
                            },
                            {
                                title: "Live Transcription",
                                desc: "See your words as you speak them with interim results",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
                                color: "info"
                            },
                            {
                                title: "Secure API System",
                                desc: "Use my free tier or add your own API key for unlimited access",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
                                color: "warning"
                            }
                        ].map((feature, idx) => (
                            <div className="col-lg-6 col-md-6" key={idx}>
                                <div className="bg-dark bg-opacity-25 rounded-4 p-4 h-100 d-flex flex-column align-items-center text-center shadow-sm hover-lift">
                                    <div className={`bg-${feature.color} bg-opacity-50 rounded-circle p-3 mb-3`}>
                                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {feature.icon}
                                        </svg>
                                    </div>
                                    <h4>{feature.title}</h4>
                                    <p className="mb-0">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
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
                                        <div className="h-100 d-flex align-items-center justify-content-center text-white">ME</div>
                                    </div>
                                    <div className="text-start">
                                        <p className="mb-0 fw-bold">My Reflection</p>
                                        <p className="small text-muted mb-0">Web Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action with improved styling */}
                    <div className="bg-primary bg-opacity-20 rounded-4 p-5 mb-5 shadow text-center position-relative overflow-hidden">
                        <div className="position-absolute top-50 start-0 translate-middle"
                            style={{
                                width: '300px',
                                height: '300px',
                                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                                zIndex: '0',
                                filter: 'blur(40px)'
                            }}
                        ></div>

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

                    {/* Footer note */}
                    <p className="text-muted small mt-5">
                        Made with ❤️ by me | © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div >
    );
}