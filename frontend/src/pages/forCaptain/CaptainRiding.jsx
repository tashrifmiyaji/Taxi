import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import LiveTracking from "../../components/LiveTracking";
import RideDetailsCard from "../../components/RideDetailsCard";
import { rideEnd } from "../../apis/rideApi";

const CaptainRiding = () => {
	const [error, setError] = useState("");
	const [isFinishing, setIsFinishing] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const ride = location.state?.newRideData;
	const passengerName = [
		ride?.user?.fullName?.firstName,
		ride?.user?.fullName?.lastName,
	]
		.filter(Boolean)
		.join(" ");

	useEffect(() => {
		if (!ride) navigate("/captain-home", { replace: true });
	}, [ride, navigate]);

	const endRide = async () => {
		setError("");
		setIsFinishing(true);
		try {
			await rideEnd(ride._id);
			navigate("/captain-home", { replace: true });
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"Could not finish the ride. Please try again."
			);
		} finally {
			setIsFinishing(false);
		}
	};

	if (!ride) return null;

	return (
		<main className="relative min-h-[100dvh] bg-slate-100">
			<div className="fixed inset-0">
				<LiveTracking />
			</div>
			<header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
				<Link
					to="/captain-home"
					className="app-brand pointer-events-auto rounded-2xl bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur"
				>
					<span className="app-brand-mark">
						<FaCarSide aria-hidden="true" />
					</span>
					Taxi Captain
				</Link>
				<span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
					Trip in progress
				</span>
			</header>

			<div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-h-[82dvh] w-full max-w-xl overflow-y-auto px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 lg:bottom-auto lg:left-6 lg:right-auto lg:top-24 lg:mx-0 lg:max-h-[calc(100dvh-8rem)] lg:w-[min(30rem,calc(100%-3rem))] lg:px-0">
				<RideDetailsCard
					ride={ride}
					counterpartyLabel="Passenger"
					counterpartyName={passengerName}
				>
					{error && (
						<p
							role="alert"
							className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
						>
							{error}
						</p>
					)}
					<button
						type="button"
						className="btn-primary mt-5 bg-emerald-600 hover:bg-emerald-700"
						disabled={isFinishing}
						onClick={endRide}
					>
						{isFinishing ? "Finishing ride..." : "Finish ride"}
					</button>
					<p className="mt-3 text-center text-xs leading-5 text-slate-500">
						Finish the trip after collecting the cash fare.
					</p>
				</RideDetailsCard>
			</div>
		</main>
	);
};

export default CaptainRiding;
