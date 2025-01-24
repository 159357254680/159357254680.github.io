import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function UserRegister(){
    const [userName,setUserName ] = useState('')
    const [password,setPassword ] = useState('')
    const [confirm,setConfirm ] = useState('')
    const [isPointered,setIsPointered] = useState(false)
    const navigate = useNavigate()

    const isComplete = userName&&password&&confirm

    
    async function postImformation(e){
        e.preventDefault();

        if(!isComplete){
            alert('请输入完整信息!')
            return
        }
    
        if(password!==confirm){
            alert('两次密码不一致,请检查后重试!')
        }
        try{
            const storedToken = localStorage.getItem('token')
            const res = await axios.post(
            "http://123.56.118.201:9000/api/user/register",
            {userName:userName,password:password},
            {
                headers: {
                  'Content-Type': 'application/json',
                  ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
                },
                withCredentials: true
              }
          )
          const {message,error} = res.data
          if(!error){
            alert(message)
            setUserName('')
            setPassword('')
            setConfirm('')
            navigate('/StartGame')
          }
        } catch(err){
            alert('登陆异常，请稍后重试!',err)
        }
    }

    function returnLogin(){
        navigate('/UserLogin')
    }

    return (
        <div style={styles.container}>
            <div 
                onClick={returnLogin}
                style={styles.hide}
            />
            <img 
                src='/注册改.png'
                alt='注册'
                style={{
                    position:'relative',
                    left:'9.55rem',
                    top:'1.61rem'
                }}
            />
            <input 
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='请输入用户名'
                style = {{
                    ...styles.input,
                    top:'16rem'
                }}/>
            <input 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='请输入密码'
                style={{
                    ...styles.input,
                    top:'22rem'
                }}/>
            <input 
                type='password'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder='请输入重复密码'
                style={{
                    ...styles.input,
                    top:'28rem'
                }}/>
                
                    <>
                        <button 
                            onClick={postImformation}
                            onMouseEnter={() => setIsPointered(true)}
                            onMouseLeave={() => setIsPointered(false)}
                            style = {{
                                ...styles.background,
                                zIndex:'1',
                                top:'33rem',
                                left:'35rem',
                                cursor:'pointer',
                                backgroundColor:'#D0EEFF',
                                fontFamily: 'YouSheBiaoTiHei',
                                fontSize: '28px',
                                fontWeight:' normal',
                                lineHeight: 'normal',
                                letterSpacing: '0.3em',
                                fontVariationSettings: 'opsz auto',
                                color: '#3D3D3D',
                                border: isPointered ? '0.1x solid #3D3D3D' : 'none',
                                transform: isPointered ? 'translate(16px,16px)' : 'translate(0,0)',
                                transition: 'all 0.1s ease',
                            }}
                        >
                            登录
                        </button>
                        <div
                            style={{
                                ...styles.background,
                                zIndex:'0',
                                top:'34rem',
                                left:'36rem',
                                backgroundColor:'#7CA5DE',
                            }}
                        />
                    </>
        </div>
    )
}

    const styles = {
        container:{
            position: 'relative',
            width: '100%', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            overflow: 'hidden',
        },
        hide:{
            position:'absolute',
            zIndex:'1',
            top:'8.8rem',
            left:'24.5rem',
            width:'145px',
            height:'64px',
            backgroundColor:'transparent',
            cursor:'pointer'
        },
        input:{
            position:'absolute',
            paddingLeft:'10px',
            left:'26rem',
            height:'60px',
            width:'450px',
            outline:'none',
            border:'none',
            fontSize:'25px',
            backgroundColor:'rgb(255, 252, 252)',
        },
        background:{
            position:'absolute',
            width:'120px',
            height:'50px',
            outline:'none',
            borderRadius:'3px',
        }
    }


        
