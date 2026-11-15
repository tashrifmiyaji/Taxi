import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

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

	useEffect(() => {
		if (!navigator.geolocation) return undefined;

		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setCurrentPosition({
				lat: latitude,
				lng: longitude,
			});
		});

		const watchId = navigator.geolocation.watchPosition((position) => {
			const { latitude, longitude } = position.coords;
			setCurrentPosition({
				lat: latitude,
				lng: longitude,
			});
		});

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentPosition}
				zoom={15}
			>
				<Marker position={currentPosition} />
			</GoogleMap>
		</LoadScript>
	);
};

export default LiveTracking;
