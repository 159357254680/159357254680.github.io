import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from './avatar'
export default function SelectPage({src,top,setting,path,select}) {
    const [avatar,setAvatar] = useState('')
    const navigate = useNavigate()
    
    
    
    return (
        <>
            <img
                src= {src}
                alt="选择"
                style={styles.backgroundImage}
            />
            
           <img 
                src={`${avatar}`}
                alt="头像暂时不可见"
                style={styles.img}
           />

            <div style={styles.information}>
                <p style={{...styles.p,fontSize:'24px'}}>Cypher</p>
                <p style={{...styles.p,fontSize:'16px'}}>114514</p>
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
                top:top,
                left:'56rem',
                width:'20rem',
                height:'5rem',
                cursor:'pointer',
            }}
                onClick={() => navigate(select)}/>
            
            
        </>
    )
}

const styles ={
    backgroundImage:{
        width:'78rem',
        height:'40.8rem'
    },
    img:{
        display:'inline-block',
        position:'absolute',
        top:'2.7rem',
        left:'5.2rem',
        width:'5rem',
        height:'4rem',
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
        color: '#FFFFFF',
    },
}