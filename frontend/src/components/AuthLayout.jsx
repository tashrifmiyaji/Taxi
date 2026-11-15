import { Link } from "react-router-dom";
import { FaArrowLeft, FaCarSide } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const AuthLayout = ({
	children,
	title,
	description,
	accountType,
	switchHref,
	switchLabel,
	switchPrompt,
}) => (
	<main className="min-h-[100dvh] bg-white lg:grid lg:grid-cols-2">
		<section className="home-page-bg-img relative hidden min-h-[100dvh] overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/55 to-emerald-950/50" />
			<Link to="/" className="app-brand relative z-10 text-white">
				<span className="app-brand-mark">
					<FaCarSide aria-hidden="true" />
				</span>
				Taxi
			</Link>
			<div className="relative z-10 max-w-xl">
				<p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
					{accountType === "captain" ? "Drive with us" : "Go your way"}
				</p>
				<h1 className="text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">
					{accountType === "captain"
						? "Every journey starts with you."
						: "A better way to get there."}
				</h1>
				<p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">
					{accountType === "captain"
						? "Meet your next passenger, explore your city, and make every trip count."
						: "Find a ride, follow your trip in real time, and arrive with peace of mind."}
				</p>
			</div>
			<p className="relative z-10 flex items-center gap-2 text-sm text-slate-200">
				<IoShieldCheckmarkOutline
					className="text-emerald-300"
					aria-hidden="true"
				/>
				Safe, simple, and made for your city.
			</p>
		</section>

		<section className="flex min-h-[100dvh] flex-col px-5 py-5 sm:px-10 sm:py-8 lg:items-center lg:justify-center lg:px-12 lg:py-12">
			<div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:flex-none">
				<div className="mb-8 flex items-center justify-between lg:mb-12">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 lg:hidden"
					>
						<FaArrowLeft aria-hidden="true" />
						Back
					</Link>
					<Link to="/" className="app-brand lg:hidden">
						<span className="app-brand-mark">
							<FaCarSide aria-hidden="true" />
						</span>
						Taxi
					</Link>
					<span className="hidden text-sm font-medium text-slate-400 lg:inline">
						{accountType === "captain"
							? "CAPTAIN ACCOUNT"
							: "RIDER ACCOUNT"}
					</span>
				</div>

				<div className="flex-1 lg:flex-none">
					<div className="mb-7">
						<p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
							{accountType === "captain" ? "Taxi Captain" : "Taxi"}
						</p>
						<h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
							{title}
						</h2>
						<p className="mt-3 leading-6 text-slate-500">
							{description}
						</p>
					</div>

					{children}

					<p className="mt-7 text-center text-sm text-slate-500">
						{switchPrompt}{" "}
						<Link
							to={switchHref}
							className="font-bold text-emerald-700 transition hover:text-emerald-800"
						>
							{switchLabel}
						</Link>
					</p>
				</div>

				<p className="mt-10 pt-5 text-center text-xs text-slate-400 lg:mt-12">
					By continuing, you agree to use Taxi responsibly and safely.
				</p>
			</div>
		</section>
	</main>
);

export default AuthLayout;
