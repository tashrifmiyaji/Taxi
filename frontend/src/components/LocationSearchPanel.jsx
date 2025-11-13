import { IoLocation } from "react-icons/io5";

// sample array for location
const locations = [
	"24B, Near Kapoor's cafe, Sherians Coding School, Bhopal",
	"22B, Near Haji Market, Mahini Coding School, Bhopal",
	"20B, Near rj rio cafe , Nangolkot Coding School, Bhopal",
	"18A, Jannat market , Nangolkot Coding School, Bhopal",
];

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen }) => {
	return (
		<>
			{/* this is just a sample data */}
			{locations.map((cur, idx) => {
				return (
					<div
						key={idx}
						onClick={() => {
							setVehiclePanelOpen(true);
							setPanelOpen(false);
						}}
						className="flex items-center justify-start active:border-2 rounded-md gap-4 mb-4"
					>
						<h2 className="bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full ">
							<IoLocation />
						</h2>
						<h4 className="font-medium">{cur}</h4>
					</div>
				);
			})}
		</>
	);
};

export default LocationSearchPanel;
