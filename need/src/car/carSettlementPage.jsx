import { useNavigate } from 'react-router-dom'
import { useTargetContext } from '../hooks/TargetContext'
import PixelTransition from './pixelTransition'
import CarReturn from './carReturn'

export default function CarSettlementPage(){
    const navigate = useNavigate()
    const { targetContext } = useTargetContext()
    const correctCount = JSON.parse(localStorage.getItem("correctCount"))
    const time = JSON.parse(localStorage.getItem("time"))
    console.log(correctCount);
    
        
    return (
        <>

            <PixelTransition
                firstContent={
                   <div 
                        style={{
                            background:' #B3E3FF',
                            width:'79rem',
                            height:'41rem'
                        }}
                   />
                }
                secondContent={
                    <>
                        <img
                            src="/赛车结算页面.png"
                            alt="赛车结算"
                            style={styles.backgroundImage}
                        />
        
                        <CarReturn path={"/CarMainPage"}/>

                        <div style={{
                            ...styles.font,
                            color:'black',
                            top:'15.5rem'
                        }}>
                            {targetContext.length}
                        </div>
                        <div style={{
                            ...styles.font,
                            color: '#007EBC',
                            top:'22rem'
                        }}>
                            {correctCount}
                        </div>
                        <div style={styles.time}>
                            {time}秒
                        </div>

                        <button
                            style={styles.btn}
                            onClick={() => navigate("/CarMainPage")}
                        >
                            确认
                        </button>
            </>
                }
                gridSize={12}
                pixelColor='#ffffff'
                animationStepDuration={0.4}
                className="custom-pixel-card"
            />
       
             
        </>
    )
}

const styles = {
    backgroundImage: {
        width: '78rem',
        height: '39.5rem',
    },
    font:{
        position:'absolute',
        left:'35.5rem',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '40px',
        letterSpacing: '0.3em',
    },
    time:{
        position:'absolute',
        bottom:'12.6rem',
        left:'23rem',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '24px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.3em',
        color:'black'
    },
    btn:{
        position:'absolute',
        left:'35rem',
        bottom:'10rem',
        width:'7rem',
        height:'3rem',
        borderRadius: '18px',
        background:' #D2FCFF',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.3em',
        outline:'none',
        border:'none',
        color:'#007EBC',
        cursor:'pointer',
        zIndex:'2',
    }
}
