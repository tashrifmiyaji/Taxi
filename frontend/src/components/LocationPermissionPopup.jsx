import { FaLocationArrow } from "react-icons/fa";

const LocationPermissionPopup = ({ visible = true, onAllow, onClose }) => {
	if (!visible) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
			role="presentation"
		>
			<section
				className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
				role="dialog"
				aria-modal="true"
				aria-labelledby="location-permission-title"
			>
				<span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-800">
					<FaLocationArrow aria-hidden="true" />
				</span>
				<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
					Stay connected
				</p>
				<h2
					id="location-permission-title"
					className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
				>
					Share your location
				</h2>
				<p className="mt-3 leading-6 text-slate-600">
					Allow location access so nearby riders can find you and send
					you trip requests.
				</p>

				<div className="mt-7 grid grid-cols-2 gap-3">
					<button
						type="button"
						onClick={onClose}
						className="min-h-12 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
					>
						Not now
					</button>
					<button
						type="button"
						onClick={onAllow}
						className="min-h-12 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
					>
						Enable location
					</button>
				</div>
			</section>
		</div>
	);
};

export default LocationPermissionPopup;
