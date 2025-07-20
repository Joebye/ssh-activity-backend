import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { LoginEvent } from "../model/LoginEvent";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useSocketLoginEvents() {
  const [events, setEvents] = useState<LoginEvent[]>([]);
  console.log(events);
  

  useEffect(() => {
  const socket: Socket = io(API_BASE_URL);
    fetch(`${API_BASE_URL}/events/all`)
      .then((res) => res.json())
      .then((history) => setEvents(history.reverse())); 

    socket.on("login", (event: LoginEvent) => {
      setEvents((prev) => [event, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return events;
}
