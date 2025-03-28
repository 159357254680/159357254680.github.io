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
                src = {avatar}
                alt="avatar"
                style={{
                    position: 'absolute',
                    left: '8.5rem',
                    top: '4rem',
                    width:'5.5rem',
                    height:'4rem',
                    borderRadius: '50%',
                }}
            />

            <div style={styles.information}>名称：{userName}</div>

            <CountUp 
                from={0}
                to={maxCombo}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
                left='25rem'
                top='11rem'
            />

            <div className="total-score" style={{position:'absolute' ,top:'13rem',left:'8rem'}}>
                <p style={{fontFamily: 'YouSheBiaoTiHei',fontSize:'2.5rem',color:'white'}}>总 分：</p>
                <CountUp 
                     from={0}
                     to={score}
                     separator=","
                     direction="up"
                     duration={1}
                     className="count-up-text"
                     top='2.3rem'
                     left='10rem'
                />
            </div>

            <CountUp
              from={0}
              to={prefect}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              left='20rem'
            />

            <CountUp
              from={0}
              to={good}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              left='40rem'
            />

            <CountUp
              from={0}
              to={miss}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              left='63rem'
            />

            <MusicReturn path={"/MusicMainPage"}/>

            <div
                    style={{
                        position: 'fixed',
                        left: '0',
                        top: '0',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)' ,
                        border: '8px solid #ff99b5',
                        boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
                        zIndex: '2',
                        transform: 'translateX(0)',
                        animation:curtainOpened ? 'curtainOpen 1s ease-out forwards' : ''
                    }}
                />

                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)' ,
                        border: '8px solid #ff99b5',
                        boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
                        zIndex: '2',
                        transform: 'translateX(0)',
                        animation:curtainOpened ? 'curtainOpenRight 1s ease-out forwards' : ''
                    }}
                />
        </>
    )
}

const styles = {
    backgroundImage: {
        width: '100%',
        height: '40.5rem',
    },
    information:{
        position:'absolute',
        top:'4.5rem',
        left:'18.5rem',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize:'1.5rem',
        color:'white',
    }
}