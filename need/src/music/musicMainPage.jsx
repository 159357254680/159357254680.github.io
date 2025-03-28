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

                <Star />

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

            <div
                style={styles.setting}
                onClick={() => navigate("/MusicSetting", { state: { path: "/MusicMainPage" } })}
            />
            <img
                src="/音游主页.png"
                alt="音游主页"
                style={styles.img}
            />
            <img
                src="/音游主页圆.png"
                alt="音游主页圆"
                style={{
                    position: "absolute",
                    top: "22%",
                    left: "28%",
                    width: "26rem",
                    height: "26rem",
                    zIndex: "3",
                }}
            />
            <Btn
                content="PLAY"
                top="30%"
                left="47%"
                paddingRight="1rem"
                onClick={() => navigateToPage("/SelectMusic")}
            />
            <Btn
                content="RANK"
                top="42%"
                left="50%"
                paddingRight="1rem"
                onClick={() => navigateToPage("/Ranking")}
            />
            <Btn
                content="RULER"
                top="54%"
                left="50%"
                paddingRight="0.5rem"
                onClick={() => navigateToPage("/Ruler")}
            />
            <Btn
                content="EXIT"
                top="66%"
                left="47%"
                paddingRight="1rem"
                onClick={() => navigateToPage("/MusicSelectPage")}
            />
        </>
    )
}

const styles = {
    setting: {
        position: "absolute",
        right: "13rem",
        width: "3.5rem",
        height: "3.5rem",
        background: "transparent",
        cursor: "pointer",
        zIndex: "2",
    },

    img: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
    },

    btn: {
        position: "absolute",
        width: "17rem",
        height: "3.5rem",
        background:"linear-gradient(90deg, #FFD0D0 20%,  #FFB1D9 60%,  #DDF3FF 100%)",
        borderRadius: "13px",
        border: "4px solid #FFFFFF",
        zIndex: "2",
        textAlign: "right",
        fontFamily: "YouSheBiaoTiHei",
        fontSize: "34px",
        color: "white",
        letterSpacing: '0.5rem',
        cursor: "pointer",
    },
}
