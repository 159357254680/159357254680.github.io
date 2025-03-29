import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Squares from './userLoginBackground'

export default function UserLogin() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isHidden, setIsHidden] = useState(false)
    const [isPointed, setIsPointed] = useState(false)
    const navigate = useNavigate()
    const divRef = useRef(null) 

    useEffect(() => {
            document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
       
        const fromRegister = sessionStorage.getItem('fromRegister')

        if (fromRegister) {
            setIsHidden(true)
            sessionStorage.removeItem('fromRegister') 
        } else {
           
            const moveTimer = setTimeout(() => {
                document.body.style.overflow = 'hidden'

                if (divRef.current) {
                    let opacity = 1
                    const fadeOut = () => {
                        opacity -= 0.02
                        if (divRef.current) divRef.current.style.opacity = opacity

                        if (opacity > 0) {
                            requestAnimationFrame(fadeOut)
                        } else {
                            setIsHidden(true)
                        }
                    }
                    fadeOut()
                }
            }, 500)

            return () => clearTimeout(moveTimer)
        }
    }, [])

    async function userLogin(){

        try{
            const storedToken = localStorage.getItem('token')
            const res = await axios.post(
                'http://123.56.118.201:8080/user/login',
                {username: userName, password: password},
                {
                    header:{
                        'Content-Type': 'application/json',
                        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
                    },
                }
            )
            const {message} = res.data
            const token = res.data.data.token
            if(message === 'Verification successful'||message === 'login successfully'){
                localStorage.setItem('userName', userName)
                localStorage.setItem('token', token)
                setUserName('')
                setPassword('')
                navigate('/CarSelectPage')
            }else if(message ==='email not verified'){
                alert('邮箱未验证，请前往邮箱验证')
                setUserName('')
                setPassword('')
            }else if(message === "user not found"){
                alert('用户不存在，请注册')
                setUserName('')
                setPassword('')
            }else{
                alert('用户名或密码错误,,请重试!')
                setUserName('')
                setPassword('')
            }
        } catch(err){
            console.log(err)
            alert('登录错误,请稍后再试!')
        }
    } 


    function register() {
        sessionStorage.setItem('fromRegister', 'true') 
        navigate('/UserRegister')
    }

    return (
            <>
                {!isHidden && (
                    <div
                        ref={divRef}
                        style={{
                            position: 'absolute',
                            background: 'rgb(184, 225, 249)',
                            width: '100%',
                            height: '100vh',
                            zIndex: '2',
                            transition: 'transform 1s  ease-out',
                            opacity: 1, 
                        }}
                    />
                )}

                <div style={styles.container}>
                    <Squares
                        speed={0.5}
                        squareSize={40}
                        direction='diagonal'
                        borderColor='rgb(145, 196, 255)'
                        hoverFillColor='rgb(119, 202, 251)'
                    />

                    <div onClick={register} style={styles.hide} />
                    <img
                        src='/登录改.png'
                        alt='登录'
                        style={{
                            position: 'relative',
                            left: '8.5rem',
                        }}
                    />
                    <input
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='请输入用户名'
                        style={{
                            ...styles.input,
                            top: '16rem',
                        }}
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='请输入密码'
                        style={{
                            ...styles.input,
                            top: '22rem',
                        }}
                    />
                    <button
                        onClick={userLogin}
                        onMouseEnter={() => setIsPointed(true)}
                        onMouseLeave={() => setIsPointed(false)}
                        style={{
                            ...styles.background,
                            zIndex: '1',
                            top: '33.5rem',
                            left: '35rem',
                            cursor: 'pointer',
                            backgroundColor: '#D0EEFF',
                            fontFamily: 'YouSheBiaoTiHei',
                            fontSize: '28px',
                            fontWeight: 'normal',
                            lineHeight: 'normal',
                            letterSpacing: '0.3em',
                            color: '#3D3D3D',
                            border: isPointed ? '0.1px solid #3D3D3D' : 'none',
                            transform: isPointed ? 'translate(0.5rem,0.5rem)' : 'translate(0,0)',
                            transition: 'all 0.1s ease',
                        }}
                    >
                        登录
                    </button>
                    <div
                        style={{
                            ...styles.background,
                            zIndex: '0',
                            top: '34rem',
                            left: '35.5rem',
                            backgroundColor: '#7CA5DE',
                        }}
                    />
                </div>
        </>
    )
}

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        marginLeft: '0',
        overflow: 'hidden',
        background: 'rgb(201, 201, 201)',
    },
    hide: {
        position: 'absolute',
        zIndex: '1',
        top: '9rem',
        left: '46rem',
        width: '145px',
        height: '70px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    input: {
        position: 'absolute',
        paddingLeft: '10px',
        left: '26rem',
        height: '60px',
        width: '450px',
        outline: 'none',
        border: 'none',
        fontSize: '25px',
        backgroundColor: 'rgb(255, 252, 252)',
    },
    background: {
        position: 'absolute',
        width: '120px',
        height: '50px',
        outline: 'none',
        borderRadius: '3px',
    },
}

