import { Link } from "react-router-dom";

const Start = () => {
	return (
		<main className="home-page-bg-img relative flex min-h-[100dvh] items-end overflow-hidden bg-slate-950 px-5 py-8 sm:px-10 lg:items-center lg:px-16">
			<div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10" />
			<div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
				<section className="max-w-2xl text-white">
					<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur">
						<span className="h-2 w-2 rounded-full bg-emerald-400" />
						Rides made simple
					</p>
					<h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
						Your city.
						<br />
						Your ride.
					</h1>
					<p className="mt-5 max-w-lg text-lg leading-8 text-slate-200">
						Book a nearby ride, follow your trip, and get where you
						need to be with confidence.
					</p>
				</section>

				<section className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8 lg:justify-self-end lg:w-full lg:max-w-md">
					<div className="mb-7 flex items-center justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
								Taxi
							</p>
							<h2 className="mt-2 text-3xl font-bold text-slate-900">
								Let&apos;s get moving
							</h2>
						</div>
						<img
							className="h-14 w-20 object-contain"
							src="/pngwing.com.png"
							alt="Taxi"
						/>
					</div>

					<Link
						to="/user-login"
						className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
					>
						Continue as a rider
					</Link>

					<div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-slate-400">
						<span className="h-px flex-1 bg-slate-200" />
						Try a demo
						<span className="h-px flex-1 bg-slate-200" />
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<Link
							to="/user-login?demo=1"
							className="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
						>
							Demo rider
						</Link>
						<Link
							to="/captain-login?demo=1"
							className="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
						>
							Demo Captain
						</Link>
					</div>

					<p className="mt-6 text-center text-sm text-slate-500">
						Driving with us?{" "}
						<Link
							to="/captain-login"
							className="font-semibold text-emerald-700 hover:text-emerald-800"
						>
							Sign in as a captain
						</Link>
					</p>
				</section>
			</div>
		</main>
	);
};
export default Start;
