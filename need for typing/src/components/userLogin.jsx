import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UserLogin(){
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isPointed,setIsPointed] = useState(false)
    const navigate = useNavigate()

        // async function postImformation(e){
        //     e.preventDefault();
        //     try{
        //         const storedToken = localStorage.getItem("token")
        //         const res = await axios.post(
        //             "http://123.56.118.201:9000/api/user/login", 
        //             { username: userName, password: password },
        //             {
        //               headers: {
        //                 'Content-Type': 'application/json',
        //                 ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
        //               },
        //               withCredentials: true
        //             }
        //         )
        //         const {message,token,err} = res.data
        //         if(!err){
        //             alert(message)
        //             setUserName('')
        //             setPassword('')
        //             localStorage.setItem("token", token);
        //             navigate('/StartGame')
        //         }
        //     } catch(err){
        //         alert('登录异常,请稍后重试',err)
        //     }
        // }
        function register(){
            navigate('/UserRegister')
        }

        function test(){
            navigate('/musicMainPage')
        }
        
        return (
            <div style={styles.container}>
                <div 
                    onClick={register}
                    style={styles.hide}
                />
                <img 
                    src='/登录改.png'
                    alt='登录'
                    style={{
                        position:'relative',
                        left:'8.5rem',

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
                    {/* {isPointered ? 
                        <button
                            onClick={postImformation}
                            onMouseEnter={() => setIsPointered(true)}
                            onMouseLeave={() => setIsPointered(false)}
                            style={{
                                ...styles.background,
                                top:'30rem',
                                left:'37rem',
                                cursor:'pointer',
                                fontFamily: 'YouSheBiaoTiHei',
                                fontSize: '28px',
                                fontWeight:' normal',
                                lineHeight: 'normal',
                                letterSpacing: '0.3em',
                                fontVariationSettings: 'opsz auto',
                                color: '#3D3D3D',
                                backgroundColor:'#7CA5DE',
                            }}
                        >
                            登录
                        </button>
                        : */}
                        <>
                            <button 
                                onClick={test}
                                onMouseEnter={() => setIsPointed(true)}
                                onMouseLeave={() => setIsPointed(false)}
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
                                    border: isPointed ? '0.1x solid #3D3D3D' : 'none',
                                    transform: isPointed ? 'translate(16px,16px)' : 'translate(0,0)',
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
            top:'9rem',
            left:'46rem',
            width:'145px',
            height:'70px',
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
  