import { useState, useEffect, useRef } from 'react';

export default function Fog() {
    const [smokes, setSmokes] = useState([]); 
    const lastSmokeTime = useRef(0); 

    const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastSmokeTime.current < 80) return; 
        lastSmokeTime.current = now;

        const newSmokes = Array.from({ length: Math.floor(Math.random() * 2) + 2 }, () => ({
           
            id: Date.now() + Math.random(), 
            x: e.clientX + (Math.random() * 20 - 10), 
            y: e.clientY + (Math.random() * 10 - 5), 
        }));

        setSmokes((prevSmokes) => [...prevSmokes, ...newSmokes]);

        
        setTimeout(() => {
            setSmokes((prevSmokes) =>
                prevSmokes.filter((smoke) => !newSmokes.some((s) => s.id === smoke.id))
            );
        }, 1500);
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
                    @keyframes smokeMove {
                        0% {
                            opacity: 0.7;
                            transform: scale(1) translateY(0);
                        }
                        100% {
                            opacity: 0; 
                            transform: scale(2.5) translateY(-30px); 
                        }
                    }
                `}
            </style>

           
            {smokes.map((smoke) => (
                <div
                    key={smoke.id}
                    style={{
                        position: 'absolute',
                        top: smoke.y - 10,
                        left: smoke.x - 10,
                        width: `${Math.random() * 20 + 10}px`, 
                        height: `${Math.random() * 20 + 10}px`,
                        background: `radial-gradient(circle, rgba(255,255,255,0.7) 20%, rgba(200,200,200,0.3) 80%)`, // **增加白色比例**
                        borderRadius: '50%',
                        filter: 'blur(6px)', 
                        animation: 'smokeMove 1.5s forwards', 
                        zIndex: 0,
                    }}
                />
            ))}
        </>
    );
}

