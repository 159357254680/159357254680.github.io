import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Return from './musicReturn';

export default function SelectMusic() {
    const [isPointed, setIsPointed] = useState(null)
    const [isMouseEnter,setIsMouseEnter] = useState(null)
    const [searchValue,setSearchValue] = useState('')
    const [isFiltered, setIsFiltered] = useState(false)
    const navigate = useNavigate();
    

    const datas = [
        { name: '歌曲1', singer: '歌手1' },
        { name: '歌曲2', singer: '歌手2' },
        { name: '歌曲3', singer: '歌手3' },
        { name: '歌曲4', singer: '歌手4' },
        { name: '歌曲5', singer: '歌手5' },
        { name: '歌曲6', singer: '歌手6' },
        { name: '歌曲7', singer: '歌手7' },
        { name: '歌曲8', singer: '歌手8' },
        { name: '歌曲9', singer: '歌手9' },
        { name: '歌曲10', singer: '歌手10' },
        { name: '歌曲12', singer: '歌手11' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
        { name: '歌曲11', singer: '歌手12' },
    ];

    const listRef = useRef(null);

    function navigateToPage(path){
        navigate(path);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            setIsFiltered(true); 
        }
    }

    const filteredMusic = isFiltered
        ? datas.filter((data) => data.name.includes(searchValue))
        : datas;

    
    function scrollList(direction) {
        if (listRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            listRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    function CreateList({ datas, isPointed, setIsPointed }) {
        const extendedDatas = [
            ...datas,
            ...datas,
            ...datas,
        ];
    
        return (
            <div style={styles.scrollContainer}>
                <button style={{ ...styles.scrollButton, left: '-3rem' }} onClick={() => {scrollList('left'); setIsPointed(null)}} >
                    ◀
                </button>
                <div style={styles.listWrapper} ref={listRef}>
                    {extendedDatas.map((data, index) => {
                        if (isPointed === index) {
                           
                            return (
                                <div key={index} style={styles.selectedItem}>
                                    <div style={{
                                        ...styles.difficulty,
                                        color: isMouseEnter === 1 ? '#FF7898' : 'rgb(247, 180, 195)'
                                        }}
                                        onMouseEnter={() => setIsMouseEnter(1)}
                                        onMouseLeave={() => setIsMouseEnter(null)}
                                        onClick={() => navigateToPage('/MusicLoading')}
                                    >简单</div>
                                    <div style={{
                                        ...styles.difficulty,
                                        color: isMouseEnter === 2 ? '#FF7898' : 'rgb(247, 180, 195)'
                                        }}
                                        onMouseEnter={() => setIsMouseEnter(2)}
                                        onMouseLeave={() => setIsMouseEnter(null)}
                                        onClick={() => navigateToPage('/MusicLoading')}
                                    >中等</div>
                                    <div style={{
                                        ...styles.difficulty,
                                        color: isMouseEnter === 3 ? '#FF7898' : 'rgb(247, 180, 195)'
                                        }}
                                        onMouseEnter={() => setIsMouseEnter(3)}
                                        onMouseLeave={() => setIsMouseEnter(null)}
                                        onClick={() => navigateToPage('/MusicLoading')}
                                    >复杂</div>
                                    <p style={{...styles.selectedItemP,fontSize:'20px'}}>{data.singer}</p>
                                    <p style={{...styles.selectedItemP,fontSize:'24px'}}>{data.name}</p>
                                </div>
                            );
                        } else {
                            
                            return (
                                <div
                                    key={index}
                                    style={styles.item}
                                    onClick={() => setIsPointed(index === isPointed ? null : index)} 
                                >
                                    <p>{data.name}</p>
                                </div>
                            );
                        }
                    })}
                </div>
                <button style={{ ...styles.scrollButton, right: '-5rem' }} onClick={() => {scrollList('right');setIsPointed(null)}}>
                    ▶
                </button>
            </div>
        );
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
                type="text"
                placeholder="搜索歌曲"
                style={styles.search}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    setIsFiltered(false)
                }}
                onKeyDown={handleKeyDown}
            />
            {searchValue !== ''&&filteredMusic !== datas && ( 
                <ul style={styles.suggestionsList}>
                    {filteredMusic.map((data, index) => (
                        <li 
                            key={index} 
                            style={styles.suggestionItem}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#FF7898';  
                                e.target.style.borderRadius = '12px';  
                            }} 
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';  
                                e.target.style.borderRadius = '0px';  
                            }}
                        >
                            {data.name}
                        </li>
                    ))}
                </ul>
            )}


            <CreateList datas={filteredMusic} isPointed={isPointed} setIsPointed={setIsPointed} />

            <button
                style={{ ...styles.modeButton }}
                onMouseEnter={(e) => e.target.style.backgroundColor = ' #FF7898'}
                onMouseLeave={(e) => e.target.style.backgroundColor = ' #FFE4E4'}
            >
                单  人  游  戏
            </button>
            <button
                style={{ ...styles.modeButton, left: '49.5%' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = ' #FF7898'}
                onMouseLeave={(e) => e.target.style.backgroundColor = ' #FFE4E4'}
            >
                双  人  游  戏
            </button>
        </>
    );
}

const styles = {
    backgroundImage: {
        width: '78rem',
        height: '40rem',
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
    },
    suggestionsList: {
        position: 'absolute',
        top: '5rem',
        left: '30rem',
        width: '20rem',
        maxHeight: '10rem', 
        overflowY: 'auto',
        background: '#F5DBDB',
        border: '1px solid #DDD',
        borderRadius: '8px',
        listStyleType: 'none',
        padding: '0.5rem',
        zIndex: 10,
    },
    suggestionItem: {
        padding: '0.5rem',
        cursor: 'pointer',
        color: '#333',
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
        flex: '0 0 3%',
        height: '15rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
        padding: '0.5rem',
        background: 'linear-gradient(180deg, #FFC6CD 0%, #FFE7EA 100%, #FFE0E4 100%)',
        borderRadius: '8px',
        boxShadow: '-10px 10px 10px #FF949F',
        fontFamily: 'yixinqingcuiti',
        fontSize: '24px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: 'white',
        cursor: 'pointer',
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
        bottom: '1.7rem',
        width: '49.2%',
        height: '20%',
        background: ' #FFE4E4',
        border: '8px solid rgb(253, 242, 242)',
        borderRadius: '12px 12px 0 0',
        outline: 'none',
        fontFamily: 'yixinqingcuiti',
        fontSize: '36px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: 'white',
        cursor: 'pointer',
    },
    selectedItem: {
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flex:'1 0 15rem',
        height: '16rem',
        color:'white',
        borderRadius: '20px',
        background:'linear-gradient(90deg, #FFE7EA 0%,  #FFB3B3 40%, #FF949F 100%)',
        transition:'all 0.3s ease-in-out'
    },
    selectedItemP: {
        marginRight:'10px',
        width:'25px',
        display: 'flex',
        flexDirection:'column',  
           
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
    }
    
};
