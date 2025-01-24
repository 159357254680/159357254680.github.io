import { useState, useEffect } from "react";
import "./carGamePage.css";

export default function CarGamePage() {
  const [isPaused, setIsPaused] = useState(false);
  const [targetText, setTargetText] = useState("asdfghjklqwertyuiopzxcvbnmasdfghjklqwertyuiopzxcvbnm");
  const [userInput, setUserInput] = useState("");
  const [energy, setEnergy] = useState(0); 
  const [backgroundOffset, setBackgroundOffset] = useState(0); 

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= targetText.length) {
      const isCorrect = value === targetText.substring(0, value.length);
      if (isCorrect) {
        setUserInput(value);

        
        const moveStep = 100 / targetText.length;
        setBackgroundOffset((prev) => Math.min(prev + moveStep, 100));

        
        const energyStep = 100 / targetText.length;
        setEnergy((prev) => Math.min(prev + energyStep, 100));
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsPaused((prev) => !prev); 
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      setIsPaused(true); 
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getColoredText = () => {
    return targetText.split("").map((char, index) => {
      if (index < userInput.length) {
        const isCorrect = char === userInput[index];
        return (
          <span
            key={index}
            style={{
              color: isCorrect ? "blue" : "red",
            }}
          >
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  return (
    <div className="game-container">
      <div
        className="background"
        style={{
          transform: `translateX(-${backgroundOffset}%)`,
          transition: isPaused ? "none" : "transform 0.3s linear",
        }}
      >
        <img src="/海边公路1.png" alt="Background 1" />
        <img src="/海边公路2.png" alt="Background 2" />
        <img src="/海边公路3.png" alt="Background 3" />
        <img src="/村庄公路1.png" alt="Background 3" />
        <img src="/村庄公路2.png" alt="Background 3" />
        <img src="/村庄公路3.png" alt="Background 3" />
        <img src="/山地公路1.png" alt="Background 3" />
        <img src="/山地公路2.png" alt="Background 3" />
        <img src="/山地公路3.png" alt="Background 3" />
        <img src="/麦田公路1.png" alt="Background 3" />
        <img src="/麦田公路2.png" alt="Background 3" />
        <img src="/麦田公路3.png" alt="Background 3" />
        <img src="/森林公路1.png" alt="Background 3" />
        <img src="/森林公路2.png" alt="Background 3" />
        <img src="/森林公路3.png" alt="Background 3" />
      </div>

      <div className="car">
        <img src="/车.png" alt="Car" />
      </div>

      
      <div className="energy-bar">
        <div
          className="energy-fill"
          style={{
            width: `${energy}%`, 
          }}
        ></div>
      </div>

      
      <div className="typing-area">
        <div className="text-display">{getColoredText()}</div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="typing-input"
          placeholder="Start typing..."
          disabled={userInput === targetText} 
        />
      </div>
    </div>
  );
}
