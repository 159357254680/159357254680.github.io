import { useState, useEffect,useRef, useCallback } from "react"
import axios from 'axios'
import Return from './musicReturn' 

export default function Ranking(){
    const storedToken = localStorage.getItem('token')

    const [songList, setSongList] = useState([]) 
    const [filteredSongs, setFilteredSongs] = useState([]) 
    const [hoveredSong, setHoveredSong] = useState(null)
    const [selectedSong, setSelectedSong] = useState(null) 
    const [rankingData, setRankingData] = useState([]) 
    const [searchInput, setSearchInput] = useState("") 


    const songListRef = useRef(null) 
    const scrollPosition = useRef(0)  

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        axios.get(
            'http://123.56.118.201:8080/api/all_songs',
            {
                headers:{
                    'Content-Type': 'application/json',
                    ...(storedToken ? { Authorization: ` ${storedToken}` } : {})
                },
            },
        ).then((res) => {
                setSongList(res.data.data.song_ids)
                setFilteredSongs(res.data.data.song_ids)
            })
            .catch((error) => {
                console.error('获取歌单失败:', error)
            })
    }, [])

    const handleSongClick = (song) => {
        setSelectedSong(song)
        axios.get(
            `http://123.56.118.201:8080/api/scores`,
            {
                params:{song_id: song.id},
                headers:{
                    'Content-Type': 'application/json',
                    ...(storedToken ? { Authorization: ` ${storedToken}` } : {})
                },
            },
        ).then((res) => {
                setRankingData(res.data)
            })
            .catch((error) => {
                console.error('获取排行榜失败:', error)
            })
    }
      
    const handleInput = (e) => {
        const value = e.target.value
        setSearchInput(value)
        
        if(!value.length){
            setFilteredSongs(songList)
        }
       
    }

    const handleSearch = (e) => {
        const value = e.target.value
        if (e.key === 'Enter') {
            setFilteredSongs(
                songList.filter((song) => song.title.includes(value))
            )
        }
    }

    const handleMouseEnter = useCallback((index) => {
        setHoveredSong(index)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setHoveredSong(null)
    }, [])


        function SongList({ songs }) {
            return (
                <div style={styles.songListContainer} ref={songListRef} onScroll={handleScroll}>
                    {songs.map((song, index) => {
                        return (
                            <div
                                key={song.id}
                                style={{
                                    ...styles.songItem,
                                    ...(hoveredSong === index ? styles.songItemHover : {}),
                                    backgroundColor: selectedSong && selectedSong.id === song.id
                                        ? 'rgb(254, 137, 197)'  
                                        : ' #FFD0D0',  
                                }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleSongClick(song)}
                            >
                                {song.title}
                            </div>
                        )
                    })}
                </div>
            )
        }
  
    


        function Rank({ rankingData }) {
            const datas = rankingData.data || []
            return (
                <div style={styles.RankContainer}>
                    {datas.length > 0 ? (
                        datas.map((entry, index) => (
                            <div key={index} style={{ 
                                ...styles.RankItem, 
                                ...getRankStyles(index) 
                            }}>
                                <div style={{
                                    ...styles.rankBadge, 
                                    background: getRankBadgeColor(index)
                                }}>
                                    {index + 1}
                                </div>
        
                                <div style={styles.rankText}>
                                    <span>{entry.username}</span> - 
                                    <span style={styles.score}>{entry.score}</span> - 
                                    <span>{new Date(entry.time).toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noData}>没有排行榜数据</p>
                    )}
                </div>
            )
        }
        

        function getRankBadgeColor(index) {
            const colors = [' #FFD700', '  #a9a9a9', ' #b87333']; 
            return colors[index] || ' #FFA7BA';  
        }
        

        function getRankStyles(index) {
            const bgGradients = [
                'linear-gradient(90deg, #ffcc00, #ffaa00,rgb(255, 217, 0), #ffcc00)',
                'linear-gradient(90deg, #c0c0c0, #a9a9a9,rgb(196, 192, 192),  #c0c0c0)',
                'linear-gradient(90deg, #cd7f32, #b87333, #a0522d, #8b4513)',
            ];
            return {
                background: bgGradients[index] || "linear-gradient(90deg,rgb(250, 170, 196), #B5FFFC)",  
                transform: "scale(1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    transform: "scale(1.05)", 
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                }
            }
        }

    const handleScroll = () => {
        if (songListRef.current) {
            scrollPosition.current = songListRef.current.scrollTop
        }
    }

    useEffect(() => {
        if (songListRef.current) {
            songListRef.current.scrollTop = scrollPosition.current
        }
    }, [selectedSong,hoveredSong])

    
   
    return(
        <>
            <>
                <img
                    src="/排行榜改.png"
                    alt="排行榜"
                    style = {styles.backgroundImage}
                />

                <Return path={"/MusicMainPage"}/>

                <input 
                    type="text"
                    placeholder="搜索歌名"
                    style={styles.searach}
                    value={searchInput}
                    onChange={handleInput}
                    onKeyDown={handleSearch}
                />

                <SongList songs={filteredSongs} />
            </>

            <>
                <div 
                    style={{
                        ...styles.background,
                        backgroundColor:' #FFA7BA',
                        textAlign:'center',
                        fontFamily: 'yixinqingcuiti',
                        fontSize: '24px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '0em',
                        color:'#FFFFFF',
                    }}>
                    <h1>    积  分  排  行  榜</h1>

                </div>
                <div style={{
                    ...styles.background,
                    top:'10rem',
                    width:'50%',
                    height:'100vh',
                    background:'linear-gradient(180deg, #FFD0D0 10%,rgb(251, 149, 202) 50%,#FFD0D0 60%,#FFD0D0 100%  )'
                }}>
                     <Rank rankingData={rankingData} />
                </div>

            </>
        </>
    )
}

