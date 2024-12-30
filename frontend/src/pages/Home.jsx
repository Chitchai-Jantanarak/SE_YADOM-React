import React, { useState } from 'react';
import Experience from '../components/experience/Experience';
import NavBar from '../components/layout/NavBar';

export default function Home() {
    return (
        <div className='home'>
            <NavBar />

            <div className="section-container">
                <section>
                    <Experience />
                </section>
            </div>
        </div>
    );
}
