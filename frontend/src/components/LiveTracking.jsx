import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaLocationArrow } from "react-icons/fa";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const center = {
	lat: 23.8103,
	lng: 90.4125,
};

const LiveTracking = () => {
	const [currentPosition, setCurrentPosition] = useState(center);
	const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

	useEffect(() => {
		if (!navigator.geolocation) return undefined;

		const updatePosition = (position) => {
			setCurrentPosition({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		};

		navigator.geolocation.getCurrentPosition(updatePosition, () => {}, {
			maximumAge: 10000,
			timeout: 10000,
		});
		const watchId = navigator.geolocation.watchPosition(
			updatePosition,
			() => {},
			{ enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	if (!apiKey) {
		return (
			<div className="flex h-full w-full items-center justify-center bg-slate-100 p-6">
				<div className="w-full max-w-sm rounded-3xl border border-white bg-white/90 p-6 text-center shadow-xl backdrop-blur">
					<span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
						<FaLocationArrow aria-hidden="true" />
					</span>
					<h2 className="font-bold text-slate-950">Map is not set up</h2>
					<p className="mt-2 text-sm leading-6 text-slate-600">
						Add VITE_GOOGLE_MAP_API_KEY to your frontend environment
						to enable live maps.
					</p>
				</div>
			</div>
		);
	}

	return (
		<LoadScript googleMapsApiKey={apiKey}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentPosition}
				zoom={15}
				options={{
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false,
					clickableIcons: false,
					gestureHandling: "greedy",
				}}
			>
				<Marker position={currentPosition} />
			</GoogleMap>
		</LoadScript>
	);
};

export default LiveTracking;
