import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";

const CaptainRidePopUp = ({
	setCaptainRidePopupPanel,
	setCaptainRideConfirmPanel,
}) => {
	return (
		<div>
			<h5
				className=" w-full text-center absolute top-0 left-0 text-2xl text-gray-500 bg-yellow-200 border-[1px]  rounded-t-2xl"
				onClick={() => setCaptainRidePopupPanel(false)}
			>
				⊻
			</h5>
			<h3 className="text-2xl font-semibold mt-10 mb-5">
				New Ride Available!
			</h3>
			<div className="flex items-center justify-between p-3 bg-yellow-300 rounded-2xl">
				<div className="flex items-center gap-3">
					<img
						className="h-20 rounded-full object-cover"
						src="https://tse1.mm.bing.net/th/id/OIP._32M20QZ2_4OnsoFzIRfdAHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDethttps://tse1.explicit.bing.net/th/id/OIP.qGBpIq62YcEy5XrrhdyuAwHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3Main&o=7&rm=3"
						alt=""
					/>
					<h2 className="text-xl font-medium">Anika Sultana</h2>
				</div>
				<h5 className="font-semibold">3.2 Km.</h5>
			</div>
			<div className="flex flex-col justify-between items-center gap-3">
				<div className="w-full flex flex-col gap-5 py-5">
					<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
						<IoLocation />
						<div>
							<h3 className="font-bold text-2xl">562/11-A</h3>
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
								17th Cross Rd, PWD Quarters, 1st SEctor, <br />{" "}
								HSR Layout, Bengaluru, Karnataka
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5 pb-2">
						<FaMoneyCheckAlt />
						<div>
							<h3 className="font-bold text-2xl">400৳</h3>
							<p className="text-sm text-gray-600 -mt-1">
								Cash Cash
							</p>
						</div>
					</div>
				</div>
				<button
					className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg active:border-2"
					onClick={() => {
						setCaptainRidePopupPanel(false);
						setCaptainRideConfirmPanel(true);
					}}
				>
					Accept!
				</button>
				<button
					className="w-full bg-red-400 text-white font-semibold p-2 rounded-lg active:border-2"
					onClick={() => setCaptainRidePopupPanel(false)}
				>
					Ignore!
				</button>
			</div>
		</div>
	);
};

export default CaptainRidePopUp;
