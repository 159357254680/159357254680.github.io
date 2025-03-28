import { BrowserRouter,Routes,Route } from "react-router-dom"
import { TargetProvider } from "./hooks/TargetContext"
import { WebSocketProvider } from "./hooks/WebSocketContext"
import ErrorBoundary from "./hooks/errorBoundary"


import Home from "./components/home"
import UserLogin from "./components/userLogin"
import UserRegister from "./components/userRegister"
import Wait from "./components/wait"

import MusicSetting from './music/musicSetting'
import UserInterfaceMusic from "./music/userInterfaceMusic"
import MusicSelectPage from './music/musicSelectPage'  
import MusicMainPage from './music/musicMainPage'
import SelectMusic from './music/selectMusic'
import MusicLoading from "./music/musicLoading"
import MusicGamePage from './music/musicGamePage'
import MusicSettlementPage from './music/musicSettlementPage'
import Ruler from './music/ruler'
import Ranking from './music/ranking'

import CarSelectPage from './car/carSelectPage'
import CarSetting from './car/carSetting'
import CarMainPage from'./car/carMainPage'
import CarGamePage from "./car/carGamePage"
import CarRuler from './car/carRuler'
import CarQuestionEdit from './car/carQuestionEdit'
import CarSettlementPage from './car/carSettlementPage'
import UserInterfaceCar from "./car/userInterfaceCar"
import CarMultiplayPage from './car/carMultiplayerPage'
import CarSettlementPageTwo from "./car/carSettlementPageTwo"


import Avatar from './components/avatar'
import PageNotFound from "./components/pageNotFound"


import Connection from "./components/connection"
import ConnectionRoom from "./components/connectionRoom"


function App() {
  return (
    <ErrorBoundary>
    <TargetProvider>
      <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/UserLogin" element={<UserLogin />}></Route>
          <Route path="/UserRegister" element={<UserRegister />}></Route>
          <Route path="/PageNotFound" element={<PageNotFound />}></Route>
          <Route path="/Connection" element={<Connection />}></Route>
          <Route path='/ConnectionRoom' element={<ConnectionRoom />}></Route>
          <Route path="Wait" element={<Wait />}></Route>

          <Route path='/UserInterfaceMusic' element={<UserInterfaceMusic />}></Route>
          <Route path="/MusicSetting" element={<MusicSetting/>}></Route>
          <Route path="/MusicSelectPage" element={<MusicSelectPage />}></Route>
          <Route path="/MusicMainPage" element={<MusicMainPage />}></Route>
          <Route path="/SelectMusic" element={<SelectMusic />}></Route>
          <Route path="/MusicLoading" element={<MusicLoading />}></Route>
          <Route path="/MusicGamePage" element={<MusicGamePage />}></Route>
          <Route path="/Ranking" element={<Ranking />}></Route>
          <Route path="/Ruler" element={<Ruler />}></Route>
          <Route path="/Avatar" element={<Avatar />}></Route>
          <Route path="/MusicSettlementPage" element={<MusicSettlementPage />}></Route>

          <Route path="/CarSelectPage" element={<CarSelectPage />}></Route>
          <Route path="/CarSetting" element={<CarSetting />}></Route>
          <Route path="/CarMainPage" element={<CarMainPage />}></Route>
          <Route path="/CarGamePage" element={<CarGamePage />}></Route>
          <Route path="/CarQuestionEdit" element={<CarQuestionEdit />}></Route>
          <Route path="/CarRuler" element={<CarRuler />}></Route>
          <Route path="/CarSettlementPage" element={<CarSettlementPage />}></Route>
          <Route path='/UserInterfaceCar' element={<UserInterfaceCar />}></Route>
          <Route path="/CarMultiplayPage" element={<CarMultiplayPage />}></Route>
          <Route path="/CarSettlementPageTwo" element={<CarSettlementPageTwo />}></Route>

        </Routes>
      </BrowserRouter>
      </WebSocketProvider>
      </TargetProvider>
      </ErrorBoundary>
  )
}

export default App
