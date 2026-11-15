import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { getFare, getSuggestions } from "../apis/rideApi";

const formatSuggestion = (suggestion) =>
	[
		suggestion.name,
		suggestion.city,
		suggestion.country,
	]
		.filter(Boolean)
		.join(", ");

const LocationSearchPanel = ({
	setVehiclePanelOpen,
	setPanelOpen,
	pickup,
	destination,
	setPickup,
	setDestination,
	activeField,
	setActiveField,
	setFare,
}) => {
	const [suggestions, setSuggestions] = useState([]);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
	const [isLoadingFare, setIsLoadingFare] = useState(false);
	const [error, setError] = useState("");
	const debounceRef = useRef(null);
	const requestRef = useRef(0);
	const token = localStorage.getItem("token") || "";
	const activeInput = activeField === "pickup" ? pickup : destination;
	const searchTerm = activeInput?.trim() || "";

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		const requestId = ++requestRef.current;

		if (!activeField || searchTerm.length < 2) {
			setSuggestions([]);
			setIsLoadingSuggestions(false);
			return undefined;
		}

		setIsLoadingSuggestions(true);
		setError("");
		debounceRef.current = setTimeout(async () => {
			try {
				const response = await getSuggestions(searchTerm, token);
				if (requestRef.current === requestId) {
					setSuggestions(
						Array.isArray(response.data) ? response.data : []
					);
				}
			} catch {
				if (requestRef.current === requestId) {
					setSuggestions([]);
					setError("Could not load suggestions. Please try again.");
				}
			} finally {
				if (requestRef.current === requestId) {
					setIsLoadingSuggestions(false);
				}
			}
		}, 300);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [activeField, searchTerm, token]);

	const handleSuggestionClick = (suggestion) => {
		const address = formatSuggestion(suggestion);
		if (!address) return;

		if (activeField === "pickup") setPickup(address);
		else setDestination(address);
		setSuggestions([]);
		setActiveField(null);
		setError("");
	};

	const openVehiclePanel = async () => {
		if (pickup.trim().length < 3 || destination.trim().length < 3) {
			setError("Enter both a pick-up and destination to continue.");
			return;
		}

		setError("");
		setIsLoadingFare(true);
		try {
			const response = await getFare(pickup, destination);
			setFare(response.data);
			setPanelOpen(false);
			setVehiclePanelOpen(true);
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"Could not calculate the fare. Check your locations and try again."
			);
		} finally {
			setIsLoadingFare(false);
		}
	};

	return (
		<div>
			{activeField && searchTerm.length >= 2 && (
				<div
					className="mb-3 max-h-52 overflow-y-auto"
					aria-live="polite"
				>
					{isLoadingSuggestions && (
						<p className="flex items-center gap-2 px-2 py-3 text-sm text-slate-500">
							<FaSpinner className="animate-spin" aria-hidden="true" />
							Searching nearby places...
						</p>
					)}
					{!isLoadingSuggestions &&
						suggestions.map((suggestion, index) => (
							<button
								key={`${suggestion.lat}-${suggestion.lon}-${index}`}
								type="button"
								onClick={() =>
									handleSuggestionClick(suggestion)
								}
								className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition hover:bg-slate-50"
							>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
									<IoLocationOutline aria-hidden="true" />
								</span>
								<span className="address-copy text-sm font-medium text-slate-700">
									{formatSuggestion(suggestion)}
								</span>
							</button>
						))}
					{!isLoadingSuggestions &&
						!error &&
						suggestions.length === 0 && (
							<p className="px-2 py-3 text-sm text-slate-500">
								No places found. Try a nearby area or landmark.
							</p>
						)}
				</div>
			)}

			{error && (
				<p
					role="alert"
					className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
				>
					{error}
				</p>
			)}

			<button
				type="button"
				onClick={openVehiclePanel}
				disabled={isLoadingFare}
				className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{isLoadingFare ? "Finding your fare..." : "See ride options"}
				{!isLoadingFare && (
					<FaArrowRight aria-hidden="true" className="text-sm" />
				)}
			</button>
		</div>
	);
};

export default LocationSearchPanel;
