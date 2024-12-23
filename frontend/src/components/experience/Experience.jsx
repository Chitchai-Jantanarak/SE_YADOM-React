import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Text, ScrollControls, Scroll, OrbitControls } from "@react-three/drei";
import { Cloud } from "../models/Cloud";
import { Fonts } from "../../utils/Fonts";

const Experience = () => {

    const [isMobile, setIsMobile]   = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // de-call triggering handlerSize
    }, []);

    return (
        <>
        <Canvas 
            gl={{ alpha: true }}
            style={{ 
                background: 'linear-gradient(to bottom, #74c3fb 10%, #f0f1cb 10%, #f0f1cb 90%, #74c3fb 90%)',
                width: '100%', 
                height: '100%' 
            }}
        >
            <ScrollControls pages={2} damping={0.5}>
                <Environment preset='dawn' /> 
                <ambientLight intensity={0.4} />
                <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={isMobile ? 75 : 45} />
                <OrbitControls></OrbitControls>
                <Text
                    position={[0, 2.5, -1]}
                    fontSize={isMobile ? 0.75 : 1}
                    font={Fonts.header}
                    color="brown"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.4}
                >
                    YADOMMMM
                </Text>

                <Cloud position={[0, 0, 1]}         rotation={[321, 20, 0]}     scale={isMobile ? 1.25 : 1.5} />
                <Cloud position={[-5, 1, 1]}        rotation={[60, 180, 0]}     scale={isMobile ? 1.25 : 1.5} />
                <Cloud position={[-5, -2, 1]}       rotation={[0, 0, 0]}        scale={isMobile ? 1.25 : 1.5} />
                <Cloud position={[-1.5, -2.25, -1]} rotation={[0, 180, 0]}      scale={isMobile ? 1.25 : 1.5} />
                <Cloud position={[3, -2, 1]}        rotation={[320, 45, 0]}     scale={isMobile ? 1.25 : 1.5} />
                <Cloud position={[5, 3, 0]}         rotation={[0, 0, 0]}        scale={isMobile ? 1.25 : 1.5} />
                
            </ScrollControls>
        </Canvas>
        </>
    );
}

export default Experience;