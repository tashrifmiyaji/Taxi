import { useState, useEffect, useContext, useRef } from "react";
import CaptainDetails from "../../components/CaptainDetails";
import CaptainRidePopUp from "../../components/CaptainRidePopUp";
import CaptainRideConfirm from "../../components/CaptainRideConfirm";
import LocationPermissionPopup from "../../components/LocationPermissionPopup";

import { useCaptainContext } from "../../context/CaptainContext";
import { SocketContext } from "../../context/SocketContext";

const CaptainHome = () => {
	const { captain } = useCaptainContext();
	const { socket, sendMessage, receiveMessage } = useContext(SocketContext);

	useEffect(() => {
		if (captain?._id) {
			sendMessage("join", { userType: "captain", userId: captain._id });
		}
		return () => {
			// cleanup geolocation watch when component unmounts
			stopLocationUpdates();
		};
	}, [captain]);

	const watchIdRef = useRef(null);
	const intervalRef = useRef(null);

	const startLocationUpdates = () => {
		if (!navigator.geolocation || !captain?._id || !socket) return;

		// 1️⃣ watchPosition
		if (!watchIdRef.current) {
			watchIdRef.current = navigator.geolocation.watchPosition(
				(pos) => sendLocation(pos),
				(err) => console.error("watch error", err),
				{ enableHighAccuracy: true }
			);
		}

		// 2️⃣ force polling every 8 sec
		if (!intervalRef.current) {
			intervalRef.current = setInterval(() => {
				navigator.geolocation.getCurrentPosition(
					(pos) => sendLocation(pos),
					(err) => console.error("poll error", err),
					{ enableHighAccuracy: true }
				);
			}, 60000);
		}
	};

	const sendLocation = (position) => {
	socket.emit("update-captain-location", {
		userId: captain._id,
		location: {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		},
	});
};

	const stopLocationUpdates = () => {
	if (watchIdRef.current) {
		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;
	}
	if (intervalRef.current) {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	}
};
	const [captainRidePopupPanel, setCaptainRidePopupPanel] = useState(true);
	const [captainRideConfirmPanel, setCaptainRideConfirmPanel] =
		useState(false);

	const [showLocationPermission, setShowLocationPermission] = useState(true);

	const dynamicCaptainRidePopupPanelClass = captainRidePopupPanel
		? "translate-y-0"
		: "translate-y-full";
	const dynamicCaptainRideConfirmPanelClass = captainRideConfirmPanel
		? "translate-y-0"
		: "translate-y-full";

	return (
		<div className="h-screen relative">
			{/* Location Permission Popup	 */}
			<LocationPermissionPopup
				visible={showLocationPermission}
				onAllow={() => {
					startLocationUpdates();
					setShowLocationPermission(false);
				}}
				onClose={() => setShowLocationPermission(false)}
			/>

			<div className="logo absolute">Taxi-Driver</div>
			<div className="h-3/5">
				<img
					className="h-full w-full object-cover"
					src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
				/>
			</div>

			{/*Captain Details*/}
			<div className="h-2/5 p-6 bg-amber-100">
				<CaptainDetails />
			</div>

			{/* Captain Ride Popup*/}
			<div
				className={`fixed w-full z-10 bottom-0 bg-amber-100 px-3 py-6 rounded-t-2xl  transition-all duration-500 ease-in-out ${dynamicCaptainRidePopupPanelClass}`}
			>
				<CaptainRidePopUp
					setCaptainRidePopupPanel={setCaptainRidePopupPanel}
					setCaptainRideConfirmPanel={setCaptainRideConfirmPanel}
				/>
			</div>

			{/* Captain Ride Confirm*/}
			<div
				className={`fixed h-full w-full z-10 bottom-0 bg-amber-100 px-3 py-6 rounded-t-2xl  transition-all duration-500 ease-in-out ${dynamicCaptainRideConfirmPanelClass}`}
			>
				<CaptainRideConfirm
					setCaptainRideConfirmPanel={setCaptainRideConfirmPanel}
				/>
			</div>
		</div>
	);
};

export default CaptainHome;
