import { FaCarSide, FaIdCard, FaUsers } from "react-icons/fa";
import { useCaptainContext } from "../context/CaptainContext";

const CaptainDetails = ({ isOnline }) => {
	const { captain } = useCaptainContext();
	const fullName = [
		captain?.fullName?.firstName,
		captain?.fullName?.lastName,
	]
		.filter(Boolean)
		.join(" ");
	const details = [
		{
			label: "Vehicle",
			value: captain?.vehicle?.vehicleType || "Not set",
			icon: <FaCarSide aria-hidden="true" />,
		},
		{
			label: "Plate number",
			value: captain?.vehicle?.vehicleNumber || "Not set",
			icon: <FaIdCard aria-hidden="true" />,
		},
		{
			label: "Seats",
			value: captain?.vehicle?.capacity || "—",
			icon: <FaUsers aria-hidden="true" />,
		},
	];

	return (
		<section aria-label="Captain profile">
			<div className="mb-5 flex items-center justify-between gap-4">
				<div className="flex min-w-0 items-center gap-3">
					<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-bold text-emerald-800">
						{fullName.charAt(0).toUpperCase() || "C"}
					</span>
					<div className="min-w-0">
						<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
							Your profile
						</p>
						<h2 className="truncate text-lg font-bold text-slate-950">
							{fullName || "Taxi Captain"}
						</h2>
					</div>
				</div>
				<span
					className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${
						isOnline
							? "bg-emerald-50 text-emerald-800"
							: "bg-slate-100 text-slate-600"
					}`}
				>
					<span
						className={`h-2 w-2 rounded-full ${
							isOnline ? "bg-emerald-500" : "bg-slate-400"
						}`}
					/>
					{isOnline ? "Online" : "Offline"}
				</span>
			</div>

			<div className="grid grid-cols-3 gap-2 sm:gap-3">
				{details.map(({ label, value, icon }) => (
					<div
						key={label}
						className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4"
					>
						<span className="mb-2 block text-emerald-700">
							{icon}
						</span>
						<p className="truncate text-sm font-bold capitalize text-slate-900">
							{value}
						</p>
						<p className="mt-1 truncate text-xs text-slate-500">
							{label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default CaptainDetails;
