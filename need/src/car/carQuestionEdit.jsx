import { useState, useEffect } from 'react'
import { useTargetContext } from '../hooks/TargetContext'
import axios from 'axios'
import CarReturn from './carReturn'

export default function CarQuestionEdit() {
    const savedOption = sessionStorage.getItem('selectedOption')
    const storedToken = localStorage.getItem('token')

    const [selectedOption, setSelectedOption] = useState(savedOption || '')
    const [file, setFile] = useState('')
    const [showSubmitButton, setShowSubmitButton] = useState(false)
    const [topic, setTopic] = useState('')
    const [serverText, setServerText] = useState('')
    const {setTargetContext} = useTargetContext()
    const [loading, setLoading] = useState(false)
    const [titles, setTitles] = useState([])
    const [inputTitle, setInputTitle] = useState('')
    const [currentView, setCurrentView] = useState('main') 

    useEffect(() => {   
            document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        };
    }, []);

    async function getServerTest() {
        try {
            setLoading(true)
            const res = await axios.get(
                'http://123.56.118.201:8080/api/essay',
                {
                    params: { topic: topic },
                    headers: {
                        'Content-Type': 'application/json',
                        ...(storedToken ? { Authorization: `${storedToken}` } : {}),
                    },
                    timeout: 20000
                }
            )
            setLoading(false)

            const start = "data= "
            const lastIndex = res.data.lastIndexOf(start)
            let fullText

            if (lastIndex !== -1) {
                fullText = res.data.slice(lastIndex + start.length)
            } else {
                console.log("未找到有效内容")
            }
            setServerText(fullText)
        } catch (error) {
            console.error('获取文本失败:', error)
            setTargetContext('文本获取失败，建议在题库编辑中选择本地上传。')
        } finally {
            setLoading(false)
        }
    }

    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setShowSubmitButton(true)
            console.log('文件已选择:', selectedFile.name)
            e.target.value = null
        }
    }

  
    async function handleFileUpload() {
        if (!file) {
            alert('请选择一个文件')
            return
        }

        if (!file.name.endsWith('.txt')) {
            alert('请选择 .txt 文件')
            return
        }

        const reader = new FileReader()

        reader.onload = async (e) => {
            const fileContent = e.target.result
            console.log("文件名：", file.name)
            console.log("文件内容：", fileContent)

            try {
                const res = await axios.post(
                    'http://123.56.118.201:8080/api/save_question',
                    {
                        "context": fileContent,
                        "title": file.name,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            ...(storedToken ? { Authorization: `${storedToken}` } : {}),
                        },
                    }
                )
                const { code } = res.data
                if (code === 1) {
                    console.log('文件内容上传成功:', res.data)
                    setShowSubmitButton(false)
                } else {
                    console.log('文件内容上传失败:', res.data)
                    setShowSubmitButton(false)
                }
            } catch (error) {
                console.error('文件内容上传失败:', error)
                setShowSubmitButton(false)
            }
        }

        reader.onerror = (error) => {
            console.error('文件读取失败:', error)
            alert('文件读取失败，请重试')
        }

        reader.readAsText(file)
    }

    const handleRadioChange = (e) => {
        if (!serverText&&e.target.value === 'option1') {
            alert("请先生成文本！")
            return
        }

        const value = e.target.value
        setSelectedOption(value)
        sessionStorage.setItem('selectedOption', value)
        if(value === 'option1'){
            setTargetContext(serverText)
        }

        if (value === 'option2') {
            setCurrentView('sub')
            fetchTitles()
        } else {
            setCurrentView('main')
        }
    }
  
    const fetchTitles = async () => {
        try {
            const res = await axios.get(
                'http://123.56.118.201:8080/api/get_list',
            {
                headers: {
                    Authorization: `${storedToken}`,
                }
            })
            const {message,code} = res.data
            setTitles(res.data.data)
            if(code === 1){
                console.log('获取标题列表成功',message)
            }else{
                console.log('获取标题列表失败',message)
            }
        } catch (error) {
            console.error('获取标题列表失败:', error)
        }
    }
  
    const fetchContentByTitle = async (title) => {
        try {
            const res = await axios.get(
                `http://123.56.118.201:8080/api/get_context`, 
            {
                params: { title },
                headers: {
                    Authorization: `${storedToken}`,
                }
            })
            const {code} = res.data
            setTargetContext(res.data.data)
            if(code === 1){
                alert('获取内容成功')
                
            }else{
                alert('获取内容失败')
            }
            
        } catch (error) {
            console.error('获取内容失败:', error)
        }
    }

   
    const getRadioInputStyle = (option) => {
        return {
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            marginRight: '10px',
            appearance: 'none',
            backgroundColor: selectedOption === option ? '#4b97f7' : '#d3d3d3',
            border: '2px solid ' + (selectedOption === option ? '#4b97f7' : '#ccc'),
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
        }
    }

    useEffect(() => {
        setSelectedOption('')
    }, [serverText, file])

    return (
        <>
            <style>
                {`
                    @keyframes jumpCircle {
                        0% {
                            transform: scale(0)
                        }
                        50% {
                            transform: scale(1)
                        }
                        100% {
                            transform: scale(0)
                        }
                    }

                    @keyframes slideIn {
                        from {
                            opacity: 0
                            transform: translateX(-20px)
                        }
                        to {
                            opacity: 1
                            transform: translateX(0)
                        }
                    }

                    @keyframes popIn {
                        from {
                            transform: translate(-50%, -50%) scale(0.8)
                            opacity: 0
                        }
                        to {
                            transform: translate(-50%, -50%) scale(1)
                            opacity: 1
                        }
                    }

                    .listItem:hover{
                        transform: scale(1.05);
                        color: rgb(54, 164, 247)
                    }
                `}
            </style>

            <div style={styles.container}>
                <img
                    src="/题库编辑.png"
                    alt="编辑"
                    style={styles.backgroundImage}
                />

                <CarReturn path={"/CarMainPage"} />

                <div style={styles.radioGroup}>
                    <div style={styles.radioItem}>
                        <input
                            type="radio"
                            name="question"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleRadioChange}
                            style={getRadioInputStyle('option1')}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder='输入文本关键词'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        style={styles.topic}
                    />
                    <button
                        onClick={getServerTest}
                        onMouseEnter={(e) => e.target.style.background = styles.fetchButtonHover.background}
                        onMouseLeave={(e) => e.target.style.background = styles.fetchButton.background}
                        onMouseDown={(e) => {
                            e.target.style.background = styles.fetchButtonActive.background
                            e.target.style.transform = styles.fetchButtonActive.transform
                        }}
                        onMouseUp={(e) => {
                            e.target.style.background = styles.fetchButtonHover.background
                            e.target.style.transform = 'scale(1)'
                        }}
                        style={styles.fetchButton}
                    >
                        获取文本
                    </button>

                    <div style={styles.radioItem}>
                        <input
                            type="radio"
                            name="question"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleRadioChange}
                            style={getRadioInputStyle('option2')}
                        />

                       
                        {(currentView !== 'main') && (
                            <div style={styles.mask} onClick={() => setCurrentView('main')} />
                        )}

                       
                        {currentView === 'sub' && (
                            <div style={styles.subViewContainer}>
                                <div style={styles.subViewContent}>
                                    <button 
                                        style={styles.backButton}
                                        onClick={() => setCurrentView('main')}
                                    >
                                        ← 返回
                                    </button>
                                    <button 
                                        style={styles.subOption}
                                        onClick={() => setCurrentView('input')}
                                    >
                                        📝 输入标题获取
                                    </button>
                                    <button 
                                        style={styles.subOption}
                                        onClick={() => setCurrentView('list')}
                                    >
                                        📋 选择历史内容
                                    </button>
                                </div>
                            </div>
                        )}

                     
                        {currentView === 'input' && (
                            <div style={styles.subViewContainer}>
                                <div style={styles.subViewContent}>
                                    <button 
                                        style={styles.backButton}
                                        onClick={() => setCurrentView('sub')}
                                    >
                                        ← 返回
                                    </button>
                                    <div style={styles.inputGroup}>
                                        <input
                                            type="text"
                                            placeholder="输入标题..."
                                            value={inputTitle}
                                            onChange={(e) => setInputTitle(e.target.value)}
                                            style={styles.titleInput}
                                        />
                                        <button 
                                            style={styles.searchButton}
                                            onClick={() => {
                                                fetchContentByTitle(inputTitle)
                                                setCurrentView('main')
                                            }}
                                        >
                                            搜索
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentView === 'list' && (
                            <div style={styles.subViewContainer}>
                                <div style={styles.listViewContent}>
                                    <button 
                                        style={styles.backButton}
                                        onClick={() => setCurrentView('sub')}
                                    >
                                        ← 返回
                                    </button>
                                    <h3 style={styles.listTitle}>历史内容列表</h3>
                                    <div style={styles.titleList}>
                                        {titles.map((title, index) => (
                                            <div
                                                key={index}
                                                className='listItem'
                                                style={styles.listItem}
                                                onClick={() => {
                                                    fetchContentByTitle(title)
                                                    setCurrentView('main')
                                                }}
                                            >
                                                {title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            style={styles.fileInput}
                        />

                        <label htmlFor="fileInput" >
                            <img 
                                src="/本地上传.png"
                                alt="点击上传文件"
                                style={{
                                    marginLeft:'1vw',
                                    width:'12vw',
                                    height:'8vw',
                                    cursor: 'pointer',
                                }}  
                            />
                        </label>

                        <p style={{fontSize:'3rem', fontFamily: 'YouSheBiaoTiHei',}}>本地上传</p>



                        {showSubmitButton && (
                            <div style={styles.submitPopup}>
                                <div style={styles.popupContent}>
                                    <button style={styles.closeButton} onClick={() => setShowSubmitButton(false)}>✖</button>
                                    <span style={styles.fileName}>已选择文件: {file.name}</span>
                                    <button onClick={handleFileUpload} style={styles.submitButton}>提交文件</button>
                                </div>
                            </div>
                        )}

                        {loading && (
                            <div style={styles.loadingContainer}>
                                <p style={styles.loadingText}>正在为您生成文本...</p>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        ...styles.loadingCircle,
                                        animation: 'jumpCircle 1.4s linear infinite',
                                        animationDelay: '0.16s',
                                    }} />
                                    <div style={{
                                        ...styles.loadingCircle,
                                        animation: 'jumpCircle 1.4s linear infinite',
                                        animationDelay: '0.32s',
                                    }} />
                                    <div style={{
                                        ...styles.loadingCircle,
                                        animation: 'jumpCircle 1.4s linear infinite',
                                        animationDelay: '0.48s'
                                    }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

const styles = {
    container: {
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        zIndex: '-1',
    },
    radioGroup: {
        position: 'absolute',
        top: '6rem',
        left: '10rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
    },
    topic: {
        position: 'absolute',
        marginTop: '0.5rem',
        marginLeft: '6rem',
        width: '14rem',
        height: '2rem',
        fontSize: '1rem',
        padding: '0.5rem',
        border: '2px solid #1AB4FF',
        borderRadius: '8px',
        backgroundColor: '#EAF6FF',
        color: ' #1AB4FF',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    fetchButton: {
        position: 'absolute',
        marginTop: '0.75rem',
        marginLeft: '22rem',
        width: '7rem',
        height: '2.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        background: '#1AB4FF',
        transition: 'all 0.2s ease-in-out',
    },
    fetchButtonHover: {
        background: '#1398D5',
    },
    fetchButtonActive: {
        background: '#0F7CBF',
        transform: 'scale(0.95)',
    },
    radioItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        cursor: 'pointer',
    },
    button: {
        width: '10rem',
        height: '5rem',
        padding: '8px 16px',
        fontSize: '1rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        background: 'transparent',
        color: '#1AB4FF',
        marginLeft: '6rem',
    },
    fileInput: {
        marginLeft: '8rem',
        width: '9rem',
        height: '5.5rem',
        display:'none'
    },
    submitPopup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '2rem',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#1AB4FF',
    },
    submitButton: {
        width: '10rem',
        height: '3rem',
        fontSize: '1rem',
        cursor: 'pointer',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        background: '#1AB4FF',
    },
    loadingContainer: {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        zIndex: '2'
    },
    loadingText: {
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    loadingCircle: {
        width: '20px',
        height: '20px',
        background: 'rgb(44, 182, 247)',
        borderRadius: '100%',
        display: 'inline-block',
    },
    mask: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 998
    },
    subViewContainer: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        animation: 'popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
    },
    subViewContent: {
        background: 'white',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        minWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    backButton: {
        alignSelf: 'flex-start',
        background: 'none',
        border: 'none',
        color: '#1AB4FF',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '0.5rem 1rem',
        transition: 'all 0.2s ease',
    },
    subOption: {
        padding: '1rem 2rem',
        borderRadius: '30px',
        border: 'none',
        background: 'linear-gradient(145deg, #1AB4FF, #1398D5)',
        color: 'white',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    titleInput: {
        flex: 1,
        padding: '0.8rem 1.2rem',
        borderRadius: '25px',
        border: '2px solid #1AB4FF',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    searchButton: {
        padding: '0.8rem 2rem',
        borderRadius: '25px',
        border: 'none',
        background: '#1AB4FF',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    listViewContent: {
        background: 'white',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        width: '500px',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    listTitle: {
        color: '#1AB4FF',
        textAlign: 'center',
        margin: '0'
    },
    titleList: {
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        border: '2px solid #EAF6FF',
        borderRadius: '10px',
    },
    listItem: {
        padding: '1rem',
        margin: '0.5rem 0',
        background: ' #F5FBFF',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    }
}