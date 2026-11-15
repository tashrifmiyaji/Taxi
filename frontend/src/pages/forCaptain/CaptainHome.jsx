import { useState, useEffect, useContext, useRef } from "react";
import CaptainDetails from "../../components/CaptainDetails";
import CaptainRidePopUp from "../../components/CaptainRidePopUp";
import CaptainRideConfirm from "../../components/CaptainRideConfirm";
import LocationPermissionPopup from "../../components/LocationPermissionPopup";

import { useCaptainContext } from "../../context/CaptainContext";
import { SocketContext } from "../../context/SocketContext";

const CaptainHome = () => {
	const [captainRidePopupPanel, setCaptainRidePopupPanel] = useState(false);
	const [captainRideConfirmPanel, setCaptainRideConfirmPanel] =
		useState(false);
	const [showLocationPermission, setShowLocationPermission] = useState(true);
	const [newRideData, setNewRideData] = useState(null);

	//
	const { captain } = useCaptainContext();
	const { socket } = useContext(SocketContext);
	const watchIdRef = useRef(null);

	useEffect(() => {
		if (!captain?._id) return undefined;

		const joinCaptain = () => {
			socket.emit("join", { userType: "captain", userId: captain._id });
			if (watchIdRef.current !== null && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						socket.emit("update-captain-location", {
							userId: captain._id,
							location: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							},
						});
					},
					(error) => console.error("location refresh error", error),
					{ enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
				);
			}
		};

		socket.on("connect", joinCaptain);
		if (socket.connected) joinCaptain();

		return () => {
			socket.off("connect", joinCaptain);
			if (watchIdRef.current !== null && navigator.geolocation) {
				navigator.geolocation.clearWatch(watchIdRef.current);
				watchIdRef.current = null;
			}
		};
	}, [captain?._id, socket]);

	// update location
	const startLocationUpdates = () => {
		if (!navigator.geolocation || !captain?._id || !socket) return;

		if (watchIdRef.current === null) {
			watchIdRef.current = navigator.geolocation.watchPosition(
				(pos) => sendLocation(pos),
				(err) => console.error("watch error", err),
				{
					enableHighAccuracy: true,
					maximumAge: 5000,
					timeout: 15000,
				}
			);
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

	// achieve new ride popup data
	useEffect(() => {
		const handleNewRide = (data) => {
			setNewRideData(data);
			setCaptainRidePopupPanel(true);
		};

		socket.on("new-ride", handleNewRide);

		return () => {
			socket.off("new-ride", handleNewRide);
		};
	}, [socket]);

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
					newRideData={newRideData}
				/>
			</div>

			{/* Captain Ride Confirm*/}
			<div
				className={`fixed h-full w-full z-10 bottom-0 bg-amber-100 px-3 py-6 rounded-t-2xl  transition-all duration-500 ease-in-out ${dynamicCaptainRideConfirmPanelClass}`}
			>
				<CaptainRideConfirm
					setCaptainRideConfirmPanel={setCaptainRideConfirmPanel}
					newRideData={newRideData}
				/>
			</div>
		</div>
	);
};

export default CaptainHome;
