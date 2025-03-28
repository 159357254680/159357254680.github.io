import { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Wait(){
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const countRef = useRef(null)

    useEffect(() => {
        document.body.style.background = 'rgb(248, 129, 141)'

        return () => {
            document.body.style.background = '' 
        }
    },[])

    useEffect(() => {
        countRef.current = setInterval(() => {
            if(count > 0){
                setCount(prev => prev - 1)
            }else{
                navigate('/SelectMusic')
            }
        },1000)

        return () => {
            clearInterval(countRef.current)
        }

    },[count])

    return (
        <>
            <div className="container" style={styles.container}>
                <span style={styles.content}>敬请期待</span>
            </div>

            <div className='counter' style={styles.counter}>
                <p>{count}秒跳转回页面</p>
            </div>
        </>
    )
}

const styles = {
    container:{
        position:'absolute',
        top: '40%',
        left: '35%',
        boxSizing: 'border-box',
        width: '30%',
        height: '110px',
        background: 'rgb(251, 117, 130)',
        border: '6px solid #FFC6CD', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    content: {
        fontFamily: 'yixinqingcuiti',
        fontSize: '32px',
        letterSpacing: '0.5em',
        color: ' #FAFAFA',
    },
    counter: {
       position:'absolute',
       top: '60%',
       left: '44%',
       color: ' #FAFAFA',
       fontSize:'24px'
    }
}
