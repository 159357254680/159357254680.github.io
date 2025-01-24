import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeOut from './timeOut';

export default function MusicGamePage() {
    const [notes, setNotes] = useState([]);
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [isEnergyLocked, setIsEnergyLocked] = useState(false);
    const [outerCircleEffect, setOuterCircleEffect] = useState(false);
    const [showTimeOut, setShowTimeOut] = useState(false);  
    const navigate = useNavigate();

    const feedbackTimeoutRef = useRef(null);
    const gameIntervalRef = useRef(null);  
    const audioRef = useRef(null); 
    const bpm = 120;  
    const beatInterval = 60 / bpm; 

    const CIRCLE_CENTER = 20;
    const CIRCLE_RADIUS = 10;

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

    useEffect(() => {
        if (!isPlaying || !audioRef.current) return;

        const audio = audioRef.current;
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause(); 
        }

        const generateNote = () => {
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            setNotes((prevNotes) => [
                ...prevNotes,
                { letter: randomLetter, x: 100, y: 50, status: 'active' },
            ]);
        };

        const startGeneratingNotes = () => {
            gameIntervalRef.current = setInterval(generateNote, Math.max(beatInterval * 1000, 500));
        };

        startGeneratingNotes();

        const moveInterval = setInterval(() => {
            const adjustedSpeed = 0.2 + Math.sin(audio.currentTime / 5) * 0.1;
            setNotes((prevNotes) =>
                prevNotes
                    .map((note) => ({ ...note, x: Math.max(note.x - adjustedSpeed, 0.1) })) 
                    .filter((note) => note.x > 12)  
            );
        }, beatInterval / 20);

        return () => {
            clearInterval(gameIntervalRef.current);
            clearInterval(moveInterval);
            audio.pause();
        };
    }, [isPlaying]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsPlaying(!isPlaying);  
                setShowTimeOut(!showTimeOut); 
            }

            if (!isPlaying) return;

            const key = e.key.toUpperCase();
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
                                setEnergy((prev) => Math.min(100, prev + 5));
                            } else {
                                setFeedback('false');
                                setEnergy((prev) => Math.max(0, prev - 5));
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
            <img src="" alt="暂时无法显示" style={styles.avatar} />
            <div style={styles.information}>
                <p style={{ ...styles.p, fontSize: '24px' }}>Cypher</p>
                <p style={{ ...styles.p, fontSize: '18px' }}>id:114514</p>
            </div>

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
            <div style={styles.energyBarContainer}>
                <div style={{ ...styles.energyBar, width: `${energy}%` }}></div>
            </div>
            {feedback && <div style={styles.feedback}>{feedback}</div>}

            {showTimeOut && <TimeOut onResume={() => { setIsPlaying(true); setShowTimeOut(false); }} onExit={() => navigate("/SelectMusic")} />}
        </div>
    );
}

const styles = {
    background: {
        width: '78rem',
        height: '40rem',
        backgroundImage: 'url(/单人音游界面.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        zIndex: '-1'
    },
    avatar: {
        position: 'absolute',
        top: '1.8rem',
        left: '2.8rem',
        display: 'block',
        width: '5rem',
        height: '4rem',
        borderRadius: '50%',
        zIndex: '1'
    },
    information: {
        position: 'absolute',
        top: '1.5rem',
        left: '10rem',
        width: '16rem',
        height: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gameArea: {
        position: 'absolute',
        top: '11rem',
        width: '78rem',
        height: '10rem',
        backgroundColor: 'transparent',
        marginTop: '20px',
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
        width: '3rem',   
        height: '3rem',  
        borderRadius: '50%',
        backgroundColor: '#FFEDED', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        fontSize: '24px',
        color: '#B3E3FF',
    },
    energyBarContainer: {
        position: 'absolute',
        top: '10rem',
        right: '0.5rem',
        width: '70%',
        height: '20px',
        backgroundColor: '#ddd',
        border: '6px solid white',
        borderRadius: '10px',
    },
    energyBar: {
        height: '100%',
        backgroundColor: ' #32CD32',
        borderRadius: '10px',
    },
    feedback: {
        position: 'absolute',
        left: '25%',
        top: '25%',
        transform: 'translate(-50%, -50%)',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        animation: 'fade 0.5s',
    },
    p: {
        margin: '0',
        paddingLeft: '16px',
        alignItems: 'center',
        fontFamily: 'YouSheBiaoTiHei',
        fontWeight: 'normal',
        letterSpacing: '0em',
        color: '#FFFFFF',
    },
    people: {
        position: 'absolute',
        left: '35rem',
        top: '22.5rem',
        width: '20rem',
        height: '15rem',
    }
};
