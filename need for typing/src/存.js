// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Chat Room</title>
//     <style>
//         body {
//             font-family: monospace;
//             margin: 0;
//             padding: 0;
//             background-color: #f9f9f9;
//             color: #333;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//         }

//         #chat-container {
//             display: flex;
//             flex-direction: column;
//             width: 400px;
//             height: 500px;
//             background-color: #fff;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }

//         #chat-header {
//             font-weight: bold;
//             padding: 10px;
//             background-color: #f0f0f0;
//             border-bottom: 1px solid #ddd;
//         }

//         #messages {
//             flex-grow: 1;
//             overflow-y: auto;
//             padding: 10px;
//             background-color: #fff;
//             word-wrap: break-word;
//         }

//         .message {
//             margin-bottom: 5px;
//         }

//         .message.self {
//             text-align: right;
//             color: #007bff;
//         }

//         .message.other {
//             color: #555;
//         }

//         #input-container {
//             display: flex;
//             padding: 10px;
//             gap: 5px;
//             border-top: 1px solid #ddd;
//             background-color: #f9f9f9;
//         }

//         #message-input {
//             flex-grow: 1;
//             padding: 5px;
//             border: 1px solid #ccc;
//             border-radius: 3px;
//             font-size: 14px;
//         }

//         #send-button {
//             padding: 5px 10px;
//             background-color: #007bff;
//             color: #fff;
//             border: none;
//             border-radius: 3px;
//             cursor: pointer;
//             font-size: 14px;
//         }

//         #send-button:hover {
//             background-color: #0056b3;
//         }

//         #send-button:active {
//             background-color: #003f7f;
//         }
//     </style>
// </head>
// <body>
//     <div id="chat-container">
//         <div id="chat-header">Chat Room: <span id="room-id"></span></div>
//         <div id="messages"></div>
//         <div id="input-container">
//             <input id="message-input" type="text" placeholder="Type your message..." />
//             <button id="send-button">Send</button>
//         </div>
//     </div>

//     <script>
//         const roomID = prompt("Enter Room ID:");
//         const username = prompt("Enter your username:");

//         if (!roomID || !username) {
//             alert("Room ID and Username are required!");
//             throw new Error("Missing Room ID or Username");
//         }

//         document.getElementById("room-id").textContent = roomID;

//         const ws = new WebSocket(`ws://localhost:1999/ws?room=${roomID}&username=${username}`);
//         const messagesDiv = document.getElementById("messages");
//         const messageInput = document.getElementById("message-input");
//         const sendButton = document.getElementById("send-button");

//         ws.onopen = () => {
//             console.log("Connected to WebSocket server");
//         };

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             const messageDiv = document.createElement("div");
//             messageDiv.classList.add("message");
//             messageDiv.classList.add(data.username === username ? "self" : "other");
//             messageDiv.textContent = `${data.username}: ${data.message}`;
//             messagesDiv.appendChild(messageDiv);
//             messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to latest message
//         };

//         ws.onclose = () => {
//             console.log("Disconnected from WebSocket server");
//         };

//         sendButton.addEventListener("click", sendMessage);
//         messageInput.addEventListener("keypress", (event) => {
//             if (event.key === "Enter") {
//                 sendMessage();
//             }
//         });

//         function sendMessage() {
//             const message = messageInput.value.trim();
//             if (message) {
//                 ws.send(message);
//                 messageInput.value = "";
//             }
//         }
//     </script>
// </body>
// </html>

