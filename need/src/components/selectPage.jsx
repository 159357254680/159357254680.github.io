import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export default function SelectPage({src, sTop, bTop, setting, path, select, main, userInterface,settingImg, color}) {
    const avatar = localStorage.getItem('avatar')
    const userName = localStorage.getItem('userName')
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])
    
    const styles = {
        backgroundImage: {
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0
        },
        img: {
            display: 'inline-block',
            position: 'absolute',
            top: '6vh',
            left: '10vw',
            width: 'min(15vw, 5.6rem)',
            height: 'min(11vw, 4.2rem)',
            borderRadius: '50%',
            zIndex: '1',
            cursor: 'pointer',
        },
        information: {
            position: 'absolute',
            top: '6vh',
            left: '20vw',
            width: 'min(40vw, 18rem)',
            height: 'min(10vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)', 
            borderRadius: '20px',
            boxShadow: `0 0 8px ${color}`,  
            padding: '0 2rem',
            backdropFilter: 'blur(6px)', 
            borderImage: `linear-gradient(145deg, 
                          rgba(255,255,255,0.3), 
                          ${color}80, 
                          transparent) 1`,
            borderImageSlice: 1,
            transition: 'all 0.3s ease',
            fontFamily: 'YouSheBiaoTiHei',
        },
        p: {
            margin: '0',
            paddingLeft: '1rem',
            alignItems: 'center',
            fontFamily: 'YouSheBiaoTiHei',
            fontWeight: 'normal',
            letterSpacing: '0em',
            whiteSpace: 'nowrap',
            color: '#FFFFFF',
            fontSize: 'clamp(16px, 2vw, 25px)',
            textShadow: `0 0 8px ${color}`
        },
        settingButton: {
            position: 'absolute',
            top: '6vh',
            right: '20vw',
            borderRadius: '50%',
            width: 'min(8vw, 3rem)',
            height: 'min(8vw, 3rem)',
            cursor: 'pointer',
        },
        buttonBase: {
            position: 'absolute',
            cursor: 'pointer',
            background: 'linear-gradient(90deg, #FFD0D0 3%, #FFB1D9 67%, #DDF3FF 100%)',
            border: 'none',
            borderRadius: '18px',
            fontFamily: 'YouSheBiaoTiHei',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 6px 12px -3px rgba(255, 176, 214, 0.8), 0 4px 8px -2px rgba(221, 243, 255, 0.6)',
        }
    }
    
    return (
        <>
            <img
                src={src}
                alt="选择"
                style={styles.backgroundImage}
            />
            
            <img 
                src={`${avatar}`}
                style={styles.img}
                onClick={() => navigate(userInterface)}
            />

            <div style={styles.information}>
                <p style={styles.p}>名称：{userName}</p>
            </div>

            <motion.img
                src={settingImg}
                style={styles.settingButton}
                onClick={() => navigate(setting,{ state: {path} })}
                whileHover={{
                    rotate: 360,
                    transition: { duration: 1, ease: "linear", repeat: Infinity }
                }}
            />
    
            <motion.button
                style={{
                    ...styles.buttonBase,
                    top: sTop,
                    right: '10vw',
                    width: 'min(30vw, 20rem)',
                    height: 'min(12vw, 5rem)',
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    letterSpacing: '0.2rem',
                }}
                onMouseEnter={() => navigate(select)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 8px 16px -3px rgba(255, 176, 214, 0.9), 0 6px 12px -2px rgba(221, 243, 255, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
            >
                音游模式
            </motion.button>
            
            <motion.button
                style={{
                    ...styles.buttonBase,
                    top: bTop,
                    right: '15vw',
                    width: 'min(35vw, 25rem)',
                    height: 'min(15vw, 7rem)',
                    fontSize: 'clamp(20px, 3vw, 32px)',
                    letterSpacing: '0.3rem',
                }}
                onClick={() => navigate(main)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 12px 20px -3px rgba(255, 176, 214, 0.9), 0 8px 16px -2px rgba(221, 243, 255, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
            >
                赛车模式
            </motion.button>
        </>
    )
}