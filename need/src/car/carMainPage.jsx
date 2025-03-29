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

    // 五角星布局的按钮位置计算
    function getButtonPosition(index, totalButtons) {
        const radius = 30; 
        const centerX = 50; 
        const centerY = 50; 
        const angle = (index * (2 * Math.PI / totalButtons)) - Math.PI / 2; 
        
        return {
            left: `${centerX + radius * Math.cos(angle)}%`,
            top: `${centerY + radius * Math.sin(angle)}%`,
            transform: 'translate(-50%, -50%)'
        }
    }

    function Btn({content, path, index, totalButtons}){
        const position = getButtonPosition(index, totalButtons);
        
        

        return (
            <>
                <style>
                    {`
                    .Btn {
                        background: #93CBF2;
                        width: min(20vw, 12rem);
                        height: min(10vh, 6rem);
                        outline: none;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: YouSheBiaoTiHei;
                        font-size: clamp(16px, 2vw, 24px);
                        letter-spacing: 0.2em;
                        color: #185A7F;
                        border-radius: 38px;
                        box-sizing: border-box;
                        border: min(1vw, 0.5rem) solid #DDF3FF;
                        padding: 0 min(2vw, 1rem);
                        z-index: 2;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 8px rgba(0, 126, 188, 0.3);
                        position: absolute;
                        margin-top: min(2vh, 1rem);
                        margin-left: min(2vw, 1rem);
                        transform: translate(-50%, -50%);
                    }

                    .Btn:hover {
                        background: rgb(39, 156, 239);
                        box-shadow: 0 6px 12px rgba(0, 126, 188, 0.4);
                    }

                `}
                </style>

                 <button 
                    className='Btn'
                    style={{
                        ...position,
                    }}
                onClick={content === "单人游戏" || content === "双人游戏" 
                    ? () => goBackOrStart(path) 
                    : () => navigate(path)}>
                    {content}
                </button>
            </>

        )
    }

    const buttons = [
        { content: "单人游戏", path: "/CarGamePage" },
        { content: "双人游戏", path: "/Connection" },
        { content: "退出游戏", path: "/CarSelectPage"},
        { content: "题库编辑", path: "/CarQuestionEdit" },
        { content: "规则说明", path: "/CarRuler" }
    ];

    return (
        <>

            <img 
                src="/赛车主页.png"
                alt="赛车主页"
                style={Styles.backgroundImage}
            />
            
            <Fog />

            <img 
                src='/蓝设置.png'
                alt='设置'
                style={Styles.setting}
                onClick={() => navigate("/CarSetting", { state: { path: "/CarMainPage" } })}
            />

            <div style={Styles.container}>
                <img
                    src='/蓝车.png'
                    alt='赛车'
                    style={Styles.carImage}
                />

                {buttons.map((button, index) => (
                    <Btn 
                        key={button.content}
                        content={button.content}
                        path={button.path}
                        index={index}
                        totalButtons={buttons.length}
                    />
                ))}
            </div>
        </>
    )

    
}

const Styles = {
    backgroundImage: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: '-1',
        top: 0,
        left: 0
    },
    setting: {
        position: 'absolute',
        right: '5vw',
        top: '2vh',
        width: 'min(8vw, 3rem)',
        height: 'min(8vw, 3rem)',
        cursor: 'pointer',
        zIndex: 2
    },
    container: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    carImage: {
        position: 'absolute',
        width: '35vw',
        height: '30vh',
        aspectRatio: '1/1',
        zIndex: 1
    },
}