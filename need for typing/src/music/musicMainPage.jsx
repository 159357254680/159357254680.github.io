import { useNavigate } from 'react-router-dom'

export default function MusicMainPage(){
    <style>
        {
           `* {
                margin: 0,
                padding: 0,
                boxSizing: border-box,
            },
            
            html, body {
                width: 100%,
                height: 100%,
            }`
        }

    </style>

    const navigate = useNavigate()

    function Btn({content,top,left,paddingRight,onClick}){
        return(
            <button
                style = {{
                    ...styles.btn,
                    top: top,
                    left: left,
                    paddingRight:paddingRight,
                }}
                onClick={onClick} 
            >
                {content}
            </button>
        )
    }

    function navigateToPage(path){
        navigate(path)
    }

    return(
        <>
            <div 
                style={styles.setting}
                path={"/MusicMainPage"}
                onClick = {() => navigateToPage('/Setting')}
            />
            <img 
                src="/音游主页.png"
                alt="音游主页"
                style={styles.img}
            />
            <img 
                src="/音游主页圆.png"
                alt="音游主页圆"
                style = {{
                    position:'absolute',
                    top: '22%',
                    left: '28%',
                    width:'26rem',
                    height:'26rem',
                    zIndex:'3'
                }}
            />
            <Btn content="P L A Y" top="30%" left="50%" paddingRight="2rem" onClick={() => navigateToPage('/SelectMusic')}/>
            <Btn content="R A N K" top="42%" left="53%" paddingRight="2rem" onClick={() => navigateToPage('/Ranking')}/>
            <Btn content="R U L E R" top="54%" left="53%" paddingRight="1rem" onClick={() => navigateToPage('/Ruler')}/>
            <Btn content="E X I T" top="66%" left="50%" paddingRight="2rem" onClick={() => navigateToPage('/')}/>
        </>
    )

}

const styles = {
    setting:{
        position:'absolute',
        right:'13rem',
        width:'3.5rem',
        height:'3.5rem',
        background:'transparent',
        cursor:'pointer',
        zIndex:'2'
    },

    img:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain', 
    },
    
    btn:{
        position:'absolute',
        width:'16rem',
        height:'3.5rem',
        background:'linear-gradient(90deg, #FFD0D0 20%,  #FFB1D9 60%,  #DDF3FF 100%)',
        borderRadius:'13px',
        border:'4px solid #FFFFFF',
        zIndex:'2',
        textAlign:'right',
        fontFamily: 'yixinqingcuiti',
        fontSize: '36px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: 'white',
        cursor:'pointer'

    }
}

