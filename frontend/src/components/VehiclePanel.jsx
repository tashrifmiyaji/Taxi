import { FaArrowRight, FaCarSide, FaMotorcycle, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const vehicles = [
	{
		type: "car",
		name: "TaxiGo",
		description: "Comfortable city rides",
		capacity: 4,
		icon: FaCarSide,
	},
	{
		type: "bike",
		name: "BikeRide",
		description: "Quick trips through town",
		capacity: 1,
		icon: FaMotorcycle,
	},
];

const VehiclePanel = ({
	setVehiclePanelOpen,
	setConfirmRidePanelOpen,
	fare,
	setVehicleType,
}) => (
	<section aria-labelledby="vehicle-panel-title">
		<div className="mb-5 flex items-start justify-between gap-4">
			<div>
				<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
					Choose your ride
				</p>
				<h2
					id="vehicle-panel-title"
					className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
				>
					Available options
				</h2>
			</div>
			<button
				type="button"
				aria-label="Close ride options"
				onClick={() => setVehiclePanelOpen(false)}
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
			>
				<IoClose aria-hidden="true" className="text-xl" />
			</button>
		</div>

		<div className="space-y-3">
			{vehicles.map((vehicle) => {
				const VehicleIcon = vehicle.icon;
				return (
					<button
						key={vehicle.type}
						type="button"
						onClick={() => {
							setVehicleType(vehicle.type);
							setVehiclePanelOpen(false);
							setConfirmRidePanelOpen(true);
						}}
						className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-emerald-400 hover:bg-emerald-50/60 focus-visible:border-emerald-500"
					>
						<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-800 transition group-hover:bg-emerald-100 group-hover:text-emerald-800">
							<VehicleIcon aria-hidden="true" />
						</span>
						<span className="min-w-0 flex-1">
							<span className="flex flex-wrap items-center gap-2 font-bold text-slate-900">
								{vehicle.name}
								<span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
									<FaUser aria-hidden="true" />
									{vehicle.capacity}
								</span>
							</span>
							<span className="mt-1 block text-sm text-slate-500">
								{vehicle.description}
							</span>
						</span>
						<span className="shrink-0 text-right">
							<span className="block text-lg font-bold text-slate-950">
								{fare?.[vehicle.type] ?? "—"}৳
							</span>
							<span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
								Select <FaArrowRight aria-hidden="true" />
							</span>
						</span>
					</button>
				);
			})}
		</div>
		<p className="mt-4 text-xs leading-5 text-slate-500">
			Fare is an estimate based on your selected route.
		</p>
	</section>
);

export default VehiclePanel;
