import { FaMoneyBillWave } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const RideRequestSummary = ({ ride }) => {
	const passengerName = [
		ride?.user?.fullName?.firstName,
		ride?.user?.fullName?.lastName,
	]
		.filter(Boolean)
		.join(" ");
	const duration = Number(ride?.duration) || 0;
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const locations = [
		{ label: "Pick-up", value: ride?.pickup },
		{ label: "Destination", value: ride?.destination },
	];

	return (
		<>
			<div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
				<div className="flex min-w-0 items-center gap-3">
					<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-800">
						{passengerName.charAt(0).toUpperCase() || "R"}
					</span>
					<div className="min-w-0">
						<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
							Rider
						</p>
						<p className="truncate font-bold text-slate-950">
							{passengerName || "Taxi rider"}
						</p>
					</div>
				</div>
				<div className="shrink-0 text-right">
					<p className="font-bold text-slate-900">
						{((Number(ride?.distance) || 0) / 1000).toFixed(1)} km
					</p>
					<p className="text-xs text-slate-500">
						{hours > 0 ? `${hours}h ` : ""}
						{minutes} min
					</p>
				</div>
			</div>

			<div className="divide-y divide-slate-100">
				{locations.map(({ label, value }) => (
					<div key={label} className="flex items-start gap-3 py-3">
						<IoLocationOutline
							className="mt-1 shrink-0 text-lg text-emerald-700"
							aria-hidden="true"
						/>
						<div className="min-w-0">
							<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
								{label}
							</p>
							<p className="address-copy mt-1 text-sm font-medium leading-5 text-slate-800">
								{value || "Address unavailable"}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
				<span className="flex items-center gap-2 text-sm font-medium text-slate-600">
					<FaMoneyBillWave
						className="text-emerald-700"
						aria-hidden="true"
					/>
					Cash payment
				</span>
				<span className="font-bold text-slate-950">
					{ride?.fare ?? "—"}৳
				</span>
			</div>
		</>
	);
};

export default RideRequestSummary;
