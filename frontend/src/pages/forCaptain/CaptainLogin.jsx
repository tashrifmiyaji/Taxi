import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaLock } from "react-icons/fa";
import AuthLayout from "../../components/AuthLayout";
import { useCaptainContext } from "../../context/CaptainContext";
import { loginCaptain } from "../../apis/captainApi";

const CaptainLogin = () => {
	const isDemoLogin =
		new URLSearchParams(window.location.search).get("demo") === "1";
	const demoEmail = import.meta.env.VITE_DEMO_DRIVER_EMAIL || "";
	const demoPassword = import.meta.env.VITE_DEMO_DRIVER_PASSWORD || "";
	const [email, setEmail] = useState(() => (isDemoLogin ? demoEmail : ""));
	const [password, setPassword] = useState(() =>
		isDemoLogin ? demoPassword : ""
	);
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { setCaptain } = useCaptainContext();

	const submitHandler = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await loginCaptain({ email, password });
			localStorage.setItem("token", response.data.token);
			setCaptain(response.data.captain);
			navigate("/captain-home");
		} catch (requestError) {
			setError(
				requestError.response?.data?.error?.[0]?.msg ||
					requestError.response?.data?.message ||
					(typeof requestError.response?.data === "string"
						? requestError.response.data
						: "") ||
					"Unable to sign in. Check your details and try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Welcome back, captain"
			description="Sign in and get ready for your next trip."
			accountType="captain"
			switchHref="/user-login"
			switchPrompt="Looking for a ride?"
			switchLabel="Sign in as rider"
		>
			{isDemoLogin && (!demoEmail || !demoPassword) && (
				<div
					role="status"
					className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
				>
					Demo captain credentials are not set. Add
					{" "}VITE_DEMO_DRIVER_EMAIL and VITE_DEMO_DRIVER_PASSWORD to
					{" "}frontend/.env.local.
				</div>
			)}

			<form className="space-y-5" onSubmit={submitHandler}>
				<div>
					<label className="auth-label" htmlFor="captain-email">
						Email address
					</label>
					<input
						className="auth-input"
						id="captain-email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>

				<div>
					<label className="auth-label" htmlFor="captain-password">
						Password
					</label>
					<input
						className="auth-input"
						id="captain-password"
						type="password"
						placeholder="Enter your password"
						autoComplete="current-password"
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>

				{error && (
					<p
						role="alert"
						className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
					>
						{error}
					</p>
				)}

				<button className="btn-primary gap-2" disabled={isSubmitting}>
					{isSubmitting ? "Signing in..." : "Sign in"}
					{!isSubmitting && (
						<FaArrowRight aria-hidden="true" className="text-sm" />
					)}
				</button>
			</form>

			<div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
				<span className="h-px flex-1 bg-slate-200" />
				New to Taxi?
				<span className="h-px flex-1 bg-slate-200" />
			</div>

			<Link
				to="/captain-signup"
				className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
			>
				Create a captain account
			</Link>
			<p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
				<FaLock aria-hidden="true" />
				Your account details are protected.
			</p>
		</AuthLayout>
	);
};

export default CaptainLogin;
