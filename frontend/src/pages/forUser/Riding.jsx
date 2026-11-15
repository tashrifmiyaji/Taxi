import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import { SocketContext } from "../../context/SocketContext";
import LiveTracking from "../../components/LiveTracking";
import RideDetailsCard from "../../components/RideDetailsCard";

const Riding = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const ride = location.state?.data;
	const captain = ride?.captain;
	const captainName = [
		captain?.fullName?.firstName,
		captain?.fullName?.lastName,
	]
		.filter(Boolean)
		.join(" ");
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		if (!ride) navigate("/home", { replace: true });
	}, [ride, navigate]);

	useEffect(() => {
		const handleEndRide = () => navigate("/home", { replace: true });
		socket.on("ride-ended", handleEndRide);
		return () => socket.off("ride-ended", handleEndRide);
	}, [socket, navigate]);

	if (!ride) return null;

	return (
		<main className="relative min-h-[100dvh] bg-slate-100">
			<div className="fixed inset-0">
				<LiveTracking />
			</div>
			<header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
				<Link
					to="/home"
					className="app-brand pointer-events-auto rounded-2xl bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur"
				>
					<span className="app-brand-mark">
						<FaCarSide aria-hidden="true" />
					</span>
					Taxi
				</Link>
				<span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
					Trip in progress
				</span>
			</header>

			<div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-h-[82dvh] w-full max-w-xl overflow-y-auto px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 lg:bottom-auto lg:left-6 lg:right-auto lg:top-24 lg:mx-0 lg:max-h-[calc(100dvh-8rem)] lg:w-[min(30rem,calc(100%-3rem))] lg:px-0">
				<RideDetailsCard
					ride={ride}
					counterpartyLabel="Your captain"
					counterpartyName={captainName}
					counterpartyMeta={[
						captain?.vehicle?.color,
						captain?.vehicle?.vehicleType,
						captain?.vehicle?.vehicleNumber,
					]
						.filter(Boolean)
						.join(" · ")}
				/>
				<p className="px-3 pt-3 text-center text-xs text-slate-600 lg:text-left">
					Thanks for riding with Taxi.
				</p>
			</div>
		</main>
	);
};

export default Riding;
