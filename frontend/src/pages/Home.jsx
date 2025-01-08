import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Experience from '../components/experience/Experience';
import NavBar from '../components/layout/NavBar';

export default function Home() {
    const experienceRef = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        // Tracking scroll canvas control
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                    controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
                }
            },
            { threshold: [0, 0.6] }
        );

        if (experienceRef.current) {
            observer.observe(experienceRef.current);
        }

        return () => {
            if (experienceRef.current) {
                observer.unobserve(experienceRef.current);
            }
        };
    }, [controls]);

    return (
        <main className="home">
            <NavBar />

            <div>
                <section
                    ref={experienceRef}
                    className="h-screen"
                >
                    <Experience />
                </section>

                <section className="h-screen block">
                    <p>Test</p>
                </section>

                <section className="h-screen block">
                    <p>Test</p>
                </section>

                <section className="h-screen block">
                    <p>Test</p>
                </section>

                <section className="h-screen block">
                    <p>Test</p>
                </section>
            </div>
        </main>
    );
}
