import { useState, useEffect, useRef } from 'react';

export default function MusicGamePage() {
    const [notes, setNotes] = useState([]);
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isEnergyLocked, setIsEnergyLocked] = useState(false);
    const [outerCircleEffect, setOuterCircleEffect] = useState(false);

    const feedbackTimeoutRef = useRef(null);
    const gameIntervalRef = useRef(null);  // 用来保存定时器ID
    const audioRef = useRef(null); // 引用音频元素
    const bpm = 120;  // 假设音乐的每分钟节拍数（BPM）
    const beatInterval = 60 / bpm; // 每拍的时间间隔（秒）

    const CIRCLE_CENTER = 20;
    const CIRCLE_RADIUS = 10;

    // 初始化音乐
    useEffect(() => {
        const audio = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/tribe-of-noise-pro/music/00046ed484682b33d3200651d856f2d0.mp3');
        audioRef.current = audio;

        const handleAudioEnd = () => {
            setIsPlaying(false);
            clearInterval(gameIntervalRef.current);
        };

        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, []);

    // 音符生成和移动的核心逻辑
    useEffect(() => {
        if (!isPlaying || !audioRef.current) return;

        const audio = audioRef.current;
        audio.play(); // 播放音乐

        const generateNote = () => {
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            setNotes((prevNotes) => [
                ...prevNotes,
                { letter: randomLetter, x: 100, y: 50, status: 'active' },
            ]);
        };

        // 动态调整音符生成间隔（例如基于音频的当前时间）
        const adjustNoteGenerationInterval = () => {
            const audioProgress = audio.currentTime; // 获取当前音频播放时间（秒）
            const adjustedBeatInterval = beatInterval * (1 + Math.sin(audioProgress / 10) * 0.2); // 根据音频进度动态调整生成节奏
            return adjustedBeatInterval * 1000;  // 返回毫秒
        };

        // 动态调整音符的移动速度
        const adjustNoteMovementSpeed = () => {
            const audioProgress = audio.currentTime; // 获取当前音频播放时间（秒）
            const adjustedSpeed = 0.1 + Math.sin(audioProgress / 5) * 1; // 基于音频的播放进度动态调整移动速度
            return adjustedSpeed;
        };

        // 生成音符的定时器
        const startGeneratingNotes = () => {
            const adjustedInterval = adjustNoteGenerationInterval(); // 获取动态的生成间隔
            gameIntervalRef.current = setInterval(generateNote, adjustedInterval);
        };

        // 初始生成音符
        startGeneratingNotes();

        // 动态调整音符的移动速度
        const moveInterval = setInterval(() => {
            const adjustedSpeed = adjustNoteMovementSpeed();
            setNotes((prevNotes) =>
                prevNotes
                    .map((note) => ({ ...note, x: note.x - adjustedSpeed })) // 使用动态的速度值
                    .filter((note) => note.x > 12)  // 移除屏幕外的音符
            );
        }, beatInterval / 20); // 根据节拍调整移动速度

        // 定时更新音符生成间隔
        const intervalAdjuster = setInterval(() => {
            const adjustedInterval = adjustNoteGenerationInterval();  // 获取新的生成间隔
            clearInterval(gameIntervalRef.current);  // 清除旧的定时器
            gameIntervalRef.current = setInterval(generateNote, adjustedInterval);  // 重新设置新的定时器
        }, 1000); // 每秒检查一次并调整生成间隔

        return () => {
            clearInterval(gameIntervalRef.current);
            clearInterval(moveInterval);
            clearInterval(intervalAdjuster);
        };
    }, [isPlaying]);

    // 处理键盘输入
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isPlaying) return;

            const key = event.key.toUpperCase();

            const activeNotesInCircle = notes.filter(
                (note) => note.status === 'active' && Math.abs(note.x - CIRCLE_CENTER) <= CIRCLE_RADIUS
            );

            if (activeNotesInCircle.length === 0) return;

            setNotes((prevNotes) =>
                prevNotes.map((note) => {
                    if (note.status === 'active' && Math.abs(note.x - CIRCLE_CENTER) <= CIRCLE_RADIUS) {
                        if (note.letter === key) {
                            const distance = Math.abs(note.x - CIRCLE_CENTER);

                            if (distance <= 3) {
                                setScore((prev) => prev + 20);
                                setFeedback('great');
                            } else {
                                setFeedback('false');
                                setEnergy((prev) => Math.max(0, prev - 3));
                            }

                            setOuterCircleEffect(true);
                            setTimeout(() => setOuterCircleEffect(false), 200);
                        } else {
                            setFeedback('false');
                            setEnergy((prev) => Math.max(0, prev - 3));
                        }

                        return { ...note, status: 'removed' };
                    }
                    return note;
                }).filter((note) => note.status !== 'removed')
            );

            clearTimeout(feedbackTimeoutRef.current);
            feedbackTimeoutRef.current = setTimeout(() => setFeedback(''), 500);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, notes]);

    return (
        <div style={styles.background}>
            <button
                style={styles.button}
                onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (!isPlaying) {
                        audioRef.current.play();
                    } else {
                        audioRef.current.pause();
                    }
                }}
            >
                {isPlaying ? '暂停' : '继续'}
            </button>

            <div style={styles.gameArea}>
                <div style={outerCircleEffect ? { ...styles.outerCircle, boxShadow: '0 0 20px 10px #FFD700' } : styles.outerCircle}></div>
                <div style={styles.innerCircle}></div>
                {notes.map((note, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.note,
                            left: `${note.x}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {note.letter}
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    background: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#FFA7BA',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
    },
    gameArea: {
        position: 'relative',
        width: '80%',
        height: '300px',
        backgroundColor: '#333',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    outerCircle: {
        position: 'absolute',
        left: '20%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        border: '4px solid #FFD700',
        transition: 'box-shadow 0.2s ease-in-out',
    },
    innerCircle: {
        position: 'absolute',
        left: '20%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        border: '4px solid #FFA500',
    },
    note: {
        position: 'absolute',
        fontSize: '24px',
        color: '#B3E3FF',
    },
};
