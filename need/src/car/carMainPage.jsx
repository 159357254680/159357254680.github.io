import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTargetContext } from "../hooks/TargetContext"
import Fog from './fog'

export default function CarMainPage(){
    const navigate = useNavigate()
    const {targetContext} = useTargetContext()

    useEffect(() => {   
            document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        };
    }, []);

    function goBackOrStart(path){
        if(!targetContext){
            alert("请先获取文本")
            return
        }else{
            navigate(path)
        }
    }

    return (
        <>

            <img 
                src="/赛车主页.png"
                alt="赛车主页"
                style={Styles.backgroundImage}
            />
            
            <Fog />

            <div 
                style={Styles.setting}
                onClick={() => navigate("/CarSetting", { state: { path: "/CarMainPage" } })}
                />

            <button style={{
                ...Styles.btn,
                left:'32.5rem',
                top:'8.5rem',
            }}
                onClick={() => goBackOrStart("/CarGamePage")}>
                单人模式
            </button>

            <button style={{
                ...Styles.btn,
                right:'5rem',
                top:'18rem',
            }}
                onClick={() => goBackOrStart("/Connection")}>
                双人pk
            </button>

            <button style={{
                ...Styles.btn,
                left:'9.5rem',
                top:'18rem',
            }}
                onClick={() => navigate("/CarRuler") }>
                规则说明
            </button>

            <button style={{
                ...Styles.btn,
                left:'15.5rem',
                top:'30.3rem',
            }}
                onClick={() => navigate("/CarQuestionEdit")}>
                题库编辑
            </button>
            
            <button style={{
                ...Styles.btn,
                right:'9.5rem',
                top:'30.5rem',
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
        height: '41rem',
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
        width:'17.5rem',
        height:'4rem',
        outline:'none',
        border:'none',
        borderRadius:'18px',
        background:'transparent',
        cursor:'pointer',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '32px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.3em',
    }
}