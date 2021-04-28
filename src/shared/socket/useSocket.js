import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const endpoint = "http://localhost:2003";


const useSocket = () => {
  const socketRef = useRef();
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const socket = io(endpoint);

    socket.on("connect", () => {
      setConectado(true);
    });

    socketRef.current = socket;
  }, []);

  return [conectado, socketRef.current];
};

export default useSocket;
