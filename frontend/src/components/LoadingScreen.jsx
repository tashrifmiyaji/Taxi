import { FaCarSide, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoadingScreen = ({ title = "Getting things ready", message }) => (
	<main
		className="flex min-h-[100dvh] items-center justify-center bg-slate-50 p-5"
		aria-live="polite"
	>
		<section className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
			<Link
				to="/"
				className="app-brand mx-auto mb-7 w-fit"
				aria-label="Taxi home"
			>
				<span className="app-brand-mark">
					<FaCarSide aria-hidden="true" />
				</span>
				Taxi
			</Link>
			<FaSpinner
				className="mx-auto text-2xl text-emerald-600 motion-safe:animate-spin"
				aria-hidden="true"
			/>
			<h1 className="mt-5 text-lg font-bold text-slate-950">{title}</h1>
			<p className="mt-2 text-sm leading-6 text-slate-500">
				{message || "This should only take a moment."}
			</p>
		</section>
	</main>
);

export default LoadingScreen;
