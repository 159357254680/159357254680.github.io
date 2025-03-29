import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWebSocket } from '../hooks/WebSocketContext'



export default function CarettlementPageTwo() {
    const userName = localStorage.getItem('userName')
    const userId = localStorage.getItem('userId')
    const role = localStorage.getItem('role')
    const score = localStorage.getItem('MultiplayScore')
    const navigate = useNavigate()
    const { socket } = useWebSocket()

    const userInfo = {
        userName: userName,
        userId: userId,
        role: role,
        score:score,
    }

    const [opponentInfo, setOpponentInfo] = useState({
        userName: '',
        userId: '',
        role: '',
        score:'',
    })

    useEffect(() => {
        document.body.style.margin = "0"
        document.body.style.padding = "0"
        document.body.style.overflow = "hidden"
        

        return () => {
            document.body.style = "" 
        }
    }, []) 

    useEffect(() => {
        
        socket.onopen = () => {
            console.log("WebSocket连接成功")
        }

        socket.onmessage = (e) =>{
            const res = JSON.parse(e.data)
            const data = JSON.parse(res)
            console.log(data)
            if (data.type === 'playerInfo') {
                setOpponentInfo(data.data)
            }
            
        }

        socket.onerror = (e) =>{
            console.log("WebSocket连接错误", e)
        }

        socket.onclose = (e) =>{
            console.log("WebSocket连接关闭", e)
        }

        return () => {
            socket.close()
        }
    })

    useEffect(() => {

        if (!socket) return
        const handlePost = () => {
          socket.send(JSON.stringify({
            type: 'playerInfo',
            data: {
                userName: userName,
                userId: userId,
                role: role,
                score: score,
            }
          }))
        }
      
        if (socket.readyState === WebSocket.OPEN) {
          handlePost()
        } else {
          socket.addEventListener('open', handlePost)
        }
      
        return () => {
          socket.removeEventListener('open', handlePost)
        }
      }, [socket])

      function Information({user}){
        const { userName,userId,role, score} = user

        return(
            <div style={styles.userContainer}>
                <div style={styles.userInfoContainer}>
                    <div style={styles.infoRow}>
                        <label>用户名：</label>
                        <span>{userName || '连接失败...'}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <label>id:</label>
                        <span>{userId || '连接失败...'}</span>
                    </div>
                </div>

                <div style={styles.gameInfo}>
                    <label>player:</label>
                    <span>{role||'连接失败...'}</span>
                </div>
                <div style={styles.gameInfo}>
                    <label>总分:</label>
                    <span>{score||'连接失败...'}</span>
                </div>
        </div>
        )
      }


    return (
        <div style={styles.background}>
            <img 
                src="/赛车双人模式结算.png"
                style={styles.backgroundImage}
            />
           
            <div style={styles.contentWrapper}>
                <Information user={userInfo} isOpponent={false}/>
                <Information user={opponentInfo} isOpponent={true}/>
            </div>

            <button 
                style={styles.exitBtn}
                onClick={() => {
                    if (socket?.readyState === WebSocket.OPEN) {
                      socket.close(1000, 'User manually exited'); 
                    }
                    navigate("/CarMainPage");
                }}/>
        </div>
    )
}

const styles = {
    container :{
        width: '100%',
        height: '100vh', 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    backgroundImage:{
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100vh',
        objectFit:'fill',
    },
    contentWrapper: {
        position: 'absolute',
        top: '-2rem',
        left: '0',
        gap:'22rem',
        display: 'flex',
        alignItems: 'center',
        width:'80%',
        height: '50%',
        padding: '0 10%',
    },
    userContainer: {
        width: '22%',
        height:'4%',
        padding: '2rem',
    },
    infoRow: {
        whiteSpace: 'nowrap',
        fontSize: '1.2rem',
        color: 'rgb(5, 159, 255)',
        fontFamily: 'YouSheBiaoTiHei',
    },
    gameInfo:{
        paddingTop:'2rem',
        fontSize: '2.4rem',
        color: 'white',
        fontFamily: 'YouSheBiaoTiHei',
    },
    exitBtn:{
        width: '14rem',
        height: '4.3rem',
        position: 'absolute',
        bottom:'2.6rem',
        right: '40.8%',
        backgroundColor:'transparent',
        borderRadius:'18px',
        border: 'none',
        outline:'none',
        cursor:'pointer',
    },
    userInfoContainer:{
        width: 'min(40vw, 18rem)',
        height: 'min(10vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'rgba(223, 218, 218, 0.4)', 
        borderRadius: '20px',
        padding: '0 2rem',
        backdropFilter: 'blur(6px)', 
        borderImage: `linear-gradient(145deg, 
                      rgba(255,255,255,0.3),  
                      transparent) 1`,
        borderImageSlice: 1,
    }
}