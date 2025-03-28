import { useLocation } from 'react-router-dom'
import Setting from "../components/setting"
import MusicReturn from './musicReturn'

export default function MusicSetting() {
    const location = useLocation()
    const { path } = location.state
   

    
    const backgroundColor = ' #f2f2f2' 
    const trackColor = '#FFD1D1' 
    const thumbColor = '#D7418E' 

    return (
        <Setting 
            path={path} 
            src={"/用户纯粉.png"} 
            ReturnComponent={MusicReturn}
            backgroundColor={backgroundColor}
            trackColor={trackColor}
            thumbColor={thumbColor}
            gradientColor={'linear-gradient(90deg, #FFFFFF 19%, rgba(255, 255, 255, 0) 91%)'}
            fontColor={'#D7418E'}
        />
    )
}