const styles = {
        backgroundImage:{
            position:'absolute',
            width:'110%',
            height:'100vh',
            zIndex:'-1',
        },
        background:{
            position:'absolute',
            right:'0',
            width:'50%',
            height:'100vh',
            zIndex:'0',
            overflow:'hidden'
        },
        searach:{
            paddingLeft:'1rem',
            position:'absolute',
            top:'2rem',
            left:'10rem',
            width:'15rem',
            height:'2rem',
            outline:'none',
            border:'none',
            borderRadius:'18px',
            background:'#FFD1D1',
            color:'white',
        },
        songListContainer: {
            position: 'absolute',
            top: '6rem',
            left: '5rem',
            width: '35vw',
            height: '80vh',
            overflowY: 'scroll',
            scrollbarWidth: 'none', 
            background: 'rgba(0, 0, 0, 0)', 
            borderRadius: '12px',  
            padding: '1rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0)',  
            backdropFilter: 'blur(10px)',  
        },
        songItem: {
            padding: '1rem',
            fontSize: '26px',
            color: '#f5f5f5',  
            marginBottom: '0.5rem',
            borderRadius: '10px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'background 0.3s, transform 0.2s',  
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,  
        },
        songItemHover: {
            background: 'linear-gradient(90deg, #ff7f50, #ff6347)', 
            color: '#fff',
            transform: 'scale(1.05)',  
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',  
        },
        RankContainer: {
            position: 'absolute',
            paddingTop: '2rem',
            width: '40rem',
            height: '29rem',
            overflowY: 'auto',
        },
        RankItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            margin: '0.5rem 0',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
        },
        rankBadge: {
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        },
        rankText: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            width: '100%',
            paddingLeft: '1rem',
        },
        score: {
            color: '#ff4747',
            fontWeight: 'bold',
        },
        noData: {
            fontSize: '16px',
            color: 'white',
            textAlign: 'center',
        },
}