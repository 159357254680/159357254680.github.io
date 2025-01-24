import { useState,useEffect } from "react"
import Avatar from '../components/avatar'
import axios from 'axios'

export default function UserInterfaceCar(){
    const [userName,setUserName] = useState('Cypher')
    const [id,setId] = useState('114514')
    const [isPointed,setIsPointed] = useState(0)
    const [avatar,setAvatar] = useState('')
    const [ratings,setRatings] = useState([1,2,3])
    const [musics,setMusics] = useState(['a','b','c'])
    const [accuracies,setAccuracies] = useState([80,90,100])

    // useEffect(() => {
    //     async function getAvatar(){
    //         try{
    //             const storedToken = localStorage.getItem('token')
    //             const res = await axios.get(
    //                 '',
    //                 {
    //                     headers: {
    //                       'Content-Type': 'application/json',
    //                       ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {})
    //                     },
    //                     withCredentials: true
    //                 }
    //             )
    //             const {userName,id,avatar,ratings,musics,accuracies} = res.data
    //             setUserName(userName)
    //             setId(id)
    //             setAvatar(avatar)
    //             setRatings(ratings)
    //             setMusics(musics)
    //             setAccuracies(accuracies)
    //         } catch(err){
    //             alert('头像获取错误',err)
    //         }
    //     }

    //     getAvatar()
    // },[])

    return (
       <>
             <style>
                {`
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                    }
                `}
            </style>
            <img 
                        src="/用户页蓝.png"
                        alt="用户页面"
                        style={styles.backgroundImage}
                    />

            <div style = {styles.background}>
                    <div
                        onMouseEnter={() => setIsPointed(1)}
                        onMouseLeave={() => setIsPointed(0)}
                    >
                        {isPointed === 1 ? 
                            <img
                                src="/返回蓝亮.png"
                                alt="返回"
                                style={{
                                    ...styles.return,
                                }}
                            />
                                :
                            <img 
                                src="/返回蓝.png"
                                alt="返回"
                                style={{
                                    ...styles.return,
                                }}
                            
                            />
                        }
                    </div>

                {isPointed === 5||isPointed === 6||isPointed === 7||isPointed === 8 ? <Avatar 
                                    isPointed = {isPointed}
                                    setIsPointed = {setIsPointed}
                                    src={'/头像返回蓝.png'}
                                    backgroundColor={' #6D93CB'}
                                    btnColor={'rgb(96, 137, 247)'}
                                    shadowColor={' #1C43AB'}
                                /> 
                                    : 
                                ''}

                <img
                    src="/头像.png"
                    alt="头像暂时不可见"
                    style = {{
                        ...styles.avatar,
                        width:'8rem',
                        height:'8rem',
                        marginTop:'5rem',
                        marginLeft:'4rem',
                    }}
                />
                <img
                    src={`${avatar}`}
                    alt="头像暂时不可见"
                    style = {{
                        ...styles.avatar,
                        width:'4.0rem',
                        height:'4.0rem',
                        marginTop:'5.8rem',
                        marginLeft:'4.8rem',
                        zIndex:'1',
                        backgroundColor:'transparent',
                        border:isPointed === 2 ? '2px solid #325FA2' : '2px solid transparent',
                    }}
                    onClick={() => setIsPointed(5)}
                />

                <div style={styles.boxInformation}>
                    <label style={{
                        ...styles.information,
                        fontSize:'2rem',
                        }}>{`${userName}`}</label>
                    <label style={{
                        ...styles.information,
                        fontSize:'1.5rem',
                        }}>ID:{`${id}`}</label>
                </div>

                <DataTable 
                    ratings = {ratings}
                    musics = {musics}
                    accuracies = {accuracies}
                    color = {'#1C43AB'}
                />    

                <button
                    style={{
                        ...styles.btn,
                        top:'36.5rem',
                        left:'22rem',
                        border:isPointed === 3 ? '2px solid #325FA2' : 'none',
                    }}
                >
                    帮助
                </button>
                <button
                    style={{
                        ...styles.btn,
                        top:'36.5rem',
                        left:'42rem',
                        border:isPointed === 4 ? '2px solid #325FA2' : 'none',
                    }}
                >
                    退出登录
                </button>



            </div>
       </>
    )
}


const styles = {
    background:{
        margin:'0',
        boxSizing: 'border-box',
        width:'79rem',
        height:'42rem',
    },
    backgroundImage:{
        position:'absolute',
        zIndex:'-1',
        width:'79.5rem',
        height:'41.5rem',
    },
    return:{
        display:'inline-block',
        position:'absolute',
        width:'5rem',
        height:'2.5rem',
        top:'1rem',
        left:'1rem',
        cursor:'pointer'
    },
    avatar:{
        display:'inline-block',
        position:'absolute',
        borderRadius:'50%',
        cursor:'pointer',
    },
    boxInformation:{
        display:'flex',
        flexDirection:'column',
        position:'absolute',
        top:'6.5rem',
        left:'11rem'
    },
    information:{
        fontFamily: 'YouSheBiaoTiHei',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: 'rgba(28, 67, 171, 0.8)',
    },
    btn:{
        position: 'absolute',
        width: '8rem',
        height: '4rem',
        borderRadius: '13px',
        outline:'none',
        background: 'transparent',
        fontFamily: 'yixinqingcuiti',
        fontSize: '24px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: '#1C43AB',
        cursor:'pointer'
    }
}