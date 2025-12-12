import { FaUser } from "react-icons/fa";

const VehiclePanel = (props) => {
	const VehicleInfo = [
		{
			id: 1,
			name: "TaxiGo",
			type: "car",
			capacity: 4,
			timeAway: "2 min away",
			description: "Affordable, Compact Rides",
			price: `${props.fare.car}৳`,
			imgSrc: "/pngwing.com.png",
			imgAlt: "car",
		},
		{
			id: 2,
			name: "BikeRide",
			type: "bike",
			capacity: 1,
			timeAway: "3 min away",
			description: "Affordable, Bike Rides",
			price: `${props.fare.bike}৳`,
			imgSrc: "https://www.freepnglogos.com/uploads/bike-png/black-yamaha-yzf-sport-motorcycle-bike-png-image-pngpix-32.png",
			imgAlt: "bike",
		},
	];
	return (
		<>
			<h5
				className=" w-full text-center absolute top-0 left-0 text-2xl bg-gray-200 text-gray-500 border-[1px] rounded-t-2xl"
				onClick={() => {
					props.setVehiclePanelOpen(false);
				}}
			>
				⊻
			</h5>
			<h3 className="text-2xl font-semibold mb-6 mt-6">
				Choose a Vehicle
			</h3>

			{VehicleInfo.map((vehicle) => (
				<div
					key={vehicle.id}
					className="flex items-center justify-between p-3 mb-2 bg-gray-300 active:border-2 rounded-2xl"
					onClick={() => {
						props.setVehiclePanelOpen(false);
						props.setVehicleType(vehicle.type)
						props.setConfirmRidePanelOpen(true);
					}}
				>
					<img
						className="h-10"
						src={vehicle.imgSrc}
						alt={vehicle.imgAlt}
					/>
					<div className="w-1/2 ml-2">
						<h4 className="flex gap-2 font-medium text-base">
							{vehicle.name}
							<span className="flex gap-1">
								<FaUser />
								{vehicle.capacity}
							</span>
						</h4>
						<h3 className="font-medium text-sm">
							{vehicle.timeAway}
						</h3>
						<p className="font-normal text-xs text-gray-600">
							{vehicle.description}
						</p>
					</div>
					<h2 className="text-xl font-semibold">{vehicle.price}</h2>
				</div>
			))}
		</>
	);
};

export default VehiclePanel;
