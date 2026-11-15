import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCaptainContext } from "../../context/CaptainContext";
import { loginCaptain } from "../../apis/captainApi";

const CaptainLogin = () => {
	const isDemoLogin = new URLSearchParams(window.location.search).get("demo") === "1";
	const demoEmail = import.meta.env.VITE_DEMO_DRIVER_EMAIL || "";
	const demoPassword = import.meta.env.VITE_DEMO_DRIVER_PASSWORD || "";
	const [email, setEmail] = useState(() => isDemoLogin ? demoEmail : "");
	const [password, setPassword] = useState(() => isDemoLogin ? demoPassword : "");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { setCaptain } = useCaptainContext();

	const submitHandler = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const res = await loginCaptain({ email, password });
			if (res.status === 200) {
				localStorage.setItem("token", res.data.token);
				setCaptain(res.data.captain);				
				navigate("/captain-home");
			}
		} catch (error) {
			setError(
				error.response?.data?.error?.[0]?.msg ||
					error.response?.data?.message ||
					"Unable to sign in. Please check your details and try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div>
			<div className="h-screen w-full flex justify-between flex-col">
				<div className="logo">Taxi -Driver</div>
				<div className="p-7 flex flex-col justify-between flex-1">
					<div>
						{isDemoLogin && (!demoEmail || !demoPassword) && (
							<p className="mb-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
								Demo driver credentials are not set. Add
								VITE_DEMO_DRIVER_EMAIL and
								VITE_DEMO_DRIVER_PASSWORD to frontend/.env.local.
							</p>
						)}
						<form onSubmit={(e) => submitHandler(e)}>
							<h3 className="text-lg font-medium mb-2">
								What's your email
							</h3>
							<input
								className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
								type="email"
								placeholder="email@example.com"
								required
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<h3 className="text-lg font-medium mb-2">
								Enter Password
							</h3>

							<input
								className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
								type="password"
								placeholder="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							{error && (
								<p className="text-red-500 text-sm mb-3">
									{error}
								</p>
							)}

							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isSubmitting ? "Signing in..." : "Login"}
							</button>
						</form>
						<p className="text-center">
							New here?{" "}
							<Link
								to="/captain-signup"
								className="text-blue-600"
							>
								Create new Captain Account
							</Link>
						</p>
					</div>
					<div>
						<Link
							to="/user-login"
							className="bg-[#10b461] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
						>
							Login as User
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CaptainLogin;
