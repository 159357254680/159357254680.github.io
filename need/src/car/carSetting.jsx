import { useLocation } from 'react-router-dom';
import Setting from "../components/setting"
import CarReturn from './carReturn'


export default function CarSetting(){
        const location = useLocation()
        const { path } = location.state
        
        
        const backgroundColor = ' #f2f2f2'
        const trackColor = 'rgb(133, 164, 247)'
        const thumbColor = ' #1C43AB'
    
        return (
            <Setting 
                path={path} 
                src={"/用户页蓝.png"} 
                ReturnComponent={CarReturn}
                backgroundColor={backgroundColor}
                trackColor={trackColor}
                thumbColor={thumbColor}
                gradientColor={'linear-gradient(90deg, #67B3DF 10% , rgba(255, 255, 255, 0) 90%)'}
                fontColor={'#1C43AB'}/>

        )

}