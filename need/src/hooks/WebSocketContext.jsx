import { createContext, useState, useContext,useCallback,useRef } from "react"

const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("disconnected") 

  const connect = useCallback((url) => {
    
    if (socket?.readyState === WebSocket.OPEN) {
      return socket
    }

    const newSocket = new WebSocket(url)

    newSocket.onopen = () => {
      console.log("WebSocket 连接成功")
      setStatus("connected")
    }

    newSocket.onerror = (error) => {
      console.error("WebSocket 错误:", error)
      setStatus("error")
    }

    setSocket(newSocket);
    return newSocket
  }, [])

  
  return (
    <WebSocketContext.Provider value={{ 
      socket,
      connect,
      status 
    }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => useContext(WebSocketContext)