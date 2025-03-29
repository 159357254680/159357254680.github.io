import { useState, useEffect } from "react"
import CountUp from './countUp'
import MusicReturn from './musicReturn'

export default function MusicSettlementPage() {
    const userName = localStorage.getItem('userName')
    const [curtainOpened, setCurtainOpened] = useState(false)
    const {score,maxCombo,prefect,good,miss} = JSON.parse(localStorage.getItem("gameData")) 
    const avatar = localStorage.getItem('avatar')

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setCurtainOpened(true)
        }, 1000)
    },[])

    return (
        <>
            <style>
                {`
                @keyframes curtainOpen {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                @keyframes curtainOpenRight {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                `}
            </style>

            <img
                src="/音游结算画面.png"
                alt="音游结算"
                style={styles.backgroundImage}
            />
            
            <img 
                src={avatar}
                alt="avatar"
                style={styles.avatar}
            />

            <div style={styles.information}>名称：{userName}</div>

            <div className="total-score" style={{...styles.scoreContainer,top: '22vh',left: '8vw',}}>
                <p style={styles.scoreLabel}>最长连击:</p>
                <CountUp 
                    from={0}
                    to={maxCombo}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    marginLeft='12vw'
                />
            </div>
           
            <div className="total-score" style={{...styles.scoreContainer,top: '35vh',left: '8vw',}}>
                <p style={styles.scoreLabel}>总 分：</p>
                <CountUp 
                    from={0}
                    to={score}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    marginLeft='10vw'
                />
            </div>

            <div className="total-score" style={{...styles.scoreContainer,top: '55vh',left: '8vw',}}>
                <p style={styles.scoreLabel}>prefect:</p>
                <CountUp 
                    from={0}
                    to={prefect}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    marginLeft='14vw'
                />
            </div>
    
            <div className="total-score" style={{...styles.scoreContainer,top: '55vh',left: '40vw',}}>
                <p style={styles.scoreLabel}>good:</p>
                <CountUp 
                    from={0}
                    to={good}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    marginLeft='10vw'
                />
            </div>
           
            <div className="total-score" style={{...styles.scoreContainer,top: '55vh',left: '70vw',}}>
                <p style={styles.scoreLabel}>miss:</p>
                <CountUp 
                    from={0}
                    to={miss}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    marginLeft='8vw'
                />
            </div>
          
            <MusicReturn path={"/MusicMainPage"}/>

            <div
                style={{
                    ...styles.curtain,
                    left: '0',
                    animation: curtainOpened ? 'curtainOpen 1s ease-out forwards' : ''
                }}
            />

            <div
                style={{
                    ...styles.curtain,
                    right: '0',
                    animation: curtainOpened ? 'curtainOpenRight 1s ease-out forwards' : ''
                }}
            />
        </>
    )
}

const styles = {
    backgroundImage: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
    },
    avatar: {
        position: 'absolute',
        left: '10vw',
        top: '7vh',
        width: '5.5vw',
        height: '5.5vw',
        maxWidth: '80px',
        maxHeight: '80px',
        minWidth: '40px',
        minHeight: '40px',
        borderRadius: '50%',
    },
    information: {
        position: 'absolute',
        top: '7.5vh',
        left: '18vw',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(1rem, 2rem, 1.5rem)',
        color: 'white',
        width: 'min(40vw, 18rem)',
        height: 'min(10vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)', 
        borderRadius: '20px',
        padding: '0 2rem',
        backdropFilter: 'blur(6px)', 
        borderImageSlice: 1,
        transition: 'all 0.3s ease',


        boxShadow: `0 0 8px #FB68B3`,  
        borderImage: `linear-gradient(145deg, 
                        rgba(255,255,255,0.3),   
                        #FB68B3 80, 
                          transparent) 1`,
    },
    scoreContainer: {
        position: 'absolute',
    },
    scoreLabel: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)',
        color: 'white',
        margin: '0.5vh 0',
    },
    curtain: {
        position: 'fixed',
        top: '0',
        width: '50%',
        height: '100%',
        background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)',
        border: 'clamp(4px, 1vw, 8px) solid #ff99b5',
        boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
        zIndex: '2',
        transform: 'translateX(0)',
    }
}