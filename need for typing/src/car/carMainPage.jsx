import { useNavigate } from 'react-router-dom'

export default function CarMainPage(){
    const navigate = useNavigate()

    return (
        <>
            <img 
                src="/赛车主页.png"
                alt="赛车主页"
                style={Styles.backgroundImage}
            />
            
            <div 
                style={Styles.setting}
                onClick={() => navigate("/CarSetting",{ state: "/CarMainPage" }) }
                />

            <button style={{
                ...Styles.btn,
                top:'7.5rem',
            }}
                onClick={() => navigate("/CarGamePage")}>
                单 人 模 式
            </button>

            <button style={{
                ...Styles.btn,
                top:'14.5rem',
            }}>
                双 人 p k
            </button>

            <button style={{
                ...Styles.btn,
                top:'20.5rem',
            }}
                onClick={() => navigate("/CarRuler") }>
                规则说明
            </button>

            <button style={{
                ...Styles.btn,
                top:'28rem',
            }}
                onClick={() => navigate("/CarQuestionEdit")}>
                题库编辑
            </button>
            
            <button style={{
                ...Styles.btn,
                top:'34.5rem',
            }}
            onClick={() => navigate("/CarSelectPage") }
            >
                退出游戏
            </button>
            

        </>
        
    )
}

const Styles = {
    backgroundImage: {
        position: 'absolute',
        width: '79rem',
        height: '40rem',
        zIndex: '-1',
    },
    setting:{
        position:'absolute',
        right:'2.1rem',
        top:'1.2rem',
        width:'3rem',
        height:'3rem',
        cursor:'pointer'
    },
    btn:{
        position:'absolute',
        right:'4rem',
        width:'22rem',
        height:'4rem',
        outline:'none',
        border:'none',
        background:'transparent',
        cursor:'pointer',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '32px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.3em',
    }
}