import { useState } from "react";
import CaptainDetails from "../../components/CaptainDetails";
import CaptainRidePopUp from "../../components/CaptainRidePopUp";
import CaptainRideConfirm from "../../components/CaptainRideConfirm";

const CaptainHome = () => {
	const [captainRidePopupPanel, setCaptainRidePopupPanel] = useState(true);
	const [captainRideConfirmPanel, setCaptainRideConfirmPanel] = useState(false);

	const dynamicCaptainRidePopupPanelClass = captainRidePopupPanel? "translate-y-0" : "translate-y-full"
	const dynamicCaptainRideConfirmPanelClass = captainRideConfirmPanel? "translate-y-0" : "translate-y-full"

	return (
		<div className="h-screen relative">
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
					setCaptainRidePopupPanel={setCaptainRidePopupPanel} setCaptainRideConfirmPanel={setCaptainRideConfirmPanel}
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
