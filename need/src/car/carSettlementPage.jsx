import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTargetContext } from '../hooks/TargetContext'
import PixelTransition from './pixelTransition'
import CarReturn from './carReturn'

export default function CarSettlementPage() {
    const navigate = useNavigate()
    const { targetContext } = useTargetContext()
    const correctCount = JSON.parse(localStorage.getItem("correctCount"))
    const time = JSON.parse(localStorage.getItem("time"))
    console.log(correctCount);

    useEffect(() => {   
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        };
    }, []);
    
    return (
        <>
            <PixelTransition
                firstContent={
                    <div style={{
                        background: '#B3E3FF',
                        width: '79rem',
                        height: '41rem'
                    }} />
                }
                secondContent={
                    <>
                        <img
                            src="/赛车结算页面.png"
                            alt="赛车结算"
                            style={styles.backgroundImage}
                        />
        
                        <CarReturn path={"/CarMainPage"} />

                        <div style={styles.container}>
                            <div style={styles.contentBox}>
                                <h1 style={styles.title}>恭喜闯关成功</h1>

                                <div style={styles.statsContainer}>
                                    <div style={styles.statItem}>
                                        <span style={styles.statLabel}>共计</span>
                                        <div style={styles.statValue}>
                                            {targetContext.length}字
                                        </div>
                                    </div>

                                    <div style={styles.statItem}>
                                        <span style={styles.statLabel}>你答对了</span>
                                        <div style={{...styles.statValue, color: '#007EBC'}}>
                                            {correctCount}字
                                        </div>
                                    </div>

                                    <div style={styles.timeContainer}>
                                        用时：{time}秒
                                    </div>
                                </div>

                                <button
                                    style={styles.btn}
                                    onClick={() => navigate("/CarMainPage")}
                                >
                                    确认
                                </button>
                            </div>
                        </div>
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
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBox: {
        backgroundColor: '#B3E3FF',
        borderRadius: '20px',
        padding: '2rem 3rem',
        maxWidth: '80%',
        width: '600px',
        border: '20px solid #FFFFFF',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    
    },
    title: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '2.5rem',
        color: '#007EBC',
        marginBottom: '2rem',
        letterSpacing: '0.3em',
    },
    statsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    statLabel: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '1.2rem',
        color: 'black',
        letterSpacing: '0.3em',
    },
    statValue: {
        background: '#E9F7FF',
        borderRadius: '38px',
        padding: '0.5rem 2rem',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '2rem',
        letterSpacing: '0.3em',
        color: 'black',
        minWidth: '150px',
    },
    timeContainer: {
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '1.5rem',
        fontWeight: 'normal',
        letterSpacing: '0.3em',
        color: 'black',
        marginTop: '1rem',
    },
    btn: {
        width: '7rem',
        height: '3rem',
        borderRadius: '18px',
        background: '#D2FCFF',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '1rem',
        fontWeight: 'normal',
        letterSpacing: '0.3em',
        outline: 'none',
        border: 'none',
        color: '#007EBC',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: '1rem',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
    }
}