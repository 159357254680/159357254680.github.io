
import { useState, useRef,useLayoutEffect,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Return from './musicReturn'

export default function SelectMusic() {
    const storedToken = localStorage.getItem('token')

    const [songList, setSongList] = useState([])
    const [isPointed, setIsPointed] = useState(null)
    const [isMouseEnter,setIsMouseEnter] = useState(null)
    const [searchValue,setSearchValue] = useState('')
    const [isFiltered, setIsFiltered] = useState(false)
    const [isSingle,setIsSingle] = useState(true)
    
    const navigate = useNavigate()
    const listRef = useRef(null)
    const scrollPositionRef = useRef(0)

    
    

    useEffect(() => {
            document.body.style.overflow = "hidden" 
        return () => {
            document.body.style.overflow = "auto" 
        }
    }, [])

    useEffect(() => {
        async function getSongList (){
            try{
                const res = await axios.get(
                    'http://123.56.118.201:8080/api/all_songs',
                    {
                        headers: {
                            'Authorization': `${storedToken}`
                        }
                    }
                )
                const {message} = res.data
                if(message === "查询成功"){
                    const songList = res.data.data.song_ids
                    setSongList(songList)
                }
            } catch(err){
                console.log(err)
                alert('获取歌曲列表失败')
            }
        }
        getSongList()
    },[])

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            setIsFiltered(true) 
        }
    }

    let filteredMusic = isFiltered
        ? songList.filter((data) => data.title.includes(searchValue))
        : songList

    useLayoutEffect(() => {
        const list = listRef.current
        const handleScroll = () => {
            scrollPositionRef.current = list.scrollLeft
        }
        
        list.addEventListener('scroll', handleScroll)
        return () => list.removeEventListener('scroll', handleScroll)
    }, [listRef.current])

    useLayoutEffect(() => {
        if (listRef.current) {
          listRef.current.scrollLeft = scrollPositionRef.current
        }
      },[isPointed,isMouseEnter,isFiltered,isSingle,searchValue])


      useLayoutEffect(() => {
        if (listRef.current) {
          const originalBehavior = listRef.current.style.scrollBehavior
          listRef.current.style.scrollBehavior = 'auto'
          listRef.current.scrollLeft = scrollPositionRef.current
          listRef.current.style.scrollBehavior = originalBehavior
        }
      }, [isPointed, isMouseEnter, isFiltered, isSingle, searchValue])
    
        function scrollList(direction) {
            if (listRef.current) {
                const scrollAmount = direction === 'left' ? -200 : 200
                listRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })  
            }
        }

    function CreateList({ datas, isPointed, setIsPointed }) {

        <style>
            {`
                @keyframes Stretch{
                    0%{
                        transform: translateX(0);
                        width: 1.5rem;
                    }
                
                    100%{
                        transform:translateX(-1rem);
                        width:5rem
                    }
                }
            `}

        </style>
       
        return (
            <div style={styles.scrollContainer}>
                <button style={{ ...styles.scrollButton, left: '-3rem' }} onClick={() => {scrollList('left')}} >
                    ◀
                </button>
                <div style={styles.listWrapper} ref={listRef}>
                    {datas.map((data, index) => {
                        if (isPointed === index) {
                           
                            return (
                                <div key={index} style={{
                                    ...styles.selectedItem,
                                    animation:'Stretch 1s linear forwards'
                                }}>
                                    <div 
                                        style={{display:'flex',flexDirection:'column',marginLeft:'0.5rem'}}
                                        onMouseEnter={() => setIsMouseEnter(1)}
                                        onMouseLeave={() => setIsMouseEnter(null)}>
                                        <span style={{
                                            ...styles.span,
                                            color: isMouseEnter === 1 ? ' #FF7898' : 'rgb(247, 180, 195)'
                                        }}
                                        >困难</span>
                                        <div style={styles.difficulty}
                                            onClick={() => {
                                                navigate('/MusicLoading',{state:{difficulty: 0.32,mode:'困难',songId:data.id}})}}
                                        >
                                            <div style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                gap:'8px'
                                            }}>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                            </div>
                                        </div>
                                    </div>

                                    <div 
                                        style={{display:'flex',flexDirection:'column'}}
                                        onMouseEnter={() => setIsMouseEnter(2)}
                                        onMouseLeave={() => setIsMouseEnter(null)}>
                                        <span style={{
                                            ...styles.span,
                                            color: isMouseEnter === 2 ? ' #FF7898' : 'rgb(247, 180, 195)'
                                        }}>中等</span>
                                        <div style={styles.difficulty}
                                            onClick={() => {
                                                navigate('/MusicLoading',{state:{difficulty: 0.28,mode:'中等',songId:data.id}})}}
                                        >
                                            <div style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                gap:'8px'
                                            }}>
                                                <img src='/淡星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div 
                                        style={{display:'flex',flexDirection:'column'}}
                                        onMouseEnter={() => setIsMouseEnter(3)}
                                        onMouseLeave={() => setIsMouseEnter(null)}>
                                        <span style={{
                                            ...styles.span,
                                            color: isMouseEnter === 3 ? '#FF7898' : 'rgb(247, 180, 195)'
                                        }}>简单</span>
                                        <div style={styles.difficulty}
                                            onClick={() => {
                                                navigate('/MusicLoading',{state:{difficulty: 0.23,mode:'简单',songId:data.id}})}}
                                        >
                                            <div style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                gap:'8px'
                                            }}>
                                                <img src='/淡星.png' alt='star'/>
                                                <img src='/淡星.png' alt='star'/>
                                                <img src='/淡星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                                <img src='/亮星.png' alt='star'/>
                                            </div>
                                        </div>
                                    </div>

                                    <p style={{...styles.selectedItemP,fontSize:'20px'}}>{data.id}</p>
                                    <p style={{...styles.selectedItemP,fontSize:'24px'}}>{data.title}</p>
                                </div>
                            )
                        } else {
                            
                            return (
                                <div
                                    key={index}
                                    style={styles.item}
                                    onClick={() => setIsPointed(index === isPointed ? null : index)} 
                                >
                                    <p>{data.title}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <button style={{ ...styles.scrollButton, right: '-5rem' }} onClick={() => {scrollList('right')}}>
                    ▶
                </button>
            </div>
        )
    }

    

    return (
        <>
            <img
                src="/粉色带人页面.png"
                alt="选歌页面"
                style={styles.backgroundImage}
                onClick={() => setIsPointed(null)} 
            />

            <Return path={"/MusicMainPage"}/>

            <input
                type="search"
                placeholder="搜索歌曲"
                style={styles.search}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                    setIsFiltered(false)
                }}
                onKeyDown={handleKeyDown}
            />



            {searchValue !== ''&&filteredMusic !== songList && ( 
                <ul style={styles.suggestionsList}>
                    {filteredMusic.map((data, index) => (
                        <li 
                            key={index} 
                            style={styles.suggestionItem}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = ' #FF7898'  
                                e.target.style.borderRadius = '12px'  
                            }} 
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = ' transparent'  
                            }}
                            onClick={() => {
                                setSearchValue(data.title)
                                setIsFiltered(true)
                            }}
                        >
                            {data.title}
                        </li>
                    ))}
                </ul>
            )}

            <CreateList datas={filteredMusic} isPointed={isPointed} setIsPointed={setIsPointed} />

            <button
                 style={{ 
                    ...styles.modeButton, 
                    background: isSingle ? '#FF7898' : '#FFE4E4',
                }}
                onMouseEnter={() => setIsSingle(true)}
                
            >
                单  人  游  戏
            </button>
            <button
                style={{ 
                    ...styles.modeButton, 
                    left: '49.5%', 
                    background: isSingle ? '#FFE4E4' : '#FF7898',
                }}
                onMouseEnter={() => setIsSingle(false)}
                onClick={() =>navigate("/Wait")}

            >
                双  人  游  戏
            </button>
        </>
    )
}

