import { useState,useRef,useEffect } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';

export default function Avatar({ isPointed, setIsPointed, src, backgroundColor, btnColor,shadowColor }) {
    const storedToken = localStorage.getItem('token')

    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '')
    const [uploadToken,setUploadToken] = useState(localStorage.getItem('uploadToken') || '')
    const fileInputRef = useRef(null)
    
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

    useEffect(() => {
        async function getUploadToken(){
            try{
                const res = await axios.get(
                    'http://123.56.118.201:8080/api/get_upload_token',
                    {
                        params:{token: storedToken},
                        headers: {
                            'Authorization': `${storedToken}`
                        }
                    }
                )
                const{message} = res.data
                if(message === "fetch upload token successfully"){
                    const uploadtoken =res.data.data.upload_token
                    setUploadToken(uploadtoken)
                }
            } catch(err){
                console.log(err);
            }
        }

        getUploadToken()
    })


    async function handleUploadAvatar(e){

        if (!uploadToken) {
            alert("上传异常");
            return;
        }

        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            
            reader.onloadend = () => {
                const avatarUrl = reader.result
                setAvatar(avatarUrl) 
                localStorage.setItem('avatar', avatarUrl) 
            };
            
            reader.readAsDataURL(file) 
        }

        const formData = new FormData()
            formData.append("file", file)
            formData.append("token", uploadToken)
            formData.append("key", file.name)

        try {
            const res = await axios.post(
                "https://upload-z2.qiniup.com", 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", 
                        'Authorization': `${uploadToken}`
                    },
                }
            );
            console.log("上传成功:", res.data);
            alert("上传成功！");
            const key = res.data.key
            const cdnDomain = "https://mini-project.muxixyz.com"
            const fileUrl = `${cdnDomain}/${key}` 
            console.log("文件访问地址:", fileUrl)
        } catch (err) {
            console.error("上传失败:", err)
            alert("上传失败，请重试")
        }
    }

    

    function handleViewAvatar() {
        if (avatar) {
            const imgWindow = window.open('', '_blank', 'width=800,height=600');
            imgWindow.document.write('<div style="display: flexjustify-content: centeralign-items: centerheight: 100vhmargin: 0;"><img src="' + avatar + '" alt="Avatar" style="max-width: 100%max-height: 100%;" /></div>');
        } else {
            alert('当前没有上传头像');
        }
    }


    const triggerFileInput = () => {
        fileInputRef.current.click();
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
                onClick={handleViewAvatar}
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
                onClick={triggerFileInput}
            >
                从本地上传头像
            </button>

            <input
                ref={fileInputRef}
                type="file"
                style={{
                    display: 'none',
                }}
                accept="image/*"
                onChange={handleUploadAvatar}  
            />

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