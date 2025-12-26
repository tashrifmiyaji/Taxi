import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";

const WaitingForDriver = (props) => {
	try {
		return (
			<div>
				<h5
					className=" w-full text-center absolute top-0 left-0 text-2xl bg-gray-200 text-gray-500 border-[1px] rounded-t-2xl"
					onClick={() => {
						props.setWaitingForDriverPanel(false);
					}}
				>
					⊻
				</h5>
				<div className="flex items-center justify-between mt-14">
					<img className="h-12" src="/pngwing.com.png" alt="" />
					<div className="text-right">
						<h2 className="text-lg font-medium">{`${props.ride?.captain.fullName.firstName} ${props.ride?.captain.fullName.lastName}`}</h2>
						<h4 className="text-xl font-semibold -mt-1 -mb-1">
							{props.ride?.captain.vehicle.vehicleNumber}
						</h4>
						<p className="text-sm text-gray-600">
							Mercedes-Benz G63 AMG 🚙.
						</p>
						<h2>otp {props.ride?.otp}</h2>
					</div>
				</div>

				<div className="flex flex-col justify-between items-center gap-3">
					<div className="w-full flex flex-col gap-5 py-5">
						<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
							<IoLocation />
							<div>
								<p>pickup</p>
								<h3 className="font-bold text-2xl">{props.ride?.pickup}</h3>
							</div>
						</div>
						<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
							<IoLocation />
							<div>
								<p>destination</p>
								<h3 className="font-bold text-2xl">
									{props.ride?.destination}
								</h3>
							</div>
						</div>
						<div className="flex items-center gap-5 pb-2">
							<FaMoneyCheckAlt />
							<div>
								<h3 className="font-bold text-2xl">{props.ride?.fare}৳</h3>
								<p className="text-sm text-gray-600 -mt-1">
									Cash Cash
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.log(error);
	}
};

export default WaitingForDriver;
