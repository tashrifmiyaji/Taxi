import { useState } from "react";
import { useNavigate } from "react-router-dom";
//
import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { getStartedRide } from "../apis/rideApi";

const CaptainRideConfirm = ({ setCaptainRideConfirmPanel, newRideData }) => {
	const [OTP, setOTP] = useState("");

	//
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await getStartedRide(newRideData._id, OTP);
		if (res.status === 200) {
			setCaptainRideConfirmPanel(false);
			navigate("/captain-riding", { state: { newRideData } });
		}
	};

	const timeInSeconds = newRideData?.duration;
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);

	return (
		<div>
			<h5
				className=" w-full  text-center absolute top-0 left-0 text-2xl text-gray-500 bg-yellow-200 border-[1px]  rounded-t-2xl"
				onClick={() => setCaptainRideConfirmPanel(false)}
			>
				⊻
			</h5>
			<h3 className="text-2xl font-semibold mt-10 mb-5">
				Confirm this ride to Start.
			</h3>
			<div className="flex items-center justify-between p-3 bg-yellow-300 rounded-2xl">
				<div className="flex items-center gap-3">
					<img
						className="h-20 rounded-full object-cover"
						src="https://tse1.mm.bing.net/th/id/OIP._32M20QZ2_4OnsoFzIRfdAHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDethttps://tse1.explicit.bing.net/th/id/OIP.qGBpIq62YcEy5XrrhdyuAwHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3Main&o=7&rm=3"
						alt=""
					/>
					<h2 className="text-xl font-medium">{`${newRideData?.user.fullName.firstName} ${newRideData?.user.fullName.lastName}`}</h2>
				</div>
				<div className="text-right">
					<h5 className="font-semibold">
						{(newRideData?.distance / 1000).toFixed(2)} km.
					</h5>
					<h5 className="font-semibold">
						{hours > 0 ? `${hours}h ` : ""}
						{minutes}m
					</h5>
				</div>
			</div>
			<div className="flex flex-col justify-between items-center gap-3">
				<div className="w-full flex flex-col gap-5 py-4">
					<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
						<IoLocation />
						<div>
							<p>pickup</p>
							<h3 className="font-bold text-2xl">
								{newRideData?.pickup}
							</h3>
						</div>
					</div>
					<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
						<IoLocation />
						<div>
							<p>destination</p>
							<h3 className="font-bold text-2xl">
								{newRideData?.destination}
							</h3>
						</div>
					</div>
					<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
						<FaMoneyCheckAlt />
						<div>
							<h3 className="font-bold text-2xl">
								{newRideData?.fare}৳
							</h3>
							<p className="text-sm text-gray-600 -mt-1">
								Cash Cash
							</p>
						</div>
					</div>
				</div>
				<form
					className="flex flex-col items-center gap-3"
					onSubmit={(e) => handleSubmit(e)}
				>
					<input
						className="placeholder:text-center border-1 rounded-sm w-50 h-10"
						type="number"
						placeholder="Enter OTP"
						value={OTP}
						onChange={(e) => setOTP(e.target.value)}
					/>
					<button
						type="submit"
						className="text-center w-60 bg-green-600 text-white font-semibold p-2 rounded-lg active:border-2"
					>
						Confirm!
					</button>
					<button
						className="w-full bg-red-400 text-white font-semibold p-2 rounded-lg active:border-2"
						onClick={() => setCaptainRideConfirmPanel(false)}
					>
						Cancel!
					</button>
				</form>
			</div>
		</div>
	);
};

export default CaptainRideConfirm;
