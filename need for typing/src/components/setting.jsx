import styled from 'styled-components';


const RangeInput = styled.input`
    width: 20rem;
    height: 10px;
    appearance: none;
    background-color: ${props => props.trackColor};
    border-radius: 5px;
    cursor: pointer;

    &::-moz-range-track {
        height: 15px;
        border-radius: 5px;
        background-color: ${props => props.trackColor};
    }

    &::-moz-range-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        background-color: ${props => props.thumbColor};
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    &::-webkit-slider-runnable-track {
        height: 15px;
        border-radius: 5px;
        background-color: ${props => props.trackColor2};
    }

    &::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        background-color: ${props => props.thumbColor};
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    &::-ms-track {
        height: 15px;
        border-radius: 5px;
        background-color: ${props => props.trackColor2};
        border-color: transparent;
        color: transparent;
        width: 100%;
    }

    &::-ms-thumb {
        width: 15px;
        height: 15px;
        background-color: ${props => props.thumbColor};
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s;
    }
`;

export default function Setting({ path, src, ReturnComponent, backgroundColor, trackColor, thumbColor }) {

    return (
        <>
            <img 
                src={src}
                alt="设置页面"
                style={{ ...styles.backgroundImage, backgroundColor: backgroundColor}}
            />
            
            <ReturnComponent path={path} />

            <div style={{
                ...styles.location,
                top: '10%',
                color: thumbColor,
            }}>
                <h1>赛车模式</h1>
                <div style={styles.spacing}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: '#fff' }}>
                        <path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z"></path>
                    </svg>
                    <label>背景音乐</label>
                    <RangeInput type="range" trackColor={trackColor} thumbColor={thumbColor} />
                </div>
                <div style={styles.spacing}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: '#fff' }}>
                        <path d="M143.36 737.28a81.92 81.92 0 0 1-81.92-81.92V368.64a81.92 81.92 0 0 1 81.92-81.92h163.84l171.6224-148.74624A81.92 81.92 0 0 1 614.4 199.8848v624.2304a81.92 81.92 0 0 1-135.5776 61.91104L307.2 737.28H143.36z m684.83072-515.4816A358.07232 358.07232 0 0 1 962.56 501.76a358.07232 358.07232 0 0 1-134.36928 279.9616 30.72 30.72 0 0 1-38.46144-47.9232 296.63232 296.63232 0 0 0 111.4112-232.0384c0-91.40224-41.472-175.9232-111.4112-232.0384a30.72 30.72 0 1 1 38.46144-47.9232z m-114.9952 121.18016C772.7104 382.09536 808.96 444.14976 808.96 512c0 67.85024-36.2496 129.90464-95.76448 169.02144a30.72 30.72 0 1 1-33.75104-51.32288C722.3296 601.4976 747.52 558.32576 747.52 512s-25.21088-89.51808-68.07552-117.69856a30.72 30.72 0 1 1 33.75104-51.32288z" ></path>
                    </svg>
                    <label>赛车声音</label>
                    <RangeInput type="range" trackColor={trackColor} thumbColor={thumbColor} />
                </div>
            </div>

            <div style={{
                ...styles.location,
                top: '50%',
                color: thumbColor,
            }}>
                <h1>音游模式</h1>
                <div style={styles.spacing}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: '#fff' }}>
                        <path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" ></path>
                    </svg>
                    <label>背景音乐</label>
                    <RangeInput type="range" trackColor={trackColor} thumbColor={thumbColor} />
                </div>

                <div style={styles.spacing}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: '#fff' }}>
                        <path d="M130.264557 870.035707a122.453333 160 68.891 1 0 298.527032-115.245873 122.453333 160 68.891 1 0-298.527032 115.245873Z" fill="#fff" opacity=".99" ></path>
                        <path d="M591.0825 774.046673a122.453333 160 68.891 1 0 298.527032-115.245872 122.453333 160 68.891 1 0-298.527032 115.245872Z" fill="#fff" opacity=".99" ></path>
                        <path d="M783.786667 98.56l-355.413334 113.066667A86.4 86.4 0 0 0 366.933333 294.4v495.786667h68.266667V388.266667c0-8.106667 5.12-15.36 13.226667-17.493334l355.84-113.493333c1.706667-0.426667 3.413333-0.853333 5.12-0.853333 8.96 0 18.346667 7.253333 18.346666 18.346666v418.133334h68.266667v-512c0-58.026667-56.32-99.413333-112.213333-82.346667z" fill="#fff" opacity=".99"></path>
                    </svg>
                    <label>打击音效</label>
                    <RangeInput type="range" trackColor={trackColor} thumbColor={thumbColor} />
                </div>
            </div>
        </>
    );
}

const styles = {
    backgroundImage: {
        position: 'absolute',
        width: '79rem',
        height: '40rem',
        zIndex: '-1',
    },
    location: {
        position: 'absolute',
        left: '3rem',
        color: '#D7418E',
    },
    spacing: {
        marginLeft: '1rem',
        marginBottom: '1rem',
    },
};
