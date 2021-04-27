import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

const endpoint = "http://localhost:2003";

const useSocket = () => {
  const socketRef = useRef<Socket>();
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const socket = io(endpoint);

    socket.on("connect", () => {
      setConectado(true);
    });

    socketRef.current = socket;
  }, []);

  return [conectado, socketRef.current?.emit];
};

export default useSocket;
