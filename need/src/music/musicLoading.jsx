import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function MusicLoading() {
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const { difficulty, mode, songId } = location.state

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    navigate("/MusicGamePage", { state: { difficulty: difficulty, mode: mode, songId: songId } })
                    return 100
                }
                return prev + 2
            })
        }, 100)

        return () => clearInterval(interval)
    }, [])

    return (
        <div style={styles.container}>
            <img
                src="/用户纯粉.png"
                alt="设置页面"
                style={styles.backgroundImage}
            />

            <p style={styles.loadingHints}>Loading......</p>
            
          
            <div style={styles.loadingWrapper}>
                <div style={styles.loadingContainer}>
                    <div style={{ 
                        ...styles.loadingBar, 
                        width: `${progress}%` 
                    }}></div>
                </div>
              
                <img
                    src="/正在加载.png"
                    alt="正在加载"
                    style={{
                        ...styles.loadingIcon,
                        left: `calc(${progress}% - ${styles.loadingIcon.width}/2)`,
                    }}
                />
            </div>
        </div>
    )


}

const styles = {
    container: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '-1',
    },
    loadingHints: {
        position: 'absolute',
        top: '20vh',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: '#971F4A',
        textAlign: 'center',
        width: '100%',
    },
   
    loadingBar: {
        height: '100%',
        background: 'linear-gradient(90deg, #DDFAFF 0%,rgb(156, 231, 244) 100%)',
        transition: 'width 0.1s ease',
        borderRadius: 'clamp(0.5rem, 1vw, 1rem)',
    },
    loadingWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        maxWidth: '800px',
    },
    loadingContainer: {
        width: '100%',
        height: 'clamp(1.5rem, 4vh, 4rem)',
        background: '#f0f0f0',
        border: 'clamp(0.5rem, 1vw, 0.625rem) solid #FFD0D0',
        borderRadius: 'clamp(1rem, 2vw, 1.25rem)',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        position: 'relative', 
    },
    loadingIcon: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '30vw', 
        height: '40vh', 
        zIndex: 2, 
        pointerEvents: 'none', 
        left: `calc(0% - clamp(1.5rem, 4vw, 3rem))`, 
        transition: 'left 0.1s linear', 
    },
}