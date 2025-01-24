import { useState,useEffect } from "react"
import Return from './musicReturn'
import DataTable from "./dataTable"
import Avatar from "../components/avatar"
import axios from 'axios'

export default function UserInterfaceMusic(){
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

            <div style = {styles.background}>
                    <img 
                        src="/用户粉.png"
                        alt="用户页面"
                        style={styles.backgroundImage}
                    />

                    <Return />

                

                <img
                    src="/头像粉.png"
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
                        marginTop:'6rem',
                        marginLeft:'5.8rem',
                        zIndex:'1',
                        backgroundColor:'transparent',
                    }}
                    onClick={() => setIsPointed(5)}
                />

                {isPointed === 5||isPointed === 6||isPointed === 7||isPointed === 8 ? <Avatar 
                    isPointed = {isPointed}
                    setIsPointed = {setIsPointed}
                    src = {"/头像返回.png"}
                    backgroundColor={' #FF8C9B'}
                    btnColor={' #FFB1CD'}
                    shadowColor={' #B65761'}
                /> 
                    : 
                ''}

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
                    color = {'#D7418E'}
                />    

                <button
                    style={{
                        ...styles.btn,
                        top:'36.5rem',
                        left:'22rem',
                        border:isPointed === 3 ? '2px solid #D7418E' : 'none',
                    }}
                    onMouseEnter={() => setIsPointed(3)}
                    onMouseLeave={() => setIsPointed(0)}
                >
                    帮助
                </button>
                <button
                    style={{
                        ...styles.btn,
                        top:'36.5rem',
                        left:'42rem',
                        border:isPointed === 4 ? '2px solid #D7418E' : 'none',
                    }}
                    onMouseEnter={() => setIsPointed(4)}
                    onMouseLeave={() => setIsPointed(0)}
                >
                    退出登录
                </button>



            </div>
       </>
    )
}
// linear-gradient(180deg, rgba(215, 253, 255, 0.8) 0%, rgba(26, 180, 255, 0.8) 100%)

const styles = {
    background:{
        margin:'0',
        boxSizing: 'border-box',
        width:'75rem',
        height:'40rem',
    },
    backgroundImage:{
        position:'absolute',
        zIndex:'-1',
        width:'79.5rem',
        height:'41.5rem',
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
        top:'6.5rem',
        left:'11rem'
    },
    information:{
        fontFamily: 'YouSheBiaoTiHei',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: ' #D7418E',
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
        color: '#D7418E',
        cursor:'pointer'
    }
}