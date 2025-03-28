import { useState,useEffect } from "react"
import CarReturn from './carReturn'
import DataTable from "../components/dataTable"
import Avatar from "../components/avatar"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function UserInterfaceMusic(){
    const userName = localStorage.getItem('userName')
    const avatar = localStorage.getItem('avatar')
    const storedToken = localStorage.getItem('token')

    const [isPointed,setIsPointed] = useState(0)
    const [musics,setMusics] = useState('')
    const [time,setTime] = useState(0)
    const [score,setScore] = useState('')

    const [identifying,setIdentifying] = useState('')
    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [step, setStep] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if(!storedToken){
            navigate("/UserLogin",{replace:true})
        }
        async function getData(){
            try{
                const res = await axios.get(
                    'http://123.56.118.201:8080/api/user_scores',
                    {
                        headers: {
                          'Content-Type': 'application/json',
                          ...(storedToken ? { Authorization: ` ${storedToken}` } : {})
                        },
                    }
                )
                const {time,musics,score} = res.data
                setMusics(musics)
                setTime(time)
                setScore(score)
            } catch(err){
               console.log(err)
            }
        }

        getData()
    },[])

    async function changePassword(){
        try{
            setStep(1)
            const res = await axios.get(
                'http://123.56.118.201:8080/user/forget_password',
                {
                    params: { email: email },
                    headers: {
                        'Content-Type': 'application/json',
                        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
                    },
                }
            )
            console.log('返回数据:', res.data)
            const identifying = res.data.message
            if(identifying){
                setStep(2)
                alert('验证码已发送至您的邮箱，请注意查收!')
                console.log(identifying)
            }
        } catch(err){
            console.error('验证码请求异常:', err)
            alert(`获取验证码异常，请稍后重试! ${err}`)
            setStep(0)
        }
    }

    async function submitNewPassword(){
        try{
             const res = await axios.post(
                 'http://123.56.118.201:8080/user/reset_password',
                 {token:identifying,email:email,new_password:newPassword},
                 {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
                    },
                 }
             )
             const {message,error} = res.data
             if(!error){
                 console.log(message)
                 alert('密码修改成功！')
                 setStep(0)
             }else{
                 alert('验证码错误，请重新尝试!')
             }
        } catch(err){
             alert('验证码异常，请稍后再试！')
             setStep(0)
             throw new Error("error :",err)
        }
 
     }

     function exitUser(){
        localStorage.removeItem('token')
        navigate("/UserLogin")
     }

    return (
       <>
             <style>
                {`
                    html, body {
                        margin: 0
                        padding: 0
                        width: 100%
                        height: 100%
                    }
                `}
            </style>

            <div style = {styles.background}>
                    <img 
                        src="/用户页蓝.png"
                        alt="用户页面"
                        style={styles.backgroundImage}
                    />

                    <CarReturn path={"/CarSelectPage"}/>

                

                <img
                    src="/头像蓝.png"
                    style = {{
                        ...styles.avatar,
                        width:'7rem',
                        height:'7rem',
                        marginTop:'4rem',
                        marginLeft:'4rem',
                    }}
                />
                <img
                    src={`${avatar}`}
                    style = {{
                        ...styles.avatar,
                        width:'4.65rem',
                        height:'4.65rem',
                        marginTop:'5.2rem',
                        marginLeft:'5.1rem',
                        zIndex:'1',
                        backgroundColor:'transparent',
                    }}
                    onClick={() => setIsPointed(5)}
                />

                {isPointed === 5||isPointed === 6||isPointed === 7||isPointed === 8 ? <Avatar 
                    isPointed = {isPointed}
                    setIsPointed = {setIsPointed}
                    src = {"/头像返回蓝.png"}
                    backgroundColor={'rgb(116, 166, 240)'}
                    btnColor={'rgb(118, 163, 231)'}
                    shadowColor={' #325FA2'}
                /> 
                    : 
                ''}

                <div style={styles.boxInformation}>
                    <label style={{
                        ...styles.information,
                        fontSize:'3rem',
                        }}>
                            名称：{`${userName}`}
                    </label>

                    <label style={{
                        ...styles.information,
                        fontSize:'1.5rem',
                        }}>
                    </label>
                </div>

                <DataTable 
                    musics = {musics}
                    time = {time}
                    score = {score}
                    color = {' #1C43AB'}
                />    

                <button
                    style={{
                        ...styles.btn,
                        top:'36.5rem',
                        left:'22rem',
                        border:isPointed === 3 ? '2px solid #325FA2' : 'none',
                    }}
                    onMouseEnter={() => setIsPointed(3)}
                    onMouseLeave={() => setIsPointed(0)}
                    onClick={() => setStep(1)}
                >
                    重置密码
                </button>
                <button
                    style={{
                        ...styles.btn,
                        top:'36.5rem',
                        left:'42rem',
                        border:isPointed === 4 ? '2px solid #325FA2' : 'none',
                    }}
                    onMouseEnter={() => setIsPointed(4)}
                    onMouseLeave={() => setIsPointed(0)}
                    onClick={exitUser}
                >
                    退出登录
                </button>

                {step === 1 &&(
                        <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <h3 style={styles.modalTitle}>请输入邮箱</h3>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="请输入邮箱"
                                style={styles.modalInput}
                            />
                            <button onClick={changePassword} style={styles.modalButton}>
                                确认
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                            <div style={styles.modalOverlay}>
                                <div style={styles.modal}>
                                    <h3 style={styles.modalTitle}>请输入验证码和新密码</h3>
                                    <input
                                        type="text"
                                        value={identifying}
                                        onChange={(e) => setIdentifying(e.target.value)}
                                        placeholder="请输入验证码"
                                        style={styles.modalInput}
                                    />
                                    <input
                                        type="text"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="请输入新密码"
                                        style={styles.modalInput}
                                    />
                                    <button onClick={submitNewPassword} style={styles.modalButton}>
                                        确认
                                    </button>
                                </div>
                            </div>
                        )}

            </div>
       </>
    )
}


