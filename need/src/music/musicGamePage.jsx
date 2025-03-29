import { useState, useEffect, useRef,useReducer } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import SakuraAnimation from "../animations/sakura"
import axios from 'axios'
import TimeOut from './timeOut'



export default function MusicGamePage() {
    const userName = localStorage.getItem('userName')
    const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '未知'
    const storedToken = localStorage.getItem('token')
    const musicBackgroundVolume = localStorage.getItem('musicBackgroundVolume')

    const [gameState,dispatch] = useReducer(reducer,{state:'GameStart'})
    const [song, setSong] = useState(null)
    const [notes, setNotes] = useState([])
    const [score, setScore] = useState(0)
    const [energy, setEnergy] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [prefect,setPrefect] = useState(0)
    const [good,setGood] = useState(0)
    const [miss,setMiss] = useState(0)
    const [combo, setCombo] = useState(0)
    const [maxCombo,setMaxCombo] = useState(0)
    const [isEnergyLocked, setIsEnergyLocked] = useState(false)
    const [outerCircleEffect, setOuterCircleEffect] = useState(false)
    const [showTimeOut, setShowTimeOut] = useState(false)  
    const [isFalling,setIsFalling] = useState(false)


    const navigate = useNavigate()
    const location = useLocation()
    const {difficulty,mode,songId} = location.state

    const feedbackTimeoutRef = useRef(null)
    const gameIntervalRef = useRef(null)  
    const audioRef = useRef(null) 
    const decreaseEnergyRef = useRef(null)
    const bpm = 120
    const beatInterval = 60 / bpm 

    const avatar = localStorage.getItem('avatar')

    const CIRCLE_CENTER = 20
    const CIRCLE_RADIUS = 10

    function reducer(state,action){
        switch(action.type){
            case 'GameStart':
                return {state:'GameStart'}
            case 'Gaming':
                return {state:'Gaming'}
            case 'GameEnd':
                return  {state:'GameEnd'}
            default:
                throw new Error('Unknown action type')
        }
    }

    useEffect(() => {
        async function getSong(id){
            try{
                const res = await axios.get(
                    'http://123.56.118.201:8080/api/song',
                    {
                        params:{song_id:id},
                        headers:{
                            Authorization: ` ${storedToken}`
                        }
                    }
                )
                const {message} =res.data
                if(message === 'Fetch song successfully'){
                    const song = res.data.data.song_id
                    setSong(song)
                }
            } catch(err){
                console.log(err)
            }
        }

        getSong(songId)
    },[])

    useEffect(() => {
        if (gameState.state === 'GameEnd') {
          postMusicData(score)
        }
      }, [gameState.state]) 

    async function postMusicData(score){
        try{
            const res = await axios.post(
                'http://123.56.118.201:8080/api/score',
                {
                    total_score:score,
                    song_id:songId,
                },
                {
                    headers:{
                        'Content-Type': 'application/json',
                        ...(storedToken ? { Authorization: `${storedToken}` } : {})
                }}
            )
            const {message,code} = res.data
            if(code === 1){
                console.log('数据上传成功', message)
            }
        } catch(err){
            console.log('数据上传失败',err)
        }
    }


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPlaying(false)
                setShowTimeOut(true) 
                if (audioRef.current) { 
                    audioRef.current.pause()
                  }
            } 
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

       
    }, [])


    useEffect(() => {
        if(!song){
            return
        }
            const music = "https://".concat(song)
            const audio = new Audio(music)
            audioRef.current = audio
            audioRef.current.volume = musicBackgroundVolume/100
        
            const handleAudioEnd = () => {
                setIsPlaying(false)
                dispatch({ type: 'GameEnd' })
                clearInterval(gameIntervalRef.current)
            }

            audio.addEventListener('ended', handleAudioEnd)

            return () => {
                audio.removeEventListener('ended', handleAudioEnd)
            }

    }, [song])

    useEffect(() => {
        if (!isPlaying || !audioRef.current) return

        const audio = audioRef.current
        if (isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }

        const generateNote = () => {
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
            setNotes((prevNotes) => [
                ...prevNotes,
                { letter: randomLetter, x: 110, y: 50, status: 'active' },
            ])
        }

        const startGeneratingNotes = () => {
            gameIntervalRef.current = setInterval(generateNote, Math.max(beatInterval * 1000, 500))
        }

        startGeneratingNotes()

        const moveInterval = setInterval(() => {
            const adjustedSpeed = difficulty + Math.sin(audio.currentTime / 5) * 0.1
            setNotes((prevNotes) => {
                return prevNotes
                    .map((note) => {
                        const newX = Math.max(note.x - adjustedSpeed, 0.1)
                        if (note.status === 'active' && newX <= 15) {
                            setFeedback('miss')
                            setCombo(prevCombo => {
                              setMaxCombo(max => Math.max(max, prevCombo))
                              return 0
                            })
                            setMiss(prev => prev + 1)
                            return { ...note, x: newX, status: 'removed' }
                          }
                          return { ...note, x: newX }
                        })
                        .filter((note) => note.status !== 'removed')
                    })
        }, beatInterval / 20)

        return () => {
            clearInterval(gameIntervalRef.current)
            clearInterval(moveInterval)
            audio.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if(energy === 100){
            setIsEnergyLocked(true)
            setIsFalling(true)
            decreaseEnergyRef.current = setInterval(() => {
                setEnergy((prev) => Math.max(0, prev - 10))
            },1000)
        }
        if(energy === 0){
            setIsEnergyLocked(false)
            setIsFalling(false)
            clearInterval(decreaseEnergyRef.current)
            decreaseEnergyRef.current = null
        }

        return () => {
            if (energy === 0) { 
                clearInterval(decreaseEnergyRef.current)
                decreaseEnergyRef.current = null
            }
        }
    },[energy])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape'&&gameState.state !== 'GameStart') {
                setIsPlaying(!isPlaying)
                setShowTimeOut(!showTimeOut)
            }

            if (!isPlaying) return

            const key = e.key.toUpperCase()
            const activeNotesInCircle = notes.filter(
                (note) => note.status === 'active' && Math.abs(note.x - CIRCLE_CENTER) <= CIRCLE_RADIUS
            )

            if (activeNotesInCircle.length === 0) return
            const firstNote = activeNotesInCircle[0]

            setNotes((prevNotes) =>
                prevNotes.map((note) => {
                    if (note === firstNote) {
                        if (note.letter === key) {
                            const distance = Math.abs(note.x - CIRCLE_CENTER)

                            if (distance <= 3) {
                                setScore((prev) => prev + 2)
                                setFeedback('prefect')
                                isEnergyLocked ? '' : setEnergy((prev) => Math.min(100, prev + 2))
                                setPrefect(prev => prev + 1)
                                setCombo((prevCombo) => prevCombo + 1)
                            } else if (distance > 3 && distance <= 5) {  
                                setScore((prev) => prev + 1) 
                                setFeedback('good')
                                isEnergyLocked ? '' : setEnergy((prev) => Math.min(100, prev + 1))
                                setGood(prev => prev + 1)
                                setCombo((prevCombo) => prevCombo + 1)
                            }
                            setOuterCircleEffect(true)
                            setTimeout(() => setOuterCircleEffect(false), 200)
                        } else {
                            setFeedback('miss')
                            isEnergyLocked ? '' : setEnergy((prev) => Math.max(0, prev - 2))
                            setCombo(prevCombo => {
                                setMaxCombo(max => Math.max(max, prevCombo))
                                return 0
                            })
                            setMiss(prev => prev + 1)
                           
                        }

                        return { ...note, status: 'removed' }
                    }
                    return note
                }).filter((note) => note.status !== 'removed')
            )

            clearTimeout(feedbackTimeoutRef.current)
            feedbackTimeoutRef.current = setTimeout(() => setFeedback(''), 500)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isPlaying, notes])


    useEffect(() => {
        localStorage.setItem("gameData", JSON.stringify({ score, maxCombo, prefect, good, miss }))
      }, [score, maxCombo, prefect, good, miss]) 

      
    function ProgressBar  ({ audioRef })  {
        
        useEffect(() => {
            if (!audioRef.current) return
    
            const audio = audioRef.current
    
            let animationFrameId
            const updateProgress = () => {
                if (audio.currentTime && audio.duration) {
                    setProgress((audio.currentTime / audio.duration) * 100)
                }
                 animationFrameId = requestAnimationFrame(updateProgress)
            }
        
            updateProgress() 
        
            return () => cancelAnimationFrame(animationFrameId)
        }, [progress])
    
        return (
            <div style={styles.progressBarContainer}>
                <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
            </div>
        )
    }

    
    useEffect(() => {
            document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        <>
            <style>
                {`
                @keyframes curtainClose {
                    0% {
                        transform: translateX(-100%)
                    }
                    100% {
                        transform: translateX(0)
                    }
                }

                @keyframes curtainCloseRight {
                    0% {
                        transform: translateX(100%)
                    }
                    100% {
                        transform: translateX(0)
                    }
                }

                @keyframes curtainOpen {
                    0% {
                        transform: translateX(0)
                    }
                    100% {
                        transform: translateX(-100%)
                    }
                }

                @keyframes curtainOpenRight {
                    0% {
                        transform: translateX(0)
                    }
                    100% {
                        transform: translateX(100%)
                    }
                }


                @keyframes comboJump {
                    0% {
                        opacity:0
                        transform: translateY(0)
                    }
                    50% {
                        opacity:1
                        transform: translateY(-10px) 
                    }
                    100% {
                        opacity:1
                        transform: translateY(0)
                    }
                }
        `}
        </style>
        
        <div style={styles.background}>
            <img src = {avatar} alt="暂时无法显示" style={styles.avatar} />
            <div style={styles.information}>
                <div style={styles.infoRow}>
                    <span style={styles.userName}>{userName}</span>
                    <span style={styles.userId}>ID:{userId}</span>
                </div>
                <div style={styles.infoRow}>
                    <span style={styles.modeText}>{mode}</span>
                    <span style={styles.scoreText}>{score}</span>
                </div>
            </div>

            {combo  ? 
                <p style={{
                    ...styles.combo,
                    opacity: combo > 0 ? 1 : 0,
                    animation: combo > 0 ? 'comboJump 0.5s ease-in-out' : '',
                }}>
                    <span> combo x {combo}</span>
                </p> :
                ''
            }

            <div style={styles.gameArea}>
                <div style={outerCircleEffect ? { ...styles.outerCircle, boxShadow: '0 0 20px 10px #FFD700' } : styles.outerCircle}></div>
                <div style={styles.innerCircle}></div>
                {notes.map((note, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.note,
                            left: `${note.x}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {note.letter}
                    </div>
                ))}
            </div>

         

            <ProgressBar audioRef={audioRef} />

            <div style={styles.energyBarContainer}>
                <div style={{ ...styles.energyBar, width: `${energy}%` }}></div>
            </div>

            {feedback && (
                <div
                    style={{
                    ...styles.feedback,
                    color: feedback === 'prefect'
                        ? 'rgb(248, 85, 85)'
                        : feedback === 'good'
                        ? 'rgb(252, 186, 85)'
                        : ' #1DA1FF',
                    textShadow: feedback === 'prefect'
                        ? '-2px -2px 0 #FFE9C7, 2px 2px 0 #FFE9C7'
                        : feedback === 'good'
                        ? '-2px -2px 0 #FFE9C7, 2px 2px 0 #FFE9C7'
                        : '-2px -2px 0 #98EDF0, 2px 2px 0 #98EDF0',
                        
                    }}
                >
                    {feedback}
                </div>
            )}

            {isFalling&&<SakuraAnimation />}
        

            {showTimeOut && <TimeOut onResume={() => { setIsPlaying(true),setShowTimeOut(false) }} onExit={() => navigate("/SelectMusic")} />}

            {feedback === 'prefect' &&
                <img src="/指.png"
                    alt="暂时无法显示"
                    style={{ ...styles.people, width: '15rem'}} />}
            {feedback === 'good' &&
                <img src="/高兴.png"
                    alt="暂时无法显示"
                    style={{ ...styles.people, width:'15rem'}} />}
            {feedback === 'miss' &&
                <img src="/哭泣.png"
                    alt="暂时无法显示"
                    style={{ ...styles.people, width: '12rem'}} />}
            {feedback === '' &&
                <img
                    src="/正常.png"
                    alt="暂时无法显示"
                    style={{ ...styles.people, width: '12rem'}} />}
            
        
                <>
                    <div style={{
                        display:gameState.state === 'GameEnd' ? 'none' : 'block',
                        position: 'fixed',
                        left: '0',
                        top: '0',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)' ,
                        border: '8px solid #ff99b5',
                        boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
                        zIndex: '1',
                        animation:gameState.state === 'Gaming' ? 'curtainOpen 1s ease-out forwards' : ''
                    }} />

                    <div style={{
                        display:gameState.state === 'GameEnd' ? 'none' : 'block',
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)' ,
                        border: '8px solid #ff99b5',
                        boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
                        zIndex: '1',
                        animation:gameState.state === 'Gaming' ? 'curtainOpenRight 1s ease-out forwards' : ''
                    }} />
                </>


            {gameState.state === 'GameStart' && (
                     <button
                        onClick={() => {
                        dispatch({ type: 'Gaming' })
                        setIsPlaying(true)
                        }}
                        style={styles.startButton}
                    >
                      开始游戏
                  </button>
            )}

            {gameState.state === 'GameEnd' && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            left:'0',
                            transform: 'translateX(-100%)',
                            top: '0',
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)' ,
                            border: '8px solid #ff99b5',
                            boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
                            zIndex: '1',
                            animation: 'curtainClose 1.5s ease-out forwards',
                        }}
                        onAnimationEnd={() => {
                        setTimeout(() => {
                            navigate("/MusicSettlementPage")
                        }, 500)
                    }}/>

                    <div
                        style={{
                            position: 'fixed',
                            right: '0',
                            transform: 'translateX(100%)',
                            top: '0',
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(to bottom right, #ffe6f2, #ffccda)',
                            border: '8px solid #ff99b5',
                            boxShadow: '0 0 20px rgba(255, 128, 171, 0.5)',
                            zIndex: '1',
                            animation:'curtainCloseRight 1.5s ease-out forwards',
                        }}
                    />
                </>
            )}
        </div>
    </>
    )
}

const styles = {
    background: {
        position: 'fixed',
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(/单人音游界面.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: '-1'
    },
    startButton: {
        position: 'absolute',
        top: '50%',
        left: '48%',
        transform: 'translate(-50%, -50%)',
        padding: 'clamp(0.5rem, 1.5vw, 1rem) clamp(1rem, 3vw, 2rem)',
        fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
        backgroundColor: 'rgb(252, 176, 179)',
        fontFamily: 'YouSheBiaoTiHei',
        color: 'white',
        border: 'none',
        borderRadius: 'clamp(0.5rem, 1vw, 0.8rem)',
        cursor: 'pointer',
        zIndex: '2'
    },
    avatar: {
        position: 'absolute',
        top: 'clamp(1rem, 3vh, 3rem)',
        left: 'clamp(1rem, 3vw, 3rem)',
        display: 'block',
        width: 'clamp(3rem, 6vw, 6rem)',
        height: 'clamp(3rem, 6vw, 6rem)',
        borderRadius: '50%',
        zIndex: '1'
    },
    information: {
        position: 'absolute',
        top: 'clamp(1rem, 3vh, 3rem)',
        left: 'clamp(8rem, 12vw, 15rem)',
        width: 'clamp(12rem, 25vw, 25rem)',
        minHeight: 'clamp(3rem, 6vh, 6rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        border: '2px solid rgba(254, 155, 155, 0.7)',
        borderRadius: 'clamp(0.5rem, 1vw, 1.2rem)',
        background: 'linear-gradient(135deg, rgba(255, 240, 240, 0.3), rgba(255, 220, 220, 0.2))',
        boxShadow: '0 4px 12px rgba(254, 155, 155, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        padding:'0.5rem',
        color: 'rgba(255, 255, 255, 0.9)',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    userName: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(1rem, 1.8vw, 1.8rem)',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userId: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(0.8rem, 1.5vw, 1.5rem)',
        color: '#FFFFFF',
    },
    modeText: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(1rem, 2vw, 2rem)',
        color: '#79E2FF',
        width: '100%',
        textAlign: 'center',
    },
    scoreText: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(1.5rem, 3vw, 3rem)',
        color: '#FF7676',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    },
    gameArea: {
        position: 'absolute',
        top: 'clamp(13rem, 32vh, 30rem)',
        width: '80vw',
        maxWidth: '80rem',
        height: 'clamp(5rem, 12vh, 12rem)',
        backgroundColor: 'transparent',
        marginTop: 'clamp(1rem, 2vh, 2rem)',
        borderRadius: 'clamp(0.5rem, 1vw, 1rem)',
    },
    outerCircle: {
        position: 'absolute',
        left: '20vw',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(3rem, 8vw, 8rem)',
        height: 'clamp(3rem, 8vw, 8rem)',
        borderRadius: '50%',
        border: 'clamp(0.2rem, 0.4vw, 0.4rem) solid #FFD700',
        transition: 'box-shadow 0.2s ease-in-out',
    },
    innerCircle: {
        position: 'absolute',
        left: '20vw',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(3rem, 6vw, 6rem)',
        height: 'clamp(3rem, 6vw, 6rem)',
        borderRadius: '50%',
        border: 'clamp(0.2rem, 0.4vw, 0.4rem) solid #FFA500',
    },
    note: {
        width: 'clamp(3rem, 5vw, 5rem)',
        height: 'clamp(3rem, 5vw, 5rem)',
        borderRadius: '50%',
        background: 'linear-gradient(145deg,rgb(252, 176, 179), #fad0c4)', 
        boxShadow: `
            inset -4px -4px 8px rgba(255, 255, 255, 0.8), 
            inset 4px 4px 8px rgba(254, 155, 155, 1),  
            2px 2px 5px rgba(252, 175, 175, 0.88)        
        `,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        fontSize: 'clamp(1rem, 2vw, 2rem)',
        color: 'rgb(17, 83, 252)', 
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', 
    },
    energyBarContainer: {
        position: 'absolute',
        top: 'clamp(8rem, 23vh, 30rem)',
        right: 'clamp(0.5rem, 1vw, 1rem)',
        width: '70%',
        height: 'clamp(0.8rem, 1.5vh, 1.5rem)',
        backgroundColor: '#ddd',
        border: 'clamp(0.2rem, 0.4vw, 0.4rem) solid white',
        borderRadius: 'clamp(0.5rem, 1vw, 1rem)',
    },
    energyBar: {
        height: '100%',
        background: 'linear-gradient(90deg, #B3E3FF, #FFA7BA)',
        borderRadius: 'clamp(0.5rem, 1vw, 1rem)',
    },
    feedback: {
        position: 'absolute',
        left: '24vw',
        top: 'clamp(8rem, 24vh, 30rem)',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
        fontWeight: 'bold',
        animation: 'fade 0.5s',
    },
    p: {
        margin: '0',
        paddingLeft: 'clamp(0.5rem, 1vw, 1rem)',
        alignItems: 'center',
        fontFamily: 'YouSheBiaoTiHei',
        fontWeight: 'normal',
        letterSpacing: '0em',
        color: '#FFFFFF',
        fontSize: 'clamp(0.8rem, 1.5vw, 1.5rem)'
    },
    people: {
        position: 'absolute',
        left: '45vw',
        bottom:'5vw',
        width: 'clamp(10rem, 25vw, 25rem)',
        height: 'clamp(10rem, 40vh, 25rem)',
        aspectRatio: '1/1',
    },
    combo: {
        position: 'absolute',
        top: 'clamp(3rem, 8vh, 8rem)',
        color: '#FF7676',
        fontSize: 'clamp(1.5rem, 3vw, 3rem)',
        fontWeight: 'bold',
        textShadow: '-4px -4px 0 #FFEDED, 4px -4px 0 #FFEDED, -4px 4px 0 #FFEDED, 4px 4px 0 #FFEDED',
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 'clamp(0.5rem, 3vh, 1rem)', 
        left: 'clamp(5rem, 10vw, 10rem)',
        width: '75%',
        height: 'clamp(0.5rem, 1vh, 1rem)',
        backgroundColor: '#ddd',
        borderRadius: 'clamp(0.2rem, 0.5vw, 0.5rem)',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#00FF00',
        borderRadius: 'clamp(0.2rem, 0.5vw, 0.5rem)',
    },
}