import { FaUser } from "react-icons/fa";

const VehicleInfo = [
	{
		id: 1,
		name: "TaxiGo",
		capacity: 4,
		timeAway: "2 min away",
		description: "Affordable, Compact Rides",
		price: "400৳",
		imgSrc: "/pngwing.com.png",
		imgAlt: "car",
	},
	{
		id: 2,
		name: "BikeRide",
		capacity: 1,
		timeAway: "3 min away",
		description: "Affordable, Bike Rides",
		price: "150৳",
		imgSrc: "https://www.freepnglogos.com/uploads/bike-png/black-yamaha-yzf-sport-motorcycle-bike-png-image-pngpix-32.png",
		imgAlt: "bike",
	},
	// new vehicle
	// {
	//   id: 3,
	//   name: "CarRide",
	//   capacity: 3,
	//   timeAway: "1 min away",
	//   description: "Budget friendly rides",
	//   price: "200৳",
	//   imgSrc: "/path/to/carRide-image.png",
	//   imgAlt: "car",
	// }
];

const VehiclePanel = (props) => {
	return (
		<>
			<h5
				className=" w-full pb-3 pt-2 text-center absolute top-0 left-0 text-2xl bg-gray-200 text-gray-500 rounded-2xl"
				onClick={() => {
					props.setVehiclePanelOpen(false);
				}}
			>
				⊻
			</h5>
			<h3 className="text-2xl font-semibold mb-6 mt-10">
				Choose a Vehicle
			</h3>

			{VehicleInfo.map((vehicle) => (
				<div
					key={vehicle.id}
					className="flex items-center justify-between p-3 mb-2 bg-gray-300 active:border-2 rounded-2xl"
					onClick={() => {
						props.SetConfirmRidePanelOpen(true);
						props.setVehiclePanelOpen(false);
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
