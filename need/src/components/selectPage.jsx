import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SelectPage({src,sTop,bTop,setting,path,select,main,userInterface,iTop='2.75rem',iLeft='4.9rem'}) {
    const avatar = localStorage.getItem('avatar')
    const userName = localStorage.getItem('userName')

    const navigate = useNavigate()

    useEffect(() => {
            document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
      }, [])
    
    const styles ={
        backgroundImage:{
            width:'79rem',
            height:'40.8rem'
        },
        img:{
            display:'inline-block',
            position:'absolute',
            top:iTop,
            left:iLeft,
            width:'5.6rem',
            height:'4.2rem',
            borderRadius:'50%',
            zIndex:'1',
            cursor:'pointer'
        },
        information: {
            position: 'absolute',
            top: '2.6rem',
            left: '13rem',
            width: '16rem',
            height: '4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        p: {
            margin: '0',
            paddingLeft: '16px',
            alignItems: 'center',
            fontFamily: 'YouSheBiaoTiHei',
            fontWeight: 'normal',
            letterSpacing: '0em',
            whiteSpace: 'nowrap',
            color: '#FFFFFF',
        },
    }
    
    return (
        <>
            <img
                src= {src}
                alt="选择"
                style={styles.backgroundImage}
            />
            
           <img 
                src={`${avatar}`}
                style={styles.img}
                onClick={() => navigate(userInterface)}
           />

            <div style={styles.information}>
                <p style={{...styles.p,fontSize:'25px'}}>名称：{userName}</p>

            </div>

            <div style={{
                position:'absolute',
                top:'2rem',
                left:'33rem',
                borderRadius:'50%',
                width:'4rem',
                height:'4rem',
                cursor:'pointer',
                }}
                onClick={() => navigate(setting,{ state: {path} })}
            />
            <div style={{
                position:'absolute',
                top:sTop,
                left:'56rem',
                width:'20rem',
                height:'5rem',
                cursor:'pointer',
            }}
                onMouseEnter={() => navigate(select)}/>
            <div
                style={{
                    position:'absolute',
                    top:bTop,
                    left:'50rem',
                    width:'25rem',
                    height:'7rem',
                    cursor:'pointer',
                }}
                    onClick={() => navigate(main)}
            />
            
        </>
    )
}

