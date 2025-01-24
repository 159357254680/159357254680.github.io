import Return from './musicReturn'

export default function Ranking(){

    return(
        <>
            <>
                <img
                    src="/排行榜改.png"
                    alt="排行榜"
                    style = {styles.backgroundImage}
                />

                <Return path={"/MusicMainPage"}/>

                <input 
                    type="text"
                    placeholder="搜索歌名"
                    style={styles.searach}
                />
            </>

            <>
                <div 
                    style={{
                        ...styles.background,
                        height:'10rem',
                        backgroundColor:' #FFA7BA',
                        textAlign:'center',
                        fontFamily: 'yixinqingcuiti',
                        fontSize: '24px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '0em',
                        color:'#FFFFFF',
                    }}>
                    <h1>    积  分  排  行  榜</h1>
                </div>
                <div style={{
                    ...styles.background,
                    top:'10rem',
                    height:'30.5rem',
                    background:'linear-gradient(180deg, #FFD0D0 10%,  #FFB1D9 80%,  #DDF3FF 100%)'
                }}>

                </div>

            </>
        </>
    )
}

const styles = {
        backgroundImage:{
            position:'absolute',
            width:'78rem',
            height:'40rem',
            zIndex:'-1',
        },
        background:{
            position:'absolute',
            left:'37.75rem',
            width:'41.5rem',
            zIndex:'0',
        },
        searach:{
            paddingLeft:'1rem',
            position:'absolute',
            top:'2rem',
            left:'10rem',
            width:'15rem',
            height:'2rem',
            outline:'none',
            border:'none',
            borderRadius:'18px',
            background:'#FFD1D1',
            color:'white',
        }
}