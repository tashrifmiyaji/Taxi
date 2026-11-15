import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../apis/api";
import { UserDataContext } from "../../context/UserContext";

const UserLogin = () => {
	const isDemoLogin = new URLSearchParams(window.location.search).get("demo") === "1";
	const demoEmail = import.meta.env.VITE_DEMO_USER_EMAIL || "";
	const demoPassword = import.meta.env.VITE_DEMO_USER_PASSWORD || "";
	const [email, setEmail] = useState(() => isDemoLogin ? demoEmail : "");
	const [password, setPassword] = useState(() => isDemoLogin ? demoPassword : "");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { setUser } = useContext(UserDataContext);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const res = await userLogin({ email, password });
			if (res.status === 200) {
				setUser(res.data.user);
				localStorage.setItem("token", res.data.token);
				navigate("/home");
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
				<div className="logo">Taxi</div>
				<div className="p-7 flex flex-col justify-between flex-1">
					<div>
						{isDemoLogin && (!demoEmail || !demoPassword) && (
							<p className="mb-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
								Demo rider credentials are not set. Add
								VITE_DEMO_USER_EMAIL and
								VITE_DEMO_USER_PASSWORD to frontend/.env.local.
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
								required
								autoComplete="current-password"
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
							<Link to="/user-signup" className="text-blue-600">
								Create new Account
							</Link>
						</p>
					</div>
					<div>
						<Link
							to="/captain-login"
							className="bg-[#10b461] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
						>
							Login as Captain
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
