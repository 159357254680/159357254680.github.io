import { BrowserRouter,Routes,Route } from "react-router-dom"


import Home from "./components/home"
import UserLogin from "./components/userLogin"
import UserRegister from "./components/userRegister"

import MusicSetting from './music/musicSetting'
import UserInterfaceCar from "./car/userInterfaceCar"
import UserInterfaceMusic from "./music/userInterfaceMusic"
import MusicSelectPage from './music/musicSelectPage'  
import MusicMainPage from './music/musicMainPage'
import SelectMusic from './music/selectMusic'
import MusicLoading from "./music/musicLoading"
import MusicGamePage from './music/musicGamePage'
import SettlementPage from './music/settlementPage'
import Ruler from './music/ruler'
import Ranking from './music/ranking'

import CarSelectPage from './car/carSelectPage'
import CarSetting from './car/carSetting'
import CarMainPage from'./car/carMainPage'
import CarGamePage from "./car/carGamePage"
import CarRuler from './car/carRuler'
import CarQuestionEdit from './car/carQuestionEdit'



import MultiplayerMode from "./components/multiplayerMode"
import Avatar from './components/avatar'
import PageNotFound from "./components/pageNotFound"

import Test from './test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/a" element={<Home />}></Route>
        <Route path="/UserLogin" element={<UserLogin />}></Route>
        <Route path='/UserInterfaceCar' element={<UserInterfaceCar />}></Route>
        <Route path='/UserInterfaceMusic' element={<UserInterfaceMusic />}></Route>
        <Route path="/MusicSetting" element={<MusicSetting/>}></Route>
        <Route path="/MusicSelectPage" element={<MusicSelectPage />}></Route>
        <Route path="/MusicMainPage" element={<MusicMainPage />}></Route>
        <Route path="/SelectMusic" element={<SelectMusic />}></Route>
        <Route path="/MultiplayerMode" element={<MultiplayerMode/>}></Route>
        <Route path="/MusicLoading" element={<MusicLoading />}></Route>
        <Route path="/MusicGamePage" element={<MusicGamePage />}></Route>
        <Route path="/Ranking" element={<Ranking />}></Route>
        <Route path="/Ruler" element={<Ruler />}></Route>
        <Route path="/Avatar" element={<Avatar />}></Route>
        <Route path="/UserRegister" element={<UserRegister />}></Route>
        <Route path="/PageNotFound" element={<PageNotFound />}></Route>
        <Route path="SettlementPage" element={<SettlementPage />}></Route>

        <Route path="/CarSelectPage" element={<CarSelectPage />}></Route>
        <Route path="/CarSetting" element={<CarSetting />}></Route>
        <Route path="/" element={<CarMainPage />}></Route>
        <Route path="/CarGamePage" element={<CarGamePage />}></Route>
        <Route path="/CarRuler" element={<CarRuler />}></Route>
        <Route path="/CarQuestionEdit" element={<CarQuestionEdit />}></Route>


        <Route path="/a" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
