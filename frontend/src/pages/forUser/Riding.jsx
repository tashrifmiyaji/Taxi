import { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLocation, IoHome } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { SocketContext } from "../../context/SocketContext";
import LiveTracking from "../../components/LiveTracking";

const Riding = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const rideData = location.state?.data;

	const { socket } = useContext(SocketContext);

	const timeInSeconds = rideData?.duration;
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);

	useEffect(() => {
		const handleEndRide = (data) => {
			console.log("ride end data", data);
			navigate("/home");
		};

		socket?.on("ride-ended", handleEndRide);

		return () => {
			socket?.off("ride-ended", handleEndRide);
		};
	}, []);

	return (
		<div className="h-screen">
			<Link
				to={"/home"}
				className="fixed bg-white w-8 h-8 flex items-center justify-center rounded-2xl right-2 top-2"
			>
				<IoHome />
			</Link>
			<div className="h-1/2">
				{/* <img src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" /> */}
				<LiveTracking />
			</div>
			<div className="h-1/2 p-2">
				<div>
					<div className="flex items-center justify-between">
						<img className="h-12" src="/pngwing.com.png" alt="" />
						<div className="text-right">
							<h2 className="text-lg font-medium">{`${rideData?.captain.fullName.firstName} ${rideData?.captain.fullName.lastName}`}</h2>
							<h4 className="text-xl font-semibold -mt-1 -mb-1">
								MB04 AB 123
							</h4>
							<div className="text-right">
								<h5 className="font-semibold">
									{(rideData?.distance / 1000).toFixed(2)} km.
								</h5>
								<h5 className="font-semibold">
									{hours > 0 ? `${hours}h ` : ""}
									{minutes}m
								</h5>
							</div>
						</div>
					</div>

					<div>
						<div className="w-full flex flex-col gap-5 py-2">
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<IoLocation />
								<div>
									<p className="italic">pickup</p>
									<h3 className="font-bold text-2xl">
										{rideData?.pickup}
									</h3>
								</div>
							</div>
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<IoLocation />
								<div>
									<p className="italic">destination</p>
									<h3 className="font-bold text-2xl">
										{rideData?.destination}
									</h3>
								</div>
							</div>
							<div className="flex items-center gap-5 pb-2">
								<FaMoneyCheckAlt />
								<div>
									<h3 className="font-bold text-2xl">
										{rideData?.fare}৳
									</h3>
									<p className="text-sm text-gray-600 -mt-1">
										Cash Cash
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg active:border-2">
					Make a payment.
				</button>
			</div>
		</div>
	);
};

export default Riding;
