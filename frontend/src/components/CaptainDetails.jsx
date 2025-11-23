import { IoTime, IoSpeedometer } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";

const DriverDetails = () => {
	return (
		<>
			<div className="flex items-center justify-between pb-4">
				<div className="flex items-center justify-start gap-4">
					<img
						className="h-10 rounded-full object-center"
						src="https://i.pinimg.com/originals/78/d8/89/78d889b7e25894d9397f407cabddb059.jpg"
						alt=""
					/>
					<h4 className="text-lg font-medium">Safwan Muwaj</h4>
				</div>
				<div>
					<h4 className="text-xl font-semibold">৳1200</h4>
					<p className="text-sm text-gray-600">Earned</p>
				</div>
			</div>
			<div className="flex justify-center items-start gap-5 p-4 bg-yellow-300 rounded-2xl">
				<div className="flex flex-col items-center">
					<IoTime className="text-2xl mb-2" />
					<h5 className="tex-lg mont font-medium">11.2</h5>
					<p className="text-sm text-center text-gray-600">
						Hours Online
					</p>
				</div>
				<div className="flex flex-col items-center">
					<IoSpeedometer className="text-2xl mb-2" />
					<h5 className="tex-lg mont font-medium">11.2</h5>
					<p className="text-sm text-center text-gray-600">
						Hours Online
					</p>
				</div>
				<div className="flex flex-col items-center">
					<FaBookOpen className="text-2xl mb-2" />
					<h5 className="tex-lg mont font-medium">11.2</h5>
					<p className="text-sm text-center text-gray-600">
						Hours Online
					</p>
				</div>
			</div>
		</>
	);
};

export default DriverDetails;
