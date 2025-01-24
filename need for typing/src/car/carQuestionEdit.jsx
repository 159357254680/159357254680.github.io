import { useState } from 'react';
import CarReturn from './carReturn';

export default function CarQuestionEdit() {
    const [selectedOption, setSelectedOption] = useState('option1');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log('文件已选择:', selectedFile.name);
        }
    };

    // 动态控制单选框样式
    const getRadioInputStyle = (option) => {
        return {
            width: '4rem', 
            height: '4rem',
            borderRadius: '50%',
            marginRight: '10px',
            appearance: 'none',
            backgroundColor: selectedOption === option ? '#4b97f7' : '#d3d3d3', // 选中时为蓝色
            border: '2px solid ' + (selectedOption === option ? '#4b97f7' : '#ccc'), // 边框颜色
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease', // 平滑过渡
        };
    };

    return (
        <div style={styles.container}>
            <img 
                src="/题库编辑.png"
                alt="编辑"
                style={styles.backgroundImage}
            />

            <CarReturn path={"/CarMainPage"}/>

            <div style={styles.radioGroup}>
                <div style={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="question" 
                        value="option1" 
                        checked={selectedOption === 'option1'} 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                        style={getRadioInputStyle('option1')}
                    />
                    <button style={styles.button}></button>
                </div>
                
                <div style={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="question" 
                        value="option2" 
                        checked={selectedOption === 'option2'} 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                        style={getRadioInputStyle('option2')}
                    />
                    <button 
                        style={styles.button} 
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                    </button>
                    <input 
                        id="fileInput"
                        type="file" 
                        onChange={handleFileChange} 
                        style={styles.fileInput}
                    />
                    {file && <span style={styles.fileName}>已选择文件: {file.name}</span>}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        width: '79rem',
        height: '40rem',
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
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        background: 'transparent',
        marginLeft: '6rem',
    },
    fileInput: {
        display: 'none', 
    },
    fileName: {
        fontSize: '1rem',
        marginLeft: '10px',
        color: '#333',
    },
};
