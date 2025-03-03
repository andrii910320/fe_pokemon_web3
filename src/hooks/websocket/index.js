import { useEffect, useState } from "react";

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => console.log("WebSocket підключено");
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
      setLastMessage(JSON.parse(event.data));
    };
    ws.onclose = () => console.log("WebSocket закрито");

    setSocket(ws);
    return () => ws.close();
  }, [url]);

  const sendMessage = (msg) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  };

  return { messages, lastMessage, sendMessage };
};

export default useWebSocket;
