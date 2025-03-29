import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Squares from './userLoginBackground'
import axios from 'axios'


export default function UserRegister(){
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')
    const [isPointered,setIsPointered] = useState(0)
    const [identifying,setIdentifying] = useState('')
    const [email,setEmail] = useState('')
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const isComplete = userName&&password&&confirm&&email


    async function postImformation(e){
        e.preventDefault()

        if(!isComplete){
            alert('请输入完整信息!')
            return
        }
    
        if(password!==confirm){
            alert('两次密码不一致,请检查后重试!')
            return
        }

        try{
            const res = await axios.post(
            "http://123.56.118.201:8080/user/register",
            {username:userName,password:password,email: email},
            {
                headers: {'Content-Type': 'application/json'},
            }
          )
          const {code,message} = res.data

          if(code === 1&&message ==='user created successfully'){
            try{
                const res = await axios.get(
                    'http://123.56.118.201:8080/user/send_code',
                    {
                        params: { email: email },
                        headers: {'Content-Type': 'application/json'},
                    }
                )
                const identifying = res.data
                if(identifying){
                    alert('验证码已发送至您的邮箱，请注意查收!')
                    setShowModal(true)
                }
            } catch(err){
                console.error('验证码请求异常:', err)
                alert(`获取验证码异常，请稍后重试! ${err.message}`)
            }
          }else if(code===0&&message === 'user already exists'){
            alert('用户已存在!')
        }
        } catch(err){
            console.error('注册异常:', err)
            alert(`注册异常，请稍后重试! ${err.message}`)
        }
    }

    async function submitIdentifying(){
       try{
            const res = await axios.post(
                `http://123.56.118.201:8080/user/verify_code`,
                {email:email,code:identifying},
                {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            const {message} = res.data
            if(message === "Invalid request"){
                alert('请输入验证码!')
            }else if(message === "code过期或不存在"){
                alert('验证码过期，请重新获取!')
                setIdentifying('')
                setShowModal(false)
            }else if (message === "验证码错误"){
                alert('验证码错误，请重新尝试!')
                setIdentifying('')
                setShowModal(false)
            }else{
                alert('邮箱注册成功，请重新登录')
                setIdentifying('')
                setShowModal(false)
                navigate('/userLogin')
            } 
           
       } catch(err){
            alert('验证码异常，请稍后再试！')
            setShowModal(false)
            throw new Error("error :",err)
        
       }

    }

    function returnLogin(){
        navigate('/UserLogin')
    }

    return (
        <div style={styles.container}>
             <Squares
                        speed={0.5}
                        squareSize={40}
                        direction='diagonal'
                        borderColor='rgb(145, 196, 255)'
                        hoverFillColor='rgb(119, 202, 251)'
                    />

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
                    top:'14rem'
            }}/>
            <input 
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='请输入邮箱'
                style = {{
                    ...styles.input,
                    top:'19rem'
            }}/>
           
            <input 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='请输入密码'
                style={{
                    ...styles.input,
                    top:'24rem'
                }}/>
            <input 
                type='password'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder='请输入重复密码'
                style={{
                    ...styles.input,
                    top:'29rem'
                }}/>
                
                    <>
                        <div
                            style={{
                                ...styles.background,
                                zIndex:'0',
                                top:'34rem',
                                left:'35.5rem',
                                backgroundColor:'#7CA5DE',
                            }}
                        />
                        <button 
                            onClick={postImformation}
                            onMouseEnter={() => setIsPointered(2)}
                            onMouseLeave={() => setIsPointered(false)}
                            style = {{
                                ...styles.background,
                                zIndex:'0',
                                top:'33.5rem',
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
                                border: isPointered === 2 ? '0.1x solid #3D3D3D' : 'none',
                                transform: isPointered === 2 ? 'translate(0.5rem,0.5rem)' : 'translate(0,0)',
                                transition: 'all 0.1s ease',
                            }}
                        >
                            注册
                        </button>
                         {showModal && (
                            <div style={styles.modalOverlay}>
                                <div style={styles.modal}>
                                    <h3 style={styles.modalTitle}>请输入验证码</h3>
                                    <input
                                        type="text"
                                        value={identifying}
                                        onChange={(e) => setIdentifying(e.target.value)}
                                        placeholder="请输入验证码"
                                        style={styles.modalInput}
                                    />
                                    <button onClick={submitIdentifying} style={styles.modalButton}>
                                        确认
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
        </div>
    )
}

    const styles = {
        container:{
            position: 'relative',
            width: '100%',
            height: '100vh',
            marginLeft: '0',
            overflow: 'hidden',
            background:'rgb(201, 201, 201)',
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
            height:'55px',
            width:'450px',
            outline:'none',
            border:'none',
            fontSize:'25px',
            backgroundColor:'rgb(255, 252, 252)',
        },
        background:{
            position:'absolute',
            width:'130px',
            height:'50px',
            outline:'none',
            borderRadius:'3px',
        },  
        modalOverlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        modal: {
            backgroundColor: '#D0EEFF',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
        },
        modalTitle: {
            fontSize: '20px',
            marginBottom: '10px'
        },
        modalInput: {
            width: '80%',
            height: '30px',
            fontSize: '16px',
            marginBottom: '10px',
            outline:'none'
        },
        modalButton: {
            padding: '10px 20px',
            backgroundColor: '#1AB4FF',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
        }
    }


        
