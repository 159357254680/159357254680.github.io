import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { motion } from "framer-motion"
import Star from './star'

export default function MusicMainPage() {
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    function Btn({ content, top, left, paddingRight, onClick }) {
        return (
           <>
                <style>
                    {`
                    @keyframes gradient {
                        0% {
                            background-position: 0% 50%
                        }
                        50% {
                            background-position: 100% 50%
                        }
                        100% {
                            background-position: 0% 50%
                        }
                    }
                    `}
                </style>

                <motion.button
                    style={{
                        ...styles.btn,
                        top: top,
                        left: left,
                        paddingRight: paddingRight,
                    }}
                    className="btn"
                    onClick={onClick}
                    whileHover={{
                        background: 'linear-gradient(90deg, #FFD0D0 20%,  #FFB1D9 60%,  #DDF3FF 100%)',
                        backgroundSize: '300% 100%',
                        backgroundClip: 'border-box',
                        fontWeight: 'bold',
                        animation: 'gradient 1.5s linear infinite',
                        boxShadow: "0 0 15px rgba(255, 105, 180, 1), 0 0 25px rgba(255, 105, 180, 0.8)", 
                        transform: "translateX(1rem)",
                    }}
                    transition={{
                        duration: 0.3, 
                        ease: "easeInOut", 
                    }}
                >
                    {content}
                </motion.button>
           </>
        )
    }

    function navigateToPage(path) {
        navigate(path)
    }

    return (
        <>
            <img
                src="/音游主页.png"
                alt="音游主页"
                style={styles.img}
            />
            <motion.img
                src="/粉设置.png"
                style={styles.setting}
                onClick={() => navigate("/MusicSetting", { state: { path: "/MusicMainPage" } })}
                whileHover={{
                    rotate: 360,
                    transition: { duration: 1, ease: "linear", repeat: Infinity }
                }}
            />

            <Star />

            <div style={styles.circleContainer}>
                
                <Btn
                    content="PLAY"
                    top="20%"
                    left="47%"
                    paddingRight="clamp(0.5rem, 1vw, 1rem)"
                    onClick={() => navigateToPage("/SelectMusic")}
                />
                <Btn
                    content="RANK"
                    top="35%"
                    left="55%"
                    paddingRight="clamp(0.5rem, 1vw, 1rem)"
                    onClick={() => navigateToPage("/Ranking")}
                />
                <Btn
                    content="RULER"
                    top="50%"
                    left="55%"
                    paddingRight="clamp(0.3rem, 0.8vw, 0.8rem)"
                    onClick={() => navigateToPage("/Ruler")}
                />
                <Btn
                    content="EXIT"
                    top="65%"
                    left="47%"
                    paddingRight="clamp(0.5rem, 1vw, 1rem)"
                    onClick={() => navigateToPage("/MusicSelectPage")}
                />

                <img
                    src="/音游主页圆.png"
                    alt="音游主页圆"
                    style={styles.circle}
                />
            </div>
        </>
    )
}

const styles = {
    setting: {
        position: "absolute",
        top: 'clamp(0.5rem, 2vh, 2rem)',
        right: 'clamp(0.5rem, 2vw, 2rem)',
        width: "clamp(2rem, 5vw, 5rem)",
        height: "clamp(2rem, 5vw, 5rem)",
        background: "transparent",
        cursor: "pointer",
        zIndex: "2",
    },
    img: {
        position: 'fixed',
        width: "100vw",
        height: "100vh",
        objectFit: 'cover',
    },
    circleContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(15rem, 40vw, 40rem)',
        height: 'clamp(15rem, 40vw, 40rem)',
        aspectRatio: '1/1',
    },
    circle: {
        position:'absolute',
        width: '95%',
        height: '95%',
        objectFit: 'contain',
    },
    btn: {
        position: "absolute",
        width: 'clamp(10rem, 25vw, 25rem)',
        height: 'clamp(2rem, 5vw, 5rem)',
        background:"linear-gradient(90deg, #FFD0D0 20%,  #FFB1D9 60%,  #DDF3FF 100%)",
        borderRadius: "clamp(0.5rem, 1vw, 1rem)",
        border: "clamp(0.2rem, 0.4vw, 0.4rem) solid #FFFFFF",
        textAlign: "right",
        fontFamily: "YouSheBiaoTiHei",
        fontSize: "clamp(1rem, 2.5vw, 2.5rem)",
        color: "white",
        letterSpacing: 'clamp(0.2rem, 0.5vw, 0.5rem)',
        cursor: "pointer",
    },
}