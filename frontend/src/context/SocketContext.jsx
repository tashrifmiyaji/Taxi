import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL);

export const SocketProvider = ({ children }) => {
	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to server");
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from server");
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, []);

	const sendMessage = (eventName, message) => {
		socket.emit(eventName, message);
	};

	const receiveMessage = (eventName, callback) => {
		socket.on(eventName, callback);
	};

	return (
		<SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
			{children}
		</SocketContext.Provider>
	);
};
