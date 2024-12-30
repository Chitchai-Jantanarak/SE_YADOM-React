import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { Cloud } from "../models/Cloud";

const Clouds = ({ isMobile }) => {
    const cloudRefs = useRef([]);

    // refs array matches the number of clouds
    if (cloudRefs.current.length !== 6) {
        cloudRefs.current = new Array(6).fill().map(() => React.createRef());
    }

    const scroll = useScroll();

    useFrame(() => {
        cloudRefs.current.forEach((ref, index) => {
            if (ref.current) {
                ref.current.position.y = Math.sin(scroll.offset * 5 + index) * 2;
                ref.current.rotation.z += 0.005;
            }
        });
    });

    return (
        <group>
            <Cloud ref={cloudRefs.current[0]} position={[0, 0, 1]}          rotation={[321, 20, 0]}  scale={isMobile ? 1.25 : 1.5} />
            <Cloud ref={cloudRefs.current[1]} position={[-5, 1, 1]}         rotation={[60, 180, 0]}  scale={isMobile ? 1.25 : 1.5} />
            <Cloud ref={cloudRefs.current[2]} position={[-5, -2, 1]}        rotation={[0, 0, 0]}     scale={isMobile ? 1.25 : 1.5} />
            <Cloud ref={cloudRefs.current[3]} position={[-1.5, -2.25, -1]}  rotation={[0, 180, 0]}   scale={isMobile ? 1.25 : 1.5} />
            <Cloud ref={cloudRefs.current[4]} position={[3, -2, 1]}         rotation={[320, 45, 0]}  scale={isMobile ? 1.25 : 1.5} />
            <Cloud ref={cloudRefs.current[5]} position={[5, 3, 0]}          rotation={[0, 0, 0]}     scale={isMobile ? 1.25 : 1.5} />
        </group>
    );
};


const Experience = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth < 1024);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return (
        <Canvas
            gl={{ alpha: true }}
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <ScrollControls pages={2} damping={0.1} style={{ overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Environment preset='dawn' background={false} />
                <ambientLight intensity={0.4} />
                <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={isMobile ? 75 : 45} />

                <Clouds isMobile={isMobile} />

                <Scroll html>
                    <h2>Hi, I'm</h2>
                </Scroll>
            </ScrollControls>
        </Canvas>
    );
};

export default Experience;
