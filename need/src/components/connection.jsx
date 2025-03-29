import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarReturn from '../car/carReturn'


export default function Connection() {
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const createRoom = () => {
    navigate("/ConnectionRoom", { state: { isCreateRoom: true } });
    localStorage.setItem("role", "player1");
  };

  const joinRoom = () => {
    setShowJoinInput(true);
    localStorage.setItem("role", "player2");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && roomId.trim()) {
      localStorage.setItem("roomId", roomId);
      navigate("/ConnectionRoom", { state: { joinRoomId: roomId, isCreateRoom: false } });
    }
  };

  return (
    <>
        <style>
            {`
              @keyframes fadeIn {
                from { 
                  opacity: 0; 
                }
                to { 
                  opacity: 1; 
                }
              }

              @keyframes slideIn {
                from { 
                  opacity: 0; 
                }
                to {  
                  opacity: 1; 
                }
              }

              @keyframes pulse {
                0% { 
                  transform: scale(1);
                }
                50% { 
                  transform: scale(1.05); 
                }
                100% { 
                  transform: scale(1); 
                }
              }

              button:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
              }

              button:last-child:hover {
                box-shadow: 0 6px 20px rgba(78, 205, 196, 0.6);
              }    

              .input:focus{
                border: 2px solid rgb(101, 180, 249);
              }
            `}
        </style>

        <CarReturn path={"/CarMainPage"}/>



      <div style={styles.container}>
        <img 
          src="/联机房间.png"
          alt=""
          style={styles.backgroundImg}
        />

        <button
          style={{
            ...styles.btn,
            left: "15%",
            background: "linear-gradient(135deg, #ff6b6b, #ff8e8e)",
          }}
          onClick={createRoom}
        >创建房间</button>

      
        <button
          style={{
            ...styles.btn,
            left: "70%",
            background: "linear-gradient(135deg, #4ecdc4, #45b7af)",
          }}
          onClick={joinRoom}
        >加入房间</button>

      
        {(showJoinInput) && (
          <>
            <div 
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                zIndex: 10,
                animation: "fadeIn 0.3s ease-out"
              }}
              onClick={() => { setShowJoinInput(false); }}
            />
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "2rem",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              zIndex: 11,
              animation: "slideIn 0.4s ease-out"
            }}>
              <input
                type="text"
                placeholder={showJoinInput ? "输入要加入的房间ID" : "输入创建的房间ID"}
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="input"
                style={styles.input}
              />
              <p style={{ 
                marginTop: "1rem",
                color: "#666",
                textAlign: "center"
              }}>按Enter键{showJoinInput ? "加入" : "创建"}房间</p>
          </div>
        </>
        )}
      </div>
    </>
  );
}

const styles = {
  container:{
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  backgroundImg:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1
  },
  btn:{
    position: "absolute",
    top: "60%",
    transform: "translateX(-50%)",
    width: "200px",
    height:'60px',
    border: "4px solid #eee",
    borderRadius: "30px",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 1,
    animation: "pulse 2s infinite"
  },
  input:{
    width: "250px",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s ease"
  }
}