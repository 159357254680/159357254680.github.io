import { useState, useEffect } from 'react';

const SakuraRain = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      createPetal();
    }, 100);

    for (let i = 0; i < 30; i++) {
      setTimeout(createPetal, Math.random() * 2000);
    }

    return () => clearInterval(intervalId);
  }, []);

  const createPetal = () => {
    const left = Math.random() * 100;           
    const duration = 2 + Math.random() * 3;       
    const delay = 0;                           
    const scale = 0.5 + Math.random();          
    const id = Date.now() + Math.random();
    const petal = { id, left, duration, delay, scale };
    setPetals(prev => [...prev, petal]);

    
    setTimeout(() => {
      setPetals(prev => prev.filter(p => p.id !== id));
    }, (duration + delay) * 1000);
  };

  return (
    <div className="sakura-container">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}vw`,
            animation: `fall ${petal.duration}s linear ${petal.delay}s forwards`,
            transform: `scale(${petal.scale})`,
          }}
        ></div>
      ))}
      <style>{`

        .sakura-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
       
        .sakura-petal {
          position: fixed;
          top: 0;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle at 50% 50%, #FFC0CB, #FFB6C1);
          border-radius: 60% 40% 50% 70% / 60% 70% 40% 50%;
          opacity: 0.9;
        }
      
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(3vw) rotate(90deg);
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) translateX(-3vw) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(75vh) translateX(3vw) rotate(270deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SakuraRain;
