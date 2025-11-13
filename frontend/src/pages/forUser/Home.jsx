import { useState } from "react";
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRide from "../../components/ConfirmRide";
import LockingForADriver from "../../components/LockingForADriver";
import WaitingForDriver from "../../components/WaitingForDriver";

const Home = () => {
	const [pickup, setPickup] = useState("");
	const [destination, setDestination] = useState("");
	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
	const [confirmRidePanelOpen, SetConfirmRidePanelOpen] = useState(false);
	const [lockingForADriverPanel, setLockingForADriverPanel] = useState(false);
	const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

	// for vehiclePanel
	let dynamicVehiclePanelClasses;
	if (vehiclePanelOpen) {
		dynamicVehiclePanelClasses = "translate-y-[0%]";
	} else {
		dynamicVehiclePanelClasses = "translate-y-[100%]";
	}

	// for confirm Ride Panel
	let dynamicConfirmRidePanelClasses;
	if (confirmRidePanelOpen) {
		dynamicConfirmRidePanelClasses = "translate-y-[0%]";
	} else {
		dynamicConfirmRidePanelClasses = "translate-y-[100%]";
	}

	// for Locking For A Driver
	let dynamicLockingForADriver;
	if (lockingForADriverPanel) {
		dynamicLockingForADriver = "translate-y-[0%]";
	} else {
		dynamicLockingForADriver = "translate-y-[100%]";
	}

	// Waiting For Driver
	let dynamicWaitingForDriverPanelClass;
	if (waitingForDriverPanel) {
		dynamicWaitingForDriverPanelClass = "translate-y-[0%]";
	} else {
		dynamicWaitingForDriverPanelClass = "translate-y-[100%]";
	}

	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<div className="h-screen relative overflow-hidden">
			<div className="logo absolute">Taxi</div>
			<div className="h-screen w-screen">
				{/* img for temporary use */}
				<img
					className="h-full w-full object-cover"
					src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
				/>
			</div>
			<div className="flex flex-col justify-end absolute top-0 w-full h-screen">
				<div className="h-[30%] p-5 bg-white relative rounded-t-3xl border-t-2">
					<h5
						className={`absolute right-10 font-bold ${
							panelOpen ? "" : "hidden"
						}`}
						onClick={() => setPanelOpen(false)}
					>
						⊻
					</h5>
					<h2 className="text-2xl font-semibold">Find a trip.</h2>
					<form onSubmit={(e) => submitHandler(e)}>
						<div className="absolute left-6 top-20 w-[5px] h-[5px] border-2"></div>
						<div className="absolute left-6 h-16 w-1 top-2/5 bg-gray-900 rounded-3xl"></div>
						<div className="absolute left-6 bottom-15 w-[5px] h-[5px] border-2"></div>
						<input
							className="bg-[#eeee] w-full px-8 py-2 mt-5 text-lg rounded-lg"
							type="text"
							placeholder="Add a pick-up location"
							value={pickup}
							onChange={(e) => setPickup(e.target.value)}
							onClick={(e) => setPanelOpen(true)}
						/>
						<input
							className="bg-[#eeee] w-full px-8 py-2 mt-3 text-lg rounded-lg"
							type="text"
							placeholder="Enter your destination"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							onClick={(e) => setPanelOpen(true)}
						/>
					</form>
				</div>

				{/* search panel */}
				<div
					className={`bg-white transition-all duration-500 ease-in-out ${
						panelOpen ? "h-[60%] px-5" : "h-0"
					}`}
				>
					<LocationSearchPanel
						setVehiclePanelOpen={setVehiclePanelOpen}
						setPanelOpen={setPanelOpen}
					/>
				</div>
			</div>

			{/* Vehicle Panel */}
			<div
				className={`fixed w-full z-10 bottom-0 bg-white px-3 py-6 rounded-t-2xl transition-all duration-500 ease-in-out ${dynamicVehiclePanelClasses}`}
			>
				<VehiclePanel
					setVehiclePanelOpen={setVehiclePanelOpen}
					SetConfirmRidePanelOpen={SetConfirmRidePanelOpen}
				/>
			</div>

			{/* Confirm Ride Panel */}
			<div
				className={`fixed w-full z-10 bottom-0 bg-white px-3 py-6 rounded-t-2xl transition-all duration-500 ease-in-out ${dynamicConfirmRidePanelClasses}`}
			>
				<ConfirmRide
					SetConfirmRidePanelOpen={SetConfirmRidePanelOpen}
					setLockingForADriverPanel={setLockingForADriverPanel}
				/>
			</div>

			{/* Locking For A Driver */}
			<div
				className={`fixed w-full z-10 bottom-0 bg-white px-3 py-6 rounded-t-2xl transition-all duration-500 ease-in-out ${dynamicLockingForADriver}`}
			>
				<LockingForADriver
					setLockingForADriverPanel={setLockingForADriverPanel}
				/>
			</div>

			{/* Waiting For Driver */}
			<div
				className={`fixed w-full z-10 bottom-0 bg-white px-3 py-6 rounded-t-2xl transition-all duration-500 ease-in-out ${dynamicWaitingForDriverPanelClass}`}
			>
				<WaitingForDriver
					setWaitingForDriverPanel={setWaitingForDriverPanel}
				/>
			</div>
		</div>
	);
};

export default Home;
