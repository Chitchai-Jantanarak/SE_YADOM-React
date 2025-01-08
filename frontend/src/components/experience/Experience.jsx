import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    Environment, 
    Html,
    PerspectiveCamera, 
    Scroll, 
    ScrollControls, 
    useScroll, 
} from "@react-three/drei";
import { motion } from "framer-motion-3d"
import { Cloud } from "../models/Cloud";
import { Model1 } from "../models/Model1";

const Clouds = ({ isMobile }) => {    
    const cloudRefs = useRef([]);
    const initialPositions = [
        [0, -1.5, 0],
        [-6, 0, -1],
        [-2.5, -3.5, -2],
        [-6, -3.5, -1],
        [4, -3.5, -1],
        [5.75, 2.5, -1]
    ];

    // refs array matches the number of clouds
    if (cloudRefs.current.length !== 6) {
        cloudRefs.current = new Array(6).fill().map(() => React.createRef());
    }

    const scroll = useScroll();

    useFrame(() => {
        cloudRefs.current.forEach((ref, index) => {
            if (ref.current) {
                ref.current.position.y = initialPositions[index][1] + Math.cosh(scroll.offset * 5 + (initialPositions[index][1] / 10));
            }
        });
    });

    return (
        <motion.group
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <Cloud ref={cloudRefs.current[0]}   position={initialPositions[0]}   rotation={[239.2, 39, 0]}   scale={2.0} />
            <Cloud ref={cloudRefs.current[1]}   position={initialPositions[1]}   rotation={[60, 180, 0]}     scale={2.5} />
            <Cloud ref={cloudRefs.current[2]}   position={initialPositions[2]}   rotation={[0, 20, 0]}       scale={1.5} />
            <Cloud ref={cloudRefs.current[3]}   position={initialPositions[3]}   rotation={[0, 0, 0]}        scale={2.0} />
            <Cloud ref={cloudRefs.current[4]}   position={initialPositions[4]}   rotation={[-126, 45, 0]}    scale={2.0} />
            <Cloud ref={cloudRefs.current[5]}   position={initialPositions[5]}   rotation={[19, 20, 0.5]}    scale={1.5} />
            {/* <Cloud ref={cloudRefs.current[0]}   position={initialPositions[0]}   rotation={[239.2, 39, 0]}   scale={isMobile ? 1.25 : 2.0} />
            <Cloud ref={cloudRefs.current[1]}   position={initialPositions[1]}   rotation={[60, 180, 0]}     scale={isMobile ? 1.25 : 2.5} />
            <Cloud ref={cloudRefs.current[2]}   position={initialPositions[2]}   rotation={[0, 20, 0]}       scale={isMobile ? 1.25 : 1.5} />
            <Cloud ref={cloudRefs.current[3]}   position={initialPositions[3]}   rotation={[0, 0, 0]}        scale={isMobile ? 1.25 : 2.0} />
            <Cloud ref={cloudRefs.current[4]}   position={initialPositions[4]}   rotation={[-126, 45, 0]}    scale={isMobile ? 1.25 : 2.0} />
            <Cloud ref={cloudRefs.current[5]}   position={initialPositions[5]}   rotation={[19, 20, 0.5]}    scale={isMobile ? 1.25 : 1.5} /> */}
        </motion.group>
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
            fallback={<div>WebGL supported NEEDED!</div>}
            gl={{ alpha: true, antialias: false}}
            dpr={[1, 1.5]}
            className='home-experience1-scene'
            
        >   
            <Suspense fallback={null}>
                <ScrollControls pages={2} damping={0.2} style={{scrollbarColor: 'transparent transparent' }}>
                    <Environment preset='dawn' background={false} />
                    <ambientLight intensity={0.4} />
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={isMobile ? 75 : 45} />

                    <Clouds isMobile={isMobile} />
                    <Scroll>
                        {/* <Model1 position={[0, -2, 1]} scale={isMobile ? 0.5 : 0.5} /> */}
                        
                        <Html position={[0, 2, 0]} center>
                            <p 
                                className='font-alike home-experience1-title text-5xl md:text-7xl lg:text-9xl'
                            >
                                YADOMMM
                            </p>
                        </Html>

                        <Html position={[0, -17, 0]} center>
                            <div className='flex align-middle'>
                                <p 
                                    className='font-poppin text-1xl w-40'
                                >
                                    No matter who you are You can express yourself by adding your own personality.
                                    Go down with your small things with “YADOM” ready for you to be creative.
                                    Just have fun designing through your imagination.
                                </p>
                            </div>
                        </Html>
                    </Scroll>
                    
                </ScrollControls>
            </Suspense>
        </Canvas>
    );
};

export default Experience;