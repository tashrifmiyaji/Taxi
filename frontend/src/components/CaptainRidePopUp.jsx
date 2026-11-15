import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { postCaptainConfirmRide } from "../apis/rideApi";
import RideRequestSummary from "./RideRequestSummary";

const CaptainRidePopUp = ({
	setCaptainRidePopupPanel,
	setCaptainRideConfirmPanel,
	newRideData,
}) => {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const acceptRide = async () => {
		setError("");
		setIsSubmitting(true);
		try {
			await postCaptainConfirmRide(newRideData._id);
			setCaptainRidePopupPanel(false);
			setCaptainRideConfirmPanel(true);
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"This ride is no longer available. Please try another."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section aria-labelledby="new-ride-title">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
						New request
					</p>
					<h2
						id="new-ride-title"
						className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
					>
						A ride is nearby
					</h2>
				</div>
				<button
					type="button"
					aria-label="Dismiss ride request"
					onClick={() => setCaptainRidePopupPanel(false)}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
				>
					<IoClose aria-hidden="true" className="text-xl" />
				</button>
			</div>

			<RideRequestSummary ride={newRideData} />

			{error && (
				<p
					role="alert"
					className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
				>
					{error}
				</p>
			)}

			<div className="mt-5 grid grid-cols-2 gap-3">
				<button
					type="button"
					onClick={() => setCaptainRidePopupPanel(false)}
					className="min-h-12 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
				>
					Not now
				</button>
				<button
					type="button"
					onClick={acceptRide}
					disabled={isSubmitting}
					className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting ? "Accepting..." : "Accept ride"}
					{!isSubmitting && (
						<FaArrowRight aria-hidden="true" className="text-sm" />
					)}
				</button>
			</div>
		</section>
	);
};

export default CaptainRidePopUp;
