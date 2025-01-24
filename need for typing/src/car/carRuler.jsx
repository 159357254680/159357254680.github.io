import CarReturn from './carReturn'


export default function CarRuler(){
    return (
        <div style={styles.background}>
            <CarReturn path={"/CarMainPage"}/>

            <img 
                src="/赛车规则.png"
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
        background:'#89D2FF'
    }
}