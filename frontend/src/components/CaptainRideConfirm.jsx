import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getStartedRide } from "../apis/rideApi";
import RideRequestSummary from "./RideRequestSummary";

const CaptainRideConfirm = ({
	setCaptainRideConfirmPanel,
	newRideData,
}) => {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			await getStartedRide(newRideData._id, otp);
			setCaptainRideConfirmPanel(false);
			navigate("/captain-riding", { state: { newRideData } });
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"That code did not match. Ask the rider to confirm the ride PIN."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section aria-labelledby="start-ride-title">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
						Passenger confirmed
					</p>
					<h2
						id="start-ride-title"
						className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
					>
						Enter the ride PIN
					</h2>
				</div>
				<button
					type="button"
					aria-label="Close ride confirmation"
					onClick={() => setCaptainRideConfirmPanel(false)}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
				>
					<IoClose aria-hidden="true" className="text-xl" />
				</button>
			</div>

			<RideRequestSummary ride={newRideData} />

			<form className="mt-5 space-y-3" onSubmit={handleSubmit}>
				<label
					htmlFor="ride-pin"
					className="block text-sm font-semibold text-slate-700"
				>
					Ask the rider for their 6-digit PIN
				</label>
				<input
					id="ride-pin"
					className="auth-input text-center text-xl font-bold tracking-[0.35em]"
					type="text"
					inputMode="numeric"
					autoComplete="one-time-code"
					pattern="[0-9]{6}"
					minLength={6}
					maxLength={6}
					placeholder="••••••"
					required
					value={otp}
					onChange={(event) =>
						setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
					}
				/>
				{error && (
					<p
						role="alert"
						className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
					>
						{error}
					</p>
				)}
				<div className="grid grid-cols-2 gap-3 pt-1">
					<button
						type="button"
						onClick={() => setCaptainRideConfirmPanel(false)}
						className="min-h-12 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isSubmitting || otp.length !== 6}
						className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isSubmitting ? "Starting..." : "Start ride"}
						{!isSubmitting && (
							<FaArrowRight
								aria-hidden="true"
								className="text-sm"
							/>
						)}
					</button>
				</div>
			</form>
		</section>
	);
};

export default CaptainRideConfirm;
