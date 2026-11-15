import { FaCarSide, FaMoneyBillWave } from "react-icons/fa";
import { IoClose, IoLocationOutline } from "react-icons/io5";

const WaitingForDriver = ({ setWaitingForDriverPanel, ride }) => {
	const captainName = [
		ride?.captain?.fullName?.firstName,
		ride?.captain?.fullName?.lastName,
	]
		.filter(Boolean)
		.join(" ");

	const locations = [
		{ label: "Pick-up", value: ride?.pickup },
		{ label: "Destination", value: ride?.destination },
	];

	return (
		<section aria-labelledby="captain-confirmed-title">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
						You&apos;re all set
					</p>
					<h2
						id="captain-confirmed-title"
						className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
					>
						Captain confirmed
					</h2>
				</div>
				<button
					type="button"
					aria-label="Close captain details"
					onClick={() => setWaitingForDriverPanel(false)}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
				>
					<IoClose aria-hidden="true" className="text-xl" />
				</button>
			</div>

			<div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
				<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-800">
					<FaCarSide aria-hidden="true" />
				</span>
				<div className="min-w-0 flex-1">
					<p className="truncate font-bold text-slate-950">
						{captainName || "Your captain"}
					</p>
					<p className="mt-1 text-sm capitalize text-slate-500">
						{ride?.captain?.vehicle?.color}{" "}
						{ride?.captain?.vehicle?.vehicleType}
					</p>
				</div>
				<p className="max-w-32 rounded-lg bg-white px-3 py-2 text-right text-sm font-bold text-slate-800 shadow-sm">
					{ride?.captain?.vehicle?.vehicleNumber || "Vehicle"}
				</p>
			</div>

			<div className="my-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
				<div>
					<p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
						Your ride PIN
					</p>
					<p className="mt-1 text-xs text-emerald-700">
						Share it with your captain to start the ride.
					</p>
				</div>
				<p className="rounded-xl bg-white px-4 py-2 text-xl font-extrabold tracking-[0.2em] text-slate-950">
					{ride?.otp || "------"}
				</p>
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
							<p className="address-copy mt-1 text-sm font-medium text-slate-800">
								{value}
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
		</section>
	);
};

export default WaitingForDriver;
