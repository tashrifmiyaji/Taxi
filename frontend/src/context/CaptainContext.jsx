import { useState, createContext, useContext } from "react";

const CaptainDataContext = createContext();

export const useCaptainContext = () => {
	return useContext(CaptainDataContext);
};

const CaptainContext = ({ children }) => {
	const [captain, setCaptain] = useState({});

	return (
		<CaptainDataContext.Provider value={{ captain, setCaptain }}>
			{children}
		</CaptainDataContext.Provider>
	);
};

export default CaptainContext;
