import { FaCarSide, FaSpinner } from "react-icons/fa";
import { IoClose, IoLocationOutline } from "react-icons/io5";

const LockingForADriver = ({
	setLockingForADriverPanel,
	destination,
	pickup,
	fare,
	vehicleType,
}) => (
	<section aria-labelledby="matching-title">
		<div className="mb-5 flex items-start justify-between gap-4">
			<div>
				<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
					Ride requested
				</p>
				<h2
					id="matching-title"
					className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
				>
					Finding your captain
				</h2>
			</div>
			<button
				type="button"
				aria-label="Close ride status"
				onClick={() => setLockingForADriverPanel(false)}
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
			>
				<IoClose aria-hidden="true" className="text-xl" />
			</button>
		</div>

		<div className="mb-5 flex items-center gap-4 rounded-2xl bg-emerald-50 p-4">
			<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-xl text-emerald-700 shadow-sm">
				<FaSpinner className="animate-spin" aria-hidden="true" />
			</span>
			<p className="text-sm leading-6 text-emerald-950">
				Nearby captains are being notified. We&apos;ll update you as soon
				as someone accepts.
			</p>
		</div>

		<div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
			<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-800">
				<FaCarSide aria-hidden="true" />
			</span>
			<div className="min-w-0 flex-1">
				<p className="font-bold capitalize text-slate-900">
					{vehicleType} ride
				</p>
				<p className="text-sm text-slate-500">Cash payment</p>
			</div>
			<p className="text-lg font-bold text-slate-950">
				{fare?.[vehicleType] ?? "—"}৳
			</p>
		</div>

		<div className="mt-3 divide-y divide-slate-100">
			{[
				{ label: "Pick-up", value: pickup },
				{ label: "Destination", value: destination },
			].map(({ label, value }) => (
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
	</section>
);

export default LockingForADriver;
