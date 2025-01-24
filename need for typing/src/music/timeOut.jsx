

export default function TimeOut({ onResume, onExit }) {
    return (
        <div style={styles.timeOutOverlay}>
            <div style={styles.background}>
                <p style={styles.text}>游戏暂停</p>
                <div style={styles.container}>
                    <button style={styles.btn} onClick={onResume}>继续游戏</button>
                    <button style={styles.btn} onClick={onExit}>退出游戏</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    timeOutOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:'1'
    },
    background: {
        backgroundColor: '#FFA2B6',
        padding: '2rem',
        border:'4px solid #fff',
        borderRadius: '10px',
        textAlign: 'center',
    },
    text: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#66C7FF',
    },
    container: {
        marginTop: '20px',
    },
    btn: {
        margin: '0 10px',
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#FFEDED',
        color: '#66C7FF',
        border: 'none',
        borderRadius: '18px',
        cursor: 'pointer',
        outline: 'none',
    },
};
