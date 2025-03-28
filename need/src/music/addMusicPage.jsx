import  { useState } from "react";
import axios from "axios";

export default  function AddMusicPage () {
    const storedToken = localStorage.getItem('token')

    const [uploadToken, setUploadToken] = useState(null); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const [uploadProgress, setUploadProgress] = useState(0); 
    const [title,setTitle] = useState('')
    const [id,setId] = useState('')

    
    
    async function getToken(){
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
                console.log(uploadtoken);
                setUploadToken(uploadtoken)
                alert('获取上传凭证成功')
            }
        } catch(err){
            console.log(err);
            alert('获取上传token失败')
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    }


    async function uploadFile() {
        if (!selectedFile) {
            alert("请先选择文件");
            return;
        }
        if (!uploadToken) {
            alert("请先获取上传凭证");
            return;
        }
        if(!title||!id){
            alert("请输入歌曲名和歌曲id")
            return
        }

        const formData = new FormData();
            formData.append("file", selectedFile); 
            formData.append("token", uploadToken); 
            formData.append("key", selectedFile.name); 
            formData.append("title", title);
            formData.append("id", id);

        try {
            const res = await axios.post(
                "https://upload-z2.qiniup.com", 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", 
                        'Authorization': `${uploadToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted); 
                    },
                }
            );

            console.log("上传成功:", res.data);
            alert("上传成功！");
            const key = res.data.key
            const cdnDomain = "https://mini-project.muxixyz.com"
            const fileUrl = `${cdnDomain}/${key}` 
            console.log("文件访问地址:", fileUrl);
        } catch (err) {
            console.error("上传失败:", err);
            alert("上传失败，请重试");
        }
    }

async function updataData(){
    try{
        const res = await axios.get(
            'http://123.56.118.201:8080/api/update_list_song',
            {
                headers: {
                    'Authorization': `${storedToken}`
                }
            }
        )
        const {message} = res.data
        if(message === "update list successfully"){
            console.log(message);
            alert('更新成功')
        }
    }   catch(err){
            alert('更新失败')
            console.log(err)
        }
}



    return (
        <div>
            <button onClick={getToken}>获取上传token</button>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>
            <button onClick={uploadFile}>上传文件</button>
            {uploadProgress > 0 && <p>上传进度: {uploadProgress}%</p>}
            <button onClick={updataData}>更新素材</button>
        </div>
    );


}