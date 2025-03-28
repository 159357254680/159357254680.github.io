import { useState, useEffect, useRef } from "react"
import { useTargetContext } from "../hooks/TargetContext"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./carGamePage.css"

export default function CarGamePage() {
  const [userInput, setUserInput] = useState("")
  const [backgroundOffset, setBackgroundOffset] = useState(0)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [pausedOverlayVisible, setPausedOverlayVisible] = useState(false)
  const [carPosition, setCarPosition] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [visibleCharCount, setVisibleCharCount] = useState(27)
  const [showCurtain, setShowCurtain] = useState(false)
  const [totalCorrect,setTotalCorrect] = useState(0)
  const [timeWaste,setTimeWaste] = useState(0) 
  const [wheelRotation,setWheelRotation] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)

  const storedToken = localStorage.getItem("token")
  const carBackgroundVolume = localStorage.getItem("carBackgroundVolume")
  const processedLengthRef = useRef(0)
  const audioRef = useRef(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null) 
  const navigate = useNavigate()

  const { targetContext } = useTargetContext()

  useEffect(() => {
    const audio = new Audio('https://m10.music.126.net/20250321202950/3784c36a7db6dfc61a5fbbc26fcfc43d/ymusic/e2c5/2d86/5fa8/628000408cb241ca7ed2e6cec59451a3.mp3?vuutv=XWNmLpCtu8v7WcQ1jlPiQE70EDO6t3YHemORSKzpAUAJm9X1rLr01Jr/V/1EJnJkVMscWjQ2fE70Nwt6MJL9d+dZyVSVj9FUD/dOtt6sc9U=')
    audio.loop = true
    audioRef.current = audio
    audioRef.current.volume = carBackgroundVolume / 100
  
   
    const handlePause = () => {
      if (document.hidden) {
        setAudioCurrentTime(audioRef.current.currentTime)
        audioRef.current.pause() 
      } else {
        audioRef.current.currentTime = audioCurrentTime
        audioRef.current.play() 
      }
    }
    
    if (isPlaying) {
      audioRef.current.currentTime = audioCurrentTime
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  
  
    document.addEventListener('visibilitychange', handlePause)
  
   
    return () => {
      if (audioRef.current) {
        audioRef.current.pause() 
        audioRef.current.src = '' 
      }
      document.removeEventListener('visibilitychange', handlePause)
    }

  },[isPlaying])


      async function postScore(score) {
        try {
          const res = await axios.post(
            'http://123.56.118.201:8080/api/score', 
            {total_score: score},
            {
              headers:{
                  'Content-Type': 'application/json',
                  ...(storedToken ? { Authorization: `${storedToken}` } : {})
            }}
          )
          const {message} = res.data
          if (message === "upload total score successfully") {
            console.log('分数已成功提交',message)
          } else {
            console.error('提交分数失败', message )
          }
        } catch (error) {
          console.error('提交分数时发生错误', error)
        }
      }
  

  useEffect(() => {

    timerRef.current = setInterval(() => {
      setTimeWaste(prevTime => prevTime + 1) 
    }, 1000) 

    return () => {
      clearInterval(timerRef.current) 
    }
  }, [])


  const getColoredText = () => {
    return (
      <div
        style={{
          transform: `translateX(-${scrollOffset}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {targetContext.split("").map((char, index) => {
          const isCorrect = char === userInput[index]
          return (
            <span
              key={index}
              style={{
                color: index < userInput.length ? (isCorrect ? "blue" : "red") : "black",
              }}
            >
              {char}
            </span>
          )
        })}
      </div>
    )
  }

  const handleCompositionStart  = (e) => {
    setUserInput(e.target.value)
  }

  const handleCompositionEnd = (e) => {
    setUserInput(e.target.value)
    handleInputChange(e)
  }

  const handleInputChange = (e) => {
    if (isGameOver) return
    const value = e.target.value
    const isBackspace = e.nativeEvent.inputType === "deleteContentBackward"
    
    if (isBackspace) {
      e.preventDefault()
      return
    }

    

    if (e.nativeEvent.isComposing) {
      return
    }

    setUserInput(value)

    const newInput = Array.from(value).slice(processedLengthRef.current)

    processedLengthRef.current = value.length

    const startIndex = value.length - newInput.length
    const correctCount = newInput.filter((char, index) => char === targetContext[startIndex + index]).length

    setTotalCorrect((prev) => prev + correctCount)

    const effectiveInputLength = newInput.length
    const accuracy = effectiveInputLength > 0 ? Math.min(correctCount / effectiveInputLength, 1) : 0

    if(accuracy > 0) { 

      const moveStep = (100 / targetContext.length) * accuracy * effectiveInputLength
      setBackgroundOffset((prev) => Math.min(prev + moveStep, 100))
  
      const scoreStep = Math.floor(10 * accuracy * effectiveInputLength)
      setScore((prev) => prev + scoreStep)

      setWheelRotation(prev => prev + 180)
      
    }else {
        setUserInput(value)
    }

    if (value.length >= targetContext.length) {
      e.target.disabled = true
      setIsGameOver(true)
      setWheelRotation(prev => prev + 360)
      setCarPosition(80)
      setShowCurtain(true)
      postScore(score)
      localStorage.setItem('time',timeWaste)
      setTimeout(() => {
        navigate("/CarSettlementPage")
      }, 1000)
    }
  }

  useEffect(() => {
    localStorage.setItem('correctCount',JSON.stringify(totalCorrect))
  },[totalCorrect])

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setPausedOverlayVisible(true)
      setIsPlaying(false)

      if (audioRef.current) {
        setAudioCurrentTime(audioRef.current.currentTime)
      }
    }
  }


  const resumeGame = () => {
    setPausedOverlayVisible(false)
    setIsPlaying(true)

    if (audioRef.current) {
      audioRef.current.currentTime = audioCurrentTime 
      audioRef.current.play()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
   
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = `${scrollOffset}px`
    }
  }, [scrollOffset])

  useEffect(() => {
    if (userInput.length > visibleCharCount) {
      setVisibleCharCount((prev) => prev + 28)
      setScrollOffset((prev) => prev + 810)
    }
  }, [userInput])

  return (
    <>
      <style>
        {`
          @keyframes curtainMove {
            0% {
              transform: translateX(-100%)
            }
            100% {
              transform: translateX(0%)
            }
          }
        `}
      </style>

      <div className="game-container">

        {showCurtain && (
          <div
            style={{
              position: "absolute",
              width: "79rem",
              height: "41rem",
              backgroundColor: "#B3E3FF",
              borderRadius: "15px",
              transform: "translateX(-100%)",
              animation: "curtainMove 1s linear forwards",
              zIndex: "3",
            }}
          />
        )}

        <div className="score-display">Score: {score}</div>

        <div
          className="background"
          style={{
             transform: `translateX(-${backgroundOffset}%)`,
             transition: `transform 1s linear`
          }}
        >

            <img src="/海边公路1.png" alt="Background 1" />
            <img src="/海边公路2.png" alt="Background 2" />
            <img src="/海边公路3.png" alt="Background 3" />
            <img src="/隧道.png" alt="隧道" />
            <img src="/村庄公路1.png" alt="Background 1" />
            <img src="/村庄公路2.png" alt="Background 2" />
            <img src="/村庄公路3.png" alt="Background 3" />
            <img src="/隧道.png" alt="隧道" />
            <img src="/山地公路1.png" alt="Background 1" />
            <img src="/山地公路2.png" alt="Background 2" />
            <img src="/山地公路3.png" alt="Background 3" />
            <img src="/隧道.png" alt="隧道" />
            <img src="/麦田公路1.png" alt="Background 1" />
            <img src="/麦田公路2.png" alt="Background 2" />
            <img src="/麦田公路3.png" alt="Background 3" />
            <img src="/隧道.png" alt="隧道" />
            <img src="/森林公路1.png" alt="Background 1" />
            <img src="/森林公路2.png" alt="Background 2" />
            <img src="/森林公路3.png" alt="Background 3" />

        </div>

        <div
            className="car"
            style={{
              transform: `translateX(${carPosition}px)`,
              transition: `transform 0.5s linear`
            }}
        >
            <img src="车轮.png" alt="Wheel" className="wheel-before" style={{transform: `rotate(${wheelRotation}deg)`, transition:`transform 1s linear`}} />
            <img src="/车.png" alt="Car" className="car-body"/>
            <img src="车轮.png" alt="Wheel" className="wheel-after" style={{transform: `rotate(${wheelRotation}deg)`, transition:`transform 1s linear`}}/>
        </div>


        <div className="typing-area">
          <div className="text-display">{getColoredText()}</div>

          <input
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            className="typing-input"
            placeholder="Start typing..."
            disabled={isGameOver}
          />
        </div>

        {pausedOverlayVisible && (
          <div className="paused-overlay">
            <div className="paused-message">游戏已暂停</div>
            <div className="paused-buttons">
              <button onClick={resumeGame} className="paused-btn">
                继续游戏
              </button>
              <button onClick={() => navigate("/CarMainPage")} className="paused-btn">
                退出游戏
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
