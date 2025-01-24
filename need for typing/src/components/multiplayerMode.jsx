import Return from '../music/musicReturn'


export default function MultiplayerMode() {
    
    return(
        <>

        <Return />

        <img
            src="/用户纯粉.png"
            alt="设置页面"
            style={styles.backgroundImage}
        />

        <p>复制下方地址,给你的朋友即可开始游戏!在他们点击地址之前,请不要离开此页面</p>

        <iuput 
            type='text'
        />

        </>

      
    )
}

const styles = {
    backgroundImage: {
        position: 'absolute',
        left:'0',
        width: '79rem',
        height: '41rem',
        zIndex: '-1',
    },
}