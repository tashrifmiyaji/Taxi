import { useState } from "react";
import { FaArrowLeft, FaCarSide } from "react-icons/fa";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { createRide } from "../apis/rideApi";

const ConfirmRide = ({
	setConfirmRidePanelOpen,
	setLockingForADriverPanel,
	setVehiclePanelOpen,
	pickup,
	destination,
	fare,
	vehicleType,
}) => {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submitRide = async () => {
		setError("");
		setIsSubmitting(true);
		try {
			await createRide({ pickup, destination, vehicleType });
			setConfirmRidePanelOpen(false);
			setLockingForADriverPanel(true);
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"Could not request this ride. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const addressRow = (label, value, isDestination = false) => (
		<div className="flex items-start gap-3 py-3">
			<span
				className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
					isDestination
						? "bg-slate-900 text-white"
						: "bg-emerald-100 text-emerald-700"
				}`}
			>
				<IoLocationOutline aria-hidden="true" />
			</span>
			<div className="min-w-0 flex-1">
				<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
					{label}
				</p>
				<p className="address-copy mt-1 text-sm font-semibold leading-5 text-slate-900">
					{value}
				</p>
			</div>
		</div>
	);

	return (
		<section aria-labelledby="confirm-ride-title">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
						Almost there
					</p>
					<h2
						id="confirm-ride-title"
						className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
					>
						Review your ride
					</h2>
				</div>
				<button
					type="button"
					aria-label="Back to ride options"
					onClick={() => {
						setConfirmRidePanelOpen(false);
						setVehiclePanelOpen(true);
					}}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
				>
					<IoClose aria-hidden="true" className="text-xl" />
				</button>
			</div>

			<div className="mb-4 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
				<img
					className="h-14 w-20 shrink-0 object-contain"
					src="/pngwing.com.png"
					alt=""
				/>
				<div className="min-w-0 flex-1">
					<p className="font-bold capitalize text-slate-900">
						{vehicleType} ride
					</p>
					<p className="text-sm text-slate-500">Cash payment</p>
				</div>
				<p className="text-xl font-bold text-slate-950">
					{fare?.[vehicleType] ?? "—"}৳
				</p>
			</div>

			<div className="divide-y divide-slate-100">
				{addressRow("Pick-up", pickup)}
				{addressRow("Destination", destination, true)}
			</div>

			{error && (
				<p
					role="alert"
					className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
				>
					{error}
				</p>
			)}

			<div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
				<button
					type="button"
					onClick={() => {
						setConfirmRidePanelOpen(false);
						setVehiclePanelOpen(true);
					}}
					aria-label="Back to vehicle options"
					className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
				>
					<FaArrowLeft aria-hidden="true" />
				</button>
				<button
					type="button"
					className="btn-primary gap-2 bg-emerald-600 hover:bg-emerald-700"
					disabled={isSubmitting}
					onClick={submitRide}
				>
					<FaCarSide aria-hidden="true" />
					{isSubmitting ? "Requesting ride..." : "Confirm ride"}
				</button>
			</div>
		</section>
	);
};

export default ConfirmRide;