const styles = {
    background:{
        margin:'0',
        boxSizing: 'border-box',
        width:'79rem',
        height:'41rem',
    },
    backgroundImage:{
        position:'absolute',
        zIndex:'-1',
        width:'79rem',
        height:'41rem',
    },
    avatar:{
        display:'inline-block',
        position:'absolute',
        borderRadius:'50%',
        cursor:'pointer'
    },
    boxInformation:{
        display:'flex',
        flexDirection:'column',
        position:'absolute',
        top:'5rem',
        left:'11rem'
    },
    information:{
        fontFamily: 'YouSheBiaoTiHei',
        paddingLeft:'0.5rem',
        letterSpacing: '0em',
        color: ' rgba(28, 67, 171, 0.8)',
    },
    btn:{
        position: 'absolute',
        width: '8rem',
        height: '4rem',
        borderRadius: '13px',
        outline:'none',
        background: 'linear-gradient(90deg, #5CA3D4 10%, rgba(255, 255, 255, 0) 90%)',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '24px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: ' #1C43AB',
        cursor:'pointer'
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
        justifyContent: 'center',
        Index:'1',
    },
    modal: {
        backgroundColor: '#D0EEFF',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '300px',
    },
    modalTitle: {
        fontSize: '20px',
        marginBottom: '10px',
        color: '#1C43AB',
    },
    modalInput: {
        width: '100%',
        height: '30px',
        fontSize: '16px',
        marginBottom: '10px',
        outline: 'none',
        border: '1px solid #1C43AB',
        borderRadius: '5px',
        padding: '5px',
    },
    modalButton: {
        padding: '10px 20px',
        backgroundColor: '#1AB4FF',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
    }
}