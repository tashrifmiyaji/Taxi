import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCarSide, FaSignOutAlt } from "react-icons/fa";
import CaptainDetails from "../../components/CaptainDetails";
import CaptainRidePopUp from "../../components/CaptainRidePopUp";
import CaptainRideConfirm from "../../components/CaptainRideConfirm";
import LocationPermissionPopup from "../../components/LocationPermissionPopup";
import LiveTracking from "../../components/LiveTracking";
import { useCaptainContext } from "../../context/CaptainContext";
import { SocketContext } from "../../context/SocketContext";

const CaptainHome = () => {
	const [captainRidePopupPanel, setCaptainRidePopupPanel] = useState(false);
	const [captainRideConfirmPanel, setCaptainRideConfirmPanel] =
		useState(false);
	const [showLocationPermission, setShowLocationPermission] = useState(true);
	const [locationError, setLocationError] = useState("");
	const [isLocationEnabled, setIsLocationEnabled] = useState(false);
	const [newRideData, setNewRideData] = useState(null);
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
						setIsLocationEnabled(true);
						setLocationError("");
						socket.emit("update-captain-location", {
							userId: captain._id,
							location: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							},
						});
					},
					(error) => {
						setLocationError(error.message);
					},
					{
						enableHighAccuracy: true,
						maximumAge: 5000,
						timeout: 15000,
					}
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

	const startLocationUpdates = () => {
		if (!navigator.geolocation || !captain?._id || !socket) {
			setLocationError("Location access is not available on this device.");
			return;
		}

		if (watchIdRef.current !== null) return;
		watchIdRef.current = navigator.geolocation.watchPosition(
			(position) => {
				setIsLocationEnabled(true);
				setLocationError("");
				socket.emit("update-captain-location", {
					userId: captain._id,
					location: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					},
				});
			},
			(error) => {
				setIsLocationEnabled(false);
				setLocationError(error.message);
				if (watchIdRef.current !== null) {
					navigator.geolocation.clearWatch(watchIdRef.current);
					watchIdRef.current = null;
				}
			},
			{
				enableHighAccuracy: true,
				maximumAge: 5000,
				timeout: 15000,
			}
		);
	};

	useEffect(() => {
		const handleNewRide = (data) => {
			setNewRideData(data);
			setCaptainRidePopupPanel(true);
		};

		socket.on("new-ride", handleNewRide);
		return () => socket.off("new-ride", handleNewRide);
	}, [socket]);

	const captainName = [
		captain?.fullName?.firstName,
		captain?.fullName?.lastName,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<main className="relative min-h-[100dvh] overflow-hidden bg-slate-100">
			<div className="fixed inset-0">
				<LiveTracking />
			</div>

			<header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
				<Link
					to="/captain-home"
					className="app-brand pointer-events-auto rounded-2xl bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur"
				>
					<span className="app-brand-mark">
						<FaCarSide aria-hidden="true" />
					</span>
					Taxi Captain
				</Link>
				<div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white/95 p-2 shadow-lg shadow-slate-900/10 backdrop-blur">
					<span className="hidden max-w-40 truncate px-2 text-sm font-bold text-slate-800 sm:inline">
						{captainName || "Captain account"}
					</span>
					<Link
						to="/captain-logout"
						aria-label="Sign out"
						title="Sign out"
						className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-950"
					>
						<FaSignOutAlt aria-hidden="true" />
					</Link>
				</div>
			</header>

			<section className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-xl rounded-t-[1.75rem] border border-white bg-white/95 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl shadow-slate-900/20 backdrop-blur-xl sm:bottom-5 sm:rounded-[1.75rem] sm:p-6 lg:left-6 lg:right-auto lg:mx-0">
				<CaptainDetails isOnline={isLocationEnabled} />
				{!isLocationEnabled && !locationError && (
					<div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
						<span>Enable location to receive nearby ride requests.</span>
						<button
							type="button"
							onClick={() => setShowLocationPermission(true)}
							className="font-bold underline underline-offset-2"
						>
							Enable
						</button>
					</div>
				)}
				{locationError && (
					<div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
						<span>{locationError}</span>
						<button
							type="button"
							onClick={() => setShowLocationPermission(true)}
							className="font-bold underline underline-offset-2"
						>
							Try again
						</button>
					</div>
				)}
			</section>

			<LocationPermissionPopup
				visible={showLocationPermission}
				onAllow={() => {
					startLocationUpdates();
					if (navigator.geolocation) {
						setShowLocationPermission(false);
					}
				}}
				onClose={() => setShowLocationPermission(false)}
			/>

			{captainRidePopupPanel && (
				<div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4">
					<div
						className="ride-sheet relative w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
						role="dialog"
						aria-modal="true"
						aria-labelledby="new-ride-title"
					>
						<CaptainRidePopUp
							setCaptainRidePopupPanel={setCaptainRidePopupPanel}
							setCaptainRideConfirmPanel={
								setCaptainRideConfirmPanel
							}
							newRideData={newRideData}
						/>
					</div>
				</div>
			)}

			{captainRideConfirmPanel && (
				<div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4">
					<div
						className="ride-sheet relative w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
						role="dialog"
						aria-modal="true"
						aria-labelledby="start-ride-title"
					>
						<CaptainRideConfirm
							setCaptainRideConfirmPanel={
								setCaptainRideConfirmPanel
							}
							newRideData={newRideData}
						/>
					</div>
				</div>
			)}
		</main>
	);
};

export default CaptainHome;
