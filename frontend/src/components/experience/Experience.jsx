import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import { Cloud } from "../models/Cloud";

const Experience = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // de-call triggering handlerSize
    }, []);

    return (
        <Canvas 
            gl={{ alpha: true }} 
            style={{ 
                // background: '#F0F1CB', 
                background: 'linear-gradient(to bottom, #74c3fb 10%, #f0f1cb 10%, #f0f1cb 90%, #74c3fb 90%)',
                width: '100%', 
                height: '100%' 
            }}
        >
            <Environment preset='dawn' /> 

            <Cloud position={[0, 0, 0]} scale={isMobile ? 1 : 2} />
            <OrbitControls />
        </Canvas>

    );
}

export default Experience;