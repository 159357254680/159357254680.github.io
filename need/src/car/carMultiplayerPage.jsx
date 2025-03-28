import { useState, useEffect, useRef} from "react"
import {useNavigate } from "react-router-dom"
import { useWebSocket } from "../hooks/WebSocketContext"
import { useTargetContext } from '../hooks/TargetContext'
import axios from 'axios'
import "./carMultiplayPage.css"

export default function CarMultiplayPage() {
  const { socket,status } = useWebSocket()
  const role = localStorage.getItem("role")


  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [carPosition, setCarPosition] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [visibleCharCount, setVisibleCharCount] = useState(30)
  const [showCurtain,setShowCurtain] = useState(false)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [backgroundOffset, setBackgroundOffset] = useState(0)
  const [count,setCount] = useState(0)

  const [opponentGameState, setOpponentGameState] = useState({
    userInput: "",
    backgroundOffset: 0,
    score: 0,
    carPosition: 0,
    scrollOffset: 0,
    showCurtain: false,
    wheelRotation: 0
  })

  const myGameState = {
    userInput,
    backgroundOffset,
    carPosition,
    wheelRotation,
    score,
    scrollOffset,
    showCurtain,
  }

  const storedToken = localStorage.getItem("token")
  const processedLengthRef = useRef(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const { targetContext } = useTargetContext()

  useEffect(() => {
    if (status !== "connected") {
      console.log("连接已断开，尝试重新连接...")
      console.log(socket)
      
    }
  }, [status])
  

  useEffect(() => {
    if(myGameState.showCurtain === true && count === 1){
      const timer = setTimeout(() => {
        navigate("/CarSettlementPageTwo")
      }, 2000) 

      return () => {
        clearTimeout(timer)
      }
    }
  },[myGameState.showCurtain,opponentGameState.showCurtain])


  useEffect(() => {
    
    if (inputRef.current && !showCurtain) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [userInput, showCurtain]);

  useEffect(() => {
    document.body.classList.add("body")

    return () => {
      document.body.classList.remove("body")
    }
  }, []) 


  async function postScore(score) {
    try {
      const res = await axios.post(
        'http://123.56.118.201:8080/api/score', 
        { total_score: score },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(storedToken ? { Authorization: ` ${storedToken}` } : {})
          }
        }
      )
      const { message } = res.data
      if (message) {
        localStorage.setItem("MultiplayScore", score)
        console.log('分数已成功提交')
      } else {
        console.error('提交分数失败', res)
      }
    } catch (error) {
      console.error('提交分数时发生错误', error)
    }
  }

  useEffect(() => {

    if(socket){
      const getMessage = (e) => {
        const res = JSON.parse(e.data)
        const data = JSON.parse(res)
        console.log(res)
        
        if(data.type !== role&&count === 0){
          setOpponentGameState(data.data)
          if(data.data.showCurtain === true){
            setCount(prev => prev + 1)
          }
        }
      }
    
      socket.addEventListener('message', getMessage)

        return () => {
          socket.removeEventListener('message', getMessage)
        }
    }
  
  }, [])

  useEffect(() => {
    if (socket?.readyState === WebSocket.OPEN) { 
      socket.send(JSON.stringify({
        type: role,
        data: myGameState,
      }))
    }
   
  }, [userInput,showCurtain])

  const getColoredText = (currentInput, currentScrollOffset) => {
    return (
      <div
        style={{
          display: "flex",
          transform: `translateX(-${currentScrollOffset}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {targetContext.split("").map((char, index) => {
          const isCorrect = char === currentInput[index]
          return (
            <span
              key={index}
              style={{
                color: index < currentInput.length ? (isCorrect ? "blue" : "red") : "black",
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
    if (showCurtain) return
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
    if (accuracy > 0) { 
      
      const moveStep = (100 / targetContext.length) * accuracy * effectiveInputLength
      setBackgroundOffset((prev) => Math.min(prev + moveStep, 100))
      
      const scoreStep = Math.floor(10 * accuracy * effectiveInputLength)
      setScore((prev) => prev + scoreStep)
     
      setWheelRotation(prev => prev + 180)
    } else {
      setUserInput(value)
    }
   
    if (value.length >= targetContext.length) {
      e.target.disabled = true
      setShowCurtain(true)
      setWheelRotation(prev => prev + 360)
      setCarPosition(80)
      postScore(score)
    }
  }

  
  useEffect(() => {
    localStorage.setItem('correctCount', JSON.stringify(totalCorrect))
  }, [totalCorrect])

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

  function GameSection({ gameState, active,isCurrentPlayer,count }) {
    const {
      userInput: inputVal,
      backgroundOffset: bgOffset,
      carPosition: carPos,
      wheelRotation: wheelRot,
      score: currentScore,
      scrollOffset: sOffset,
      showCurtain: curtain,
    } = gameState

    return (
      <div className="game-container2">
        {count ===  1 && (
          <div
            style={{
              position: "absolute",
              width: "79rem",
              height: "41rem",
              backgroundColor: "#B3E3FF",
              transform: "translateX(0)",
              zIndex: "4",
            }}
          />
        )}

        {curtain && (
          <div
            style={{
              position: "absolute",
              width: "79rem",
              height: "41rem",
              backgroundColor: "#B3E3FF",
              transform: "translateX(-100%)",
              animation: "curtainMove 1s linear forwards",
              zIndex: "3",
            }}
          />
        )}

       
        <div className="score-display2">Score: {currentScore}</div>

        <div
          className="background2"
          style={{
             transform: `translateX(-${bgOffset}%)`,
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
            className="car2"
            style={{
              transform: `translateX(${carPos}px)`,
              transition: `transform 0.5s linear`
            }}
        >
            <img src="车轮.png" alt="Wheel" className="wheel-before2" style={{transform: `rotate(${wheelRot}deg)`, transition:`transform 1s linear`}} />
            <img src="/车.png" alt="Car" className="car-body2"/>
            <img src="车轮.png" alt="Wheel" className="wheel-after2" style={{transform: `rotate(${wheelRot}deg)`, transition:`transform 1s linear`}}/>
        </div>


        {isCurrentPlayer && (
        <div className="typing-area2">
          <div className="text-display2">{getColoredText(inputVal, sOffset)}</div>
          <input
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
            ref={active ? inputRef : null}
            type="text"
            value={inputVal}
            onChange={active ? handleInputChange : undefined}
            onCompositionStart={active ? handleCompositionStart : undefined}
            onCompositionEnd={active ? handleCompositionEnd : undefined}
            className="typing-input2"
            placeholder="Start typing..."
            disabled={!active || showCurtain}
          />
        </div>
      )}
      </div>
    )
  }

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
      <div className="dual-game-container2">
        <div className="player-section2" id="top-section">
          <div className="section-label2">Player 1</div>
          { role === "player1" ? (
              <GameSection gameState={myGameState} active={true} isCurrentPlayer={true} count={0}/>
            ) : (
             
              <GameSection gameState={opponentGameState} active={false} isCurrentPlayer={false} count={count}/>
            )
          }
        </div>
       
        <div className="player-section2" id="bottom-section">
          <div className="section-label2">Player 2</div>
          { role === "player2" ? (
              <GameSection gameState={myGameState} active={true} isCurrentPlayer={true} count={0}/>
            ) : (
              <GameSection gameState={opponentGameState} active={false} isCurrentPlayer={false} count={count}/>
            )
          }
        </div>

      </div>
    </>
  )
}
