import SelectPage from '../components/SelectPage'

export default function CarSelectPage() {

    return(
        <SelectPage 
            src={"赛车切换页面.png"} 
            top={'26rem'} 
            setting={"/CarSetting"} 
            path={"/CarMusicPage"}
            select={"/MusicSelectPage"}/>
    )

}