const styles = {
    backgroundImage: {
        width: '78rem',
        height: '41rem',
    },
    search: {
        paddingLeft: '2rem',
        position: 'absolute',
        top: '2rem',
        left: '30rem',
        width: '20rem',
        height: '3rem',
        background: '#FFD1D1',
        borderRadius: '18px',
        outline: 'none',
        border: 'none',
        color:'white'
    },
    suggestionsList: {
        position: 'absolute',
        top: '5rem',
        left: '30rem',
        width: '20rem',
        maxHeight: '10rem', 
        overflowY: 'auto',
        background: ' #F5DBDB',
        border: '1px solid #DDD',
        borderRadius: '8px',
        listStyleType: 'none',
        padding: '0.5rem',
        zIndex: 10,
    },
    suggestionItem: {
        padding: '0.5rem',
        cursor: 'pointer',
        color: ' #333',
        borderBottom: '1px solid #DDD', 
        transition: 'background-color 0.1s ease', 
    },
    suggestionItemLast: {
        borderBottom: 'none', 
    },
    scrollContainer: {
        position: 'absolute',
        top: '8rem',
        left: '6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4rem',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    listWrapper: {
        display: 'flex',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        gap: '1rem',
        width: '60rem',
        padding: '0 2rem',
        scrollbarWidth: 'none',
    },
    item: {
        flex: '0 0 1.5rem',
        height: '15rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0.5rem',
        background: 'linear-gradient(180deg, #FFC6CD 0%, #FFE7EA 100%, #FFE0E4 100%)',
        borderRadius: '8px',
        boxShadow: '-6px 6px 5px  rgb(251, 117, 130)',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '36px',
        letterSpacing: '0em',
        color: 'white',
        cursor: 'pointer',
    },
    selectedItem: {
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        height: '16rem',
        color:'white', 
        boxShadow:'-6px 6px 5px rgb(251, 117, 130)',
        borderRadius: '20px',
        background:'linear-gradient(90deg, #FFE7EA 0%,  #FFB3B3 40%, #FF949F 100%)',
    },
    selectedItemP: {
        marginRight:'10px',
        width:'25px',
        display: 'flex',
        flexDirection:'column',  
        fontFamily: 'YouSheBiaoTiHei',
    },
    scrollButton: {
        background: '#FFD1D1',
        border: 'none',
        borderRadius: '50%',
        width: '3rem',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        cursor: 'pointer',
        position: 'absolute',
        zIndex: 2,
    },
    modeButton: {
        position: 'absolute',
        bottom: '0.6rem',
        width: '49.3%',
        height: '20%',
        background: ' #FFE4E4',
        border: '8px solid rgb(253, 242, 242)',
        borderRadius: '12px 12px 0 0',
        outline: 'none',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '36px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        color: 'white',
        cursor: 'pointer',
    },
    difficulty:{
        marginLeft:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:'24px',
        width:'2rem',
        height:'12rem',
        borderRadius:'15px',
        background:'linear-gradient(180deg, #DDF3FF 0%, #FFC6CD 100%)',
        cursor:'pointer',
    },
    span:{
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '20px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.3em',
        cursor:'pointer',
    }
    
}
