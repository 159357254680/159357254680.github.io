import PropTypes from 'prop-types';

export default function Avatar({ isPointed, setIsPointed, src, backgroundColor, btnColor,shadowColor }) {

    const styles = {
        background: {
            zIndex: '10',
            position: 'relative',
            top: '10rem',
            left: '15rem',
            width: '35rem',
            height: '20rem',
            boxShadow: '0 0 0 1rem rgba(255, 255, 255, 0.5)',
            backgroundColor: backgroundColor,
        },
        img: {
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            width: '2rem',
            height: '2rem',
            cursor: 'pointer',
        },
        btn: {
            position: 'absolute',
            zIndex: '2',
            width: '12rem',
            height: '3rem',
            outline: 'none',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: btnColor,
            color: 'white',
            fontFamily: 'YouSheBiaoTiHei',
            fontWeight: 'normal',
            lineHeight: 'normal',
            fontSize: '16px',
            letterSpacing: '0em',
            textAlign: 'center',
        },
        shadow: {
            position: 'absolute',
            width: '12rem',
            height: '3rem',
            outline: 'none',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: shadowColor,
        },
    };

    return (
        <div style={styles.background}>
            <img
                src={src}
                alt="返回键"
                style={styles.img}
                onClick={() => setIsPointed(0)}
            />
            <button
                style={{
                    ...styles.btn,
                    top: '4rem',
                    left: '11rem',
                    transform: isPointed === 6 ? 'translate(-0.2rem,0.2rem)' : 'translate(0,0)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setIsPointed(6)}
                onMouseLeave={() => setIsPointed(8)}
            >
                查看头像
            </button>
            <div
                style={{
                    ...styles.shadow,
                    top: '4.2rem',
                    left: '10.8rem',
                }}
            />

            <button
                style={{
                    ...styles.btn,
                    top: '10rem',
                    left: '11rem',
                    transform: isPointed === 7 ? 'translate(-0.2rem,0.2rem)' : 'translate(0,0)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setIsPointed(7)}
                onMouseLeave={() => setIsPointed(8)}
            >
                从本地上传头像
            </button>
            <div
                style={{
                    ...styles.shadow,
                    top: '10.2rem',
                    left: '10.8rem',
                }}
            />
        </div>
    );
}

Avatar.propTypes = {
    isPointed: PropTypes.number.isRequired,
    setIsPointed: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    btnColor: PropTypes.string,
    shadowColor: PropTypes.string,
};