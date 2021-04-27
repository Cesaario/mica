import { io } from "socket.io-client";

const endpoint = "http://localhost:2003";
const Socket = io(endpoint, { transports: ["websocket", "polling"] });
let SocketStatus = false;

Socket.emit("ClientHandshake", true);
Socket.on("ServerHandshake", (event) => {
  console.log("Conectado! ", event);
  SocketStatus = true;
});

export { SocketStatus };
export default Socket;
