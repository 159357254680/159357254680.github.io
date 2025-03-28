import  { useState, useEffect, useRef } from 'react';

export default function Star() {
    const [lights, setLights] = useState([]); 
    const lastLightTime = useRef(0); 

    const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastLightTime.current < 100) return; 
        lastLightTime.current = now;

        const newLight = {
            id: now, 
            x: e.clientX, 
            y: e.clientY,
        };
        setLights((prevLights) => [...prevLights, newLight]);

        
        setTimeout(() => {
            setLights((prevLights) => prevLights.filter(light => light.id !== newLight.id));
        }, 800); 
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            
            <style>
                {`
                    @keyframes lightMove {
                        0% {
                            opacity: 1;
                            transform: scale(0.8) rotate(0deg);
                        }
                        100% {
                            opacity: 0; 
                            transform: scale(1.2) rotate(180deg); 
                        }
                    }

                    
                    .star-shape {
                        clip-path: polygon(
                            50% 0%, 61% 35%, 98% 35%, 68% 57%,
                            79% 91%, 50% 70%, 21% 91%, 32% 57%,
                            2% 35%, 39% 35%
                        );
                    }
                `}
            </style>

            {lights.map((light) => (
                <div
                    key={light.id}
                    style={{
                        position: 'absolute',
                        top: light.y - 5, 
                        left: light.x - 5,
                        width: '15px', 
                        height: '15px',
                        background: 'linear-gradient(90deg, #FFD0D0 20%,  #FFB1D9 60%,  #DDF3FF 100%)', 
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // 五角星形状
                        boxShadow: '0 0 5px rgba(255, 215, 0, 0.8), 0 0 10px rgba(255, 140, 0, 0.6)', 
                        animation: 'lightMove 0.8s forwards', 
                        zIndex: 0,
                    }}
                />
            ))}
        </>
    );
}


