import { FaCarSide, FaMoneyBillWave } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const RideDetailsCard = ({
	ride,
	counterpartyLabel,
	counterpartyName,
	counterpartyMeta,
	children,
}) => {
	const duration = Number(ride?.duration) || 0;
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const locations = [
		{ label: "Pick-up", value: ride?.pickup },
		{ label: "Destination", value: ride?.destination },
	];

	return (
		<section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-6">
			<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
						Trip in progress
					</p>
					<h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
						Your trip is underway
					</h1>
				</div>
				<span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
					<span className="h-2 w-2 rounded-full bg-emerald-500" />
					Ongoing
				</span>
			</div>

			<div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
				<div className="flex min-w-0 items-center gap-3">
					<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-800">
						<FaCarSide aria-hidden="true" />
					</span>
					<div className="min-w-0">
						<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
							{counterpartyLabel}
						</p>
						<p className="truncate font-bold text-slate-950">
							{counterpartyName || "Taxi passenger"}
						</p>
						{counterpartyMeta && (
							<p className="truncate text-sm text-slate-500">
								{counterpartyMeta}
							</p>
						)}
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

			{children}
		</section>
	);
};

export default RideDetailsCard;
