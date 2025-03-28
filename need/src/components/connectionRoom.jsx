import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useWebSocket } from "../hooks/WebSocketContext"

export default function ConnectionRoom() {
    const navigate = useNavigate()
    const location = useLocation()
    const { joinRoomId,isCreateRoom } = location.state || {}
    const storedToken = localStorage.getItem("token")
    const { connect } = useWebSocket()

    const [roomId, setRoomId] = useState("")
    const [players, setPlayers] = useState(1)
    const [countdown, setCountdown] = useState(3)
    const [showCountdown, setShowCountdown] = useState(false)

    useEffect(() => {   
            document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const url = new URL(`ws://123.56.118.201:8080/ws?${joinRoomId ? `room_id=${joinRoomId}` : ``}&token=${storedToken}`)

        const socket = connect(url.toString())

        socket.onopen = () => {
            console.log("WebSocket连接成功")
        }

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            const { roomid,userid } = data

            if(roomid){
                setRoomId(roomid)
            }

            if(userid){
                localStorage.setItem("userId",userid)
            }
            
            if(data.code === 30001){
                setPlayers(2)
                setShowCountdown(true)
            }
        }
        socket.onerror = (e) => {
            console.log("WebSocket连接错误:", e)
            setTimeout(() => {
                console.log(`尝试重新连接`)
                connect(url) 
              }, 3000)
        }

    }, [isCreateRoom, joinRoomId])

    
    useEffect(() => {
        let timer
      
        if (showCountdown) {
          timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        }
      
        return () => {
          if (timer) {
            clearInterval(timer)
          }
        }
      }, [showCountdown]) 

    useEffect(() => {
        if (countdown === 0) {
            navigate("/CarMultiplayPage")
        }
    },[countdown])

    

    return (
        <div style={styles.container}>
        <style>
            {`
            @keyframes spin {
                to { transform: rotate(360deg) }
            }
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(0.8) opacity: 0.8 }
                100% { transform: translate(-50%, -50%) scale(2) opacity: 0 }
            }
            @keyframes pop {
                0% { transform: scale(0) }
                90% { transform: scale(1.2) }
                100% { transform: scale(1) }
            }
            `}
        </style>

        <div style={styles.roomInfo}>
            <h2>房间号：{roomId}</h2>
            <div style={styles.statusBadge}>
            {isCreateRoom ? "房主" : "玩家"}
            </div>
        </div>

        {players < 2 && (
            <div style={styles.waitingScreen}>
            <div style={styles.loadingAnimation}>
                <div style={styles.spinner}></div>
                <div style={styles.pulse}></div>
            </div>
            <h1 style={{ fontSize: "2em", marginBottom: "20px" }}>等待玩家加入...</h1>
            <div style={{ fontSize: "1.2em" }}>
                <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{players}</span>/2 玩家已准备
            </div>
            </div>
        )}

        {showCountdown && (
            <div style={styles.countdownOverlay}>
            <div style={styles.countdownNumber}>{countdown}</div>
            <div style={{ fontSize: "1.5em" }}>游戏即将开始</div>
            </div>
        )}
        </div>
    )
    }

    const styles = {
        container: {
            position: "relative",
            height: "100vh",
            background: "rgb(174, 216, 253)",
            overflow: "hidden",
        },
        roomInfo: {
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "15px 25px",
            borderRadius: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        statusBadge: {
            background: " #ff6b6b",
            color: "white",
            padding: "5px 10px",
            borderRadius: "8px",
            fontSize: "0.8em",
        },
        waitingScreen: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
        },
        loadingAnimation: {
            position: "relative",
            margin: "0 auto 30px",
            width: "120px",
            height: "120px",
        },
        spinner: {
            width: "100%",
            height: "100%",
            border: "8px solid rgb(242, 241, 241)",
            borderTopColor: " #ff6b6b",
            borderRadius: "50%",
            animation: "spin 0.8s ease-in-out infinite",
        },
        pulse: {
            position: "absolute",
            top: "55%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            width: "80px",
            height: "80px",
            background: "rgba(11, 127, 228, 0.2)",
            borderRadius: "50%",
            animation: "pulse 1.5s ease-out infinite",
        },
        countdownOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        },
        countdownNumber: {
            fontSize: "8em",
            fontWeight: "bold",
            animation: "pop 0.5s ease-out",
        },
    }