import { IoLocation } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { getSuggestions, getFare } from "../apis/rideApi";

const LocationSearchPanel = ({
	setVehiclePanelOpen,
	setPanelOpen,
	pickup,
	destination,
	setPickup,
	setDestination,
	activeField,
	setActiveField,
	setFare
}) => {
	const [suggestions, setSuggestions] = useState([]);
	const debounceRef = useRef(null);

	const token = localStorage.getItem("token") || "";

	useEffect(() => {
		const input = activeField === "pickup" ? pickup : destination;
		if (!input || input.trim().length < 2) {
			setSuggestions([]);
			return;
		}

		// debounce calls
		if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(async () => {
				try {
					const res = await getSuggestions(input, token);
					if (Array.isArray(res?.data)) setSuggestions(res.data);
					else setSuggestions([]);
				} catch (err) {
					console.error("Suggestion fetch error:", err?.response || err.message || err);
					setSuggestions([]);
				}
			}, 300);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [pickup, destination, activeField, token]);

	const handleSuggestionClick = (sug) => {
		if (activeField === "pickup") setPickup(`${sug.name}, ${sug.city ? sug.city + ", " : ""}${sug.country}`);
		else setDestination(`${sug.name}, ${sug.city ? sug.city + ", " : ""}${sug.country}`);
		setSuggestions([]);
		setActiveField?.(null);
	};

	const openVehiclePanel = async () => {
		setPanelOpen?.(false);
		setVehiclePanelOpen?.(true);

		const res = await getFare(pickup, destination);
		setFare(res.data)
	};

	return (
		<div>
			{/* Inputs are in `Home.jsx`. This panel only shows suggestions and Find Trip button. */}

			{/* suggestions list */}
			{Array.isArray(suggestions) && suggestions.length > 0 && (
				<div className="mb-3 bg-white border rounded-md p-2">
					{suggestions.map((sug, idx) => {
						console.log(sug);
						
						return (
							<div
								key={idx}
								onMouseDown={() => handleSuggestionClick(sug)}
								className="flex items-start gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded"
							>
								<span className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full flex-shrink-0">
									<IoLocation />
								</span>
								<span className="text-sm flex-1 break-words break-all whitespace-normal max-w-full">{`${sug.name}, ${sug.city ? sug.city + ", " : ""}${sug.country}`}</span>
							</div>
						);
					})}
				</div>
			)}

			{/* show helpful message while user is typing but no suggestions found */}
			{activeField && (activeField === "pickup" ? pickup : destination)?.trim().length >= 2 &&
				(!Array.isArray(suggestions) || suggestions.length === 0) && (
				<div className="mb-3 p-2 text-sm text-gray-500">No suggestions found.</div>
			)}

			<div className="mt-4">
				<button
					onClick={openVehiclePanel}
					className="w-full bg-blue-600 text-white py-2 rounded-2xl"
				>
					Find Trip
				</button>
			</div>
		</div>
	);
};

export default LocationSearchPanel;
