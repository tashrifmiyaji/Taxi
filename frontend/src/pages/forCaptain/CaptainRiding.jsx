import { useState } from "react";
//
import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";

const CaptainRiding = () => {
	const [finishRidingPanel, setFinishRidingPanel] = useState(false);
	const [finishedRide, setFinishedRide] = useState(false);

	let dynamicMapDivHeight;
	let dynamicFinishRidingDivHeight;
	let dynamicBtnClass;
	let dynamicPassenger;

	if (finishRidingPanel) {
		dynamicBtnClass = "";
		dynamicMapDivHeight = "h-0";
		dynamicFinishRidingDivHeight = "h-full";
		dynamicPassenger = "";
	} else {
		dynamicBtnClass = "rotate-180";
		dynamicMapDivHeight = "h-5/6";
		dynamicFinishRidingDivHeight = "h-1/6";
		dynamicPassenger = "hidden";
	}

	return (
		<div className="h-screen relative">
			<div className="logo absolute">Taxi-Driver</div>
			<div
				className={`transition-all duration-500 ease-in-out ${dynamicMapDivHeight}`}
			>
				<img
					className="h-full w-full object-cover"
					src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
				/>
			</div>
			<div
				className={`${dynamicFinishRidingDivHeight} transition-all duration-500 ease-in-out bg-yellow-400 relative rounded-t-2xl`}
			>
				<h5
					className={`w-full text-center absolute top-0 left-0 text-2xl text-gray-500 bg-yellow-200 border-[1px]  rounded-b-2xl ${dynamicBtnClass}`}
					onClick={() => setFinishRidingPanel(!finishRidingPanel)}
				>
					⊻
				</h5>
				{/* ... */}
				<div className={`${dynamicPassenger}`}>
					<h3 className="text-2xl font-semibold pt-12 mb-5 ">
						Finished this Ride!
					</h3>
					<div className="flex items-center justify-between p-3 bg-yellow-300 rounded-2xl">
						<div className="flex items-center gap-3">
							<img
								className="h-20 rounded-full object-cover"
								src="https://tse1.mm.bing.net/th/id/OIP._32M20QZ2_4OnsoFzIRfdAHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDethttps://tse1.explicit.bing.net/th/id/OIP.qGBpIq62YcEy5XrrhdyuAwHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3Main&o=7&rm=3"
								alt=""
							/>
							<h2 className="text-xl font-medium">
								Anika Sultana
							</h2>
						</div>
						<h5 className="font-semibold">3.2 Km.</h5>
					</div>
					<div className="flex flex-col justify-between items-center gap-3">
						<div className="w-full flex flex-col gap-5 py-4">
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<IoLocation />
								<div>
									<h3 className="font-bold text-2xl">
										562/11-A
									</h3>
									<p className="text-sm text-gray-600 -mt-1">
										Kankariya Talab, Bhopal
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<IoLocation />
								<div>
									<h3 className="font-bold text-2xl">
										Third Wave Coffee
									</h3>
									<p className="text-sm text-gray-600 -mt-1">
										17th Cross Rd, PWD Quarters, 1st SEctor,
										<br /> HSR Layout, Bengaluru, Karnataka
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<FaMoneyCheckAlt />
								<div>
									<h3 className="font-bold text-2xl">400৳</h3>
									<p className="text-sm text-gray-600 -mt-1">
										Cash Cash
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between pt-12 px-5">
					<h4 className="font-semibold">3.2 Km away</h4>
					<button
						disabled={finishedRide}
						className={` ${
							finishedRide
								? "bg-gray-600 cursor-not-allowed opacity-60"
								: "bg-green-600"
						} text-white w-[60%] font-semibold p-1 rounded-lg active:border-2`}
						onClick={() => {
							setFinishRidingPanel(true);
							setFinishedRide(true);
						}}
					>
						{finishedRide ? "Finished Ride." : "Finish Ride!"}
					</button>
				</div>
				<p className="text-center text-sm py-10 px-3 text-red-800">
					Click on FinishRide button if you have completed the
					payment!
				</p>
			</div>
		</div>
	);
};

export default CaptainRiding;
