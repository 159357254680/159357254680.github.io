import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [opacity, setOpacity] = useState(0.01)
  const [isIncreasing, setIsIncreasing] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const navi = setTimeout(() => {
      navigate("./UserLogin")
    }, 2300)

    return () => clearTimeout(navi)
  }, [navigate])

  useEffect(() => {
    const changeOpacity = setInterval(() => {
      if (opacity >= 1) {
        setIsIncreasing(0)
      }
      setOpacity(isIncreasing === 1 ? opacity + 0.1 : opacity - 0.1)
    }, 100)
    return () => clearInterval(changeOpacity)
  }, [opacity, isIncreasing])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      style={styles.background}
    >
      <img
        src="/封面.png"
        alt="如果你看到这行字,说明游戏炸了"
        style={{
          width: "min(90vw, 650px)",  
          height: "auto",  
          aspectRatio: "6.5/1",  
          opacity: `${opacity}`,
          maxHeight: "15vh",  
        }}
      />
    </motion.div>
  )
}

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(184, 225, 249)",
    width: "100vw",  
    height: "100vh",  
    position: "fixed",  
    top: 0,
    left: 0,
  },
}