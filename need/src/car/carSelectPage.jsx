import SelectPage from '../components/SelectPage'

export default function CarSelectPage() {

    return(
        <SelectPage 
            src={"赛车切换页面.png"} 
            sTop={'26rem'} 
            bTop={'12rem'}
            setting={"/CarSetting"} 
            path={"/CarSelectPage"}
            select={"/MusicSelectPage"}
            main={"/CarMainPage"}
            userInterface={"/UserInterfaceCar"}/>
    )

}