
import {useNavigate} from "react-router-dom";
import { useEffect,useState } from 'react'

export default function Home(){
    const[opacity,setOpacity] = useState(0.01)
    const [isIncreasing, setIsIncreasing] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
            const navi = setInterval(() => {
                navigate('./UserLogin')
            }, 2300);

            return () => clearInterval(navi)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
    useEffect(() => {
       const changeOpacity = setInterval(() => {
            if(opacity >= 1){
                setIsIncreasing(1)
            }
            setOpacity(isIncreasing === 0 ?  opacity + 0.1 : opacity - 0.1)
        }, 100);
        return () => clearInterval(changeOpacity);
    },[opacity,isIncreasing])



    return(
        <div style = {styles.background}>
           <img 
                src="/封面.png"
                alt="如果你看到这行字,说明游戏炸了"
                style = {{
                    width:"650px",
                    height:"100px",
                    opacity:`${opacity}`
                }}
           />
        </div>
    )

    
}

const styles = {
    background:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"rgb(201, 201, 201)",
        width:'78rem',
        height:'41rem'
    }
}