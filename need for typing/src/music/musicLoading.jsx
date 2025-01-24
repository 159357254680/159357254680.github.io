import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MusicLoading() {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    navigate("/MusicGamePage")
                    return 100;
                }
                return prev + 2;
            });
        }, 100); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            <img
                src="/用户纯粉.png"
                alt="设置页面"
                style={styles.backgroundImage}
            />

            <p style={styles.loadingHints}>Loading......</p>
            <img
                src="/正在加载.png"
                alt="正在加载"
                style={{
                    ...styles.loadingIcon,
                    left: `${-10 + (progress * 0.8)}%`,
                }}
            />
            <div style={styles.loadingContainer}>
                <div style={{ ...styles.loadingBar, width: `${progress}%` }}></div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        width: '78rem',
        height: '40rem',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '-1',
    },
    loadingHints:{
        position:'absolute',
        top:'20%',
        left:'40%',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: '64px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0em',
        color: '#971F4A',
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)', 
        width: '80%',
        height: '4rem', 
        background: '#f0f0f0',
        border:'10px solid #FFD0D0 ',
        borderRadius: '20px', 
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    loadingBar: {
        height: '100%',
        background: 'linear-gradient(90deg, #DDFAFF 0%,rgb(156, 231, 244) 100%)',
        transition: 'width 0.1s ease',
        borderRadius: '16px',
    },
    loadingIcon: {
        position: 'absolute',
        top:'22%',
        width: '30rem',
        height: '25rem',
        transition: 'left 0.1s ease', 
        zIndex: 1,
    },
};
