import Return from './musicReturn'


export default function Ruler(){
    return (
        <div style={styles.background}>
            <Return path={"/MusicMainPage"}/>

            <img 
                src="/音游规则.png"
                alt="规则"
                style = {{
                    width: "78rem",
                    height: "40rem",
                    objectFit: 'contain',
                }}
            />
        </div>
        
    )
}

const styles = {
    background:{
        width:'100%',
        height:'100%',
        background:'linear-gradient(180deg,rgb(251, 197, 202) 0%, #FF7898 100%)'
    }
}