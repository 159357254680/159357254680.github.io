import SelectPage from "../components/selectPage"
export default function MusicSelectPage(){

    return (
        <>
            <SelectPage 
                src={"/音游切换页面.png"} 
                top={'14rem'} 
                setting = "/MusicSetting" 
                path="/MusicSelectPage" 
                select={"/CarSelectPage"}/>
        </>
    )
}

