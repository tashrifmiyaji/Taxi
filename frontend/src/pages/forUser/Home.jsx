import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCarSide, FaSignOutAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRide from "../../components/ConfirmRide";
import LockingForADriver from "../../components/LockingForADriver";
import WaitingForDriver from "../../components/WaitingForDriver";
import { SocketContext } from "../../context/SocketContext";
import { UserDataContext } from "../../context/UserContext";
import LiveTracking from "../../components/LiveTracking";

const Home = () => {
	const [pickup, setPickup] = useState("");
	const [destination, setDestination] = useState("");
	const [activeField, setActiveField] = useState(null);
	const [searchOpen, setSearchOpen] = useState(false);
	const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
	const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
	const [lockingForADriverPanel, setLockingForADriverPanel] = useState(false);
	const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
	const [fare, setFare] = useState({});
	const [vehicleType, setVehicleType] = useState("");
	const [ride, setRide] = useState(null);

	const { socket } = useContext(SocketContext);
	const { user } = useContext(UserDataContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user?._id) return undefined;

		const joinUser = () => {
			socket.emit("join", { userType: "user", userId: user._id });
		};

		socket.on("connect", joinUser);
		if (socket.connected) joinUser();

		return () => socket.off("connect", joinUser);
	}, [user?._id, socket]);

	useEffect(() => {
		const handleRideConfirmed = (data) => {
			setRide(data);
			setLockingForADriverPanel(false);
			setWaitingForDriverPanel(true);
		};

		socket.on("ride-confirmed", handleRideConfirmed);
		return () => socket.off("ride-confirmed", handleRideConfirmed);
	}, [socket]);

	useEffect(() => {
		const handleRideStarted = (data) => {
			setWaitingForDriverPanel(false);
			navigate("/riding", { state: { data } });
		};

		socket.on("ride-started", handleRideStarted);
		return () => socket.off("ride-started", handleRideStarted);
	}, [socket, navigate]);

	return (
		<main className="relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-slate-100">
			<div className="absolute inset-0">
				<LiveTracking />
			</div>

			<header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
				<Link
					to="/home"
					className="app-brand pointer-events-auto rounded-2xl bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur"
				>
					<span className="app-brand-mark">
						<FaCarSide aria-hidden="true" />
					</span>
					Taxi
				</Link>
				<div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur">
					<div className="hidden text-right sm:block">
						<p className="text-xs text-slate-500">Rider</p>
						<p className="max-w-40 truncate text-sm font-bold text-slate-900">
							{user?.fullName?.firstName || "Your account"}
						</p>
					</div>
					<Link
						to="/user-logout"
						aria-label="Sign out"
						title="Sign out"
						className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-950"
					>
						<FaSignOutAlt aria-hidden="true" />
					</Link>
				</div>
			</header>

			<section className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-xl px-3 pb-3 sm:px-5 sm:pb-5 lg:inset-y-24 lg:left-6 lg:right-auto lg:mx-0 lg:w-[min(30rem,calc(100%-3rem))] lg:px-0 lg:pb-0">
				<div className="rounded-t-[1.75rem] border border-white/80 bg-white/95 p-5 shadow-2xl shadow-slate-900/20 backdrop-blur-xl sm:rounded-[1.75rem] sm:p-6">
					<div className="mb-5">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
							Your next trip
						</p>
						<h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
							Where are you headed?
						</h1>
					</div>

					<form
						className="relative space-y-3"
						onSubmit={(event) => event.preventDefault()}
					>
						<div className="pointer-events-none absolute bottom-5 left-[1.1rem] top-5 border-l border-dashed border-slate-300" />
						<label className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 focus-within:border-emerald-400 focus-within:bg-white">
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
								<IoLocationOutline aria-hidden="true" />
							</span>
							<span className="min-w-0 flex-1 py-2">
								<span className="block text-xs font-semibold text-slate-500">
									Pick-up
								</span>
								<input
									className="w-full bg-transparent py-0.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
									type="text"
									placeholder="Enter pick-up location"
									value={pickup}
									onChange={(event) => {
										setPickup(event.target.value);
										setActiveField("pickup");
										setSearchOpen(true);
									}}
									onFocus={() => {
										setActiveField("pickup");
										setSearchOpen(true);
									}}
								/>
							</span>
						</label>

						<label className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 focus-within:border-emerald-400 focus-within:bg-white">
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
								<IoLocationOutline aria-hidden="true" />
							</span>
							<span className="min-w-0 flex-1 py-2">
								<span className="block text-xs font-semibold text-slate-500">
									Destination
								</span>
								<input
									className="w-full bg-transparent py-0.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
									type="text"
									placeholder="Where to?"
									value={destination}
									onChange={(event) => {
										setDestination(event.target.value);
										setActiveField("destination");
										setSearchOpen(true);
									}}
									onFocus={() => {
										setActiveField("destination");
										setSearchOpen(true);
									}}
								/>
							</span>
						</label>
					</form>

					{searchOpen && (
						<div className="mt-3 border-t border-slate-100 pt-2">
							<LocationSearchPanel
								setVehiclePanelOpen={setVehiclePanelOpen}
								setPanelOpen={setSearchOpen}
								pickup={pickup}
								destination={destination}
								setPickup={setPickup}
								setDestination={setDestination}
								activeField={activeField}
								setActiveField={setActiveField}
								setFare={setFare}
							/>
						</div>
					)}
					{!searchOpen && (
						<button
							type="button"
							onClick={() => {
								setActiveField("pickup");
								setSearchOpen(true);
							}}
							className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
						>
							Plan a ride
						</button>
					)}
				</div>
				<p className="hidden px-2 pt-3 text-xs text-slate-500 lg:block">
					Choose a pick-up and destination to see ride options.
				</p>
			</section>

			{vehiclePanelOpen && (
				<div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
					<div
						className="ride-sheet relative w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
						role="dialog"
						aria-modal="true"
						aria-labelledby="vehicle-panel-title"
					>
						<VehiclePanel
							setVehiclePanelOpen={setVehiclePanelOpen}
							setConfirmRidePanelOpen={setConfirmRidePanelOpen}
							fare={fare}
							setVehicleType={setVehicleType}
						/>
					</div>
				</div>
			)}

			{confirmRidePanelOpen && (
				<div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
					<div
						className="ride-sheet relative w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
						role="dialog"
						aria-modal="true"
						aria-labelledby="confirm-ride-title"
					>
						<ConfirmRide
							setConfirmRidePanelOpen={setConfirmRidePanelOpen}
							setLockingForADriverPanel={setLockingForADriverPanel}
							setVehiclePanelOpen={setVehiclePanelOpen}
							fare={fare}
							vehicleType={vehicleType}
							destination={destination}
							pickup={pickup}
						/>
					</div>
				</div>
			)}

			{lockingForADriverPanel && (
				<div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
					<div
						className="ride-sheet relative w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
						role="dialog"
						aria-modal="true"
						aria-labelledby="matching-title"
					>
						<LockingForADriver
							setLockingForADriverPanel={setLockingForADriverPanel}
							destination={destination}
							pickup={pickup}
							fare={fare}
							vehicleType={vehicleType}
						/>
					</div>
				</div>
			)}

			{waitingForDriverPanel && (
				<div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
					<div
						className="ride-sheet relative w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
						role="dialog"
						aria-modal="true"
						aria-labelledby="captain-confirmed-title"
					>
						<WaitingForDriver
							setWaitingForDriverPanel={setWaitingForDriverPanel}
							ride={ride}
						/>
					</div>
				</div>
			)}
		</main>
	);
};

export default Home;
