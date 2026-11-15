import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AuthLayout from "../../components/AuthLayout";
import { UserDataContext } from "../../context/UserContext";
import { userRegister } from "../../apis/api";

const UserSignUp = () => {
	const [name, setName] = useState({ firstName: "", lastName: "" });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { setUser } = useContext(UserDataContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await userRegister({
				fullName: name,
				email,
				password,
			});
			localStorage.setItem("token", response.data.token);
			setUser(response.data.user);
			navigate("/home");
		} catch (requestError) {
			setError(
				requestError.response?.data?.error?.[0]?.msg ||
					requestError.response?.data?.message ||
					(typeof requestError.response?.data === "string"
						? requestError.response.data
						: "") ||
					"Unable to create your account. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Create your account"
			description="A few details and you’ll be ready to find a ride."
			accountType="rider"
			switchHref="/captain-signup"
			switchPrompt="Driving with us?"
			switchLabel="Create a captain account"
		>
			<form className="space-y-5" onSubmit={handleSubmit}>
				<fieldset>
					<legend className="auth-label">Your name</legend>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<input
							className="auth-input"
							type="text"
							placeholder="First name"
							autoComplete="given-name"
							minLength={3}
							required
							value={name.firstName}
							onChange={(event) =>
								setName((previous) => ({
									...previous,
									firstName: event.target.value,
								}))
							}
						/>
						<input
							className="auth-input"
							type="text"
							placeholder="Last name"
							autoComplete="family-name"
							minLength={3}
							required
							value={name.lastName}
							onChange={(event) =>
								setName((previous) => ({
									...previous,
									lastName: event.target.value,
								}))
							}
						/>
					</div>
				</fieldset>

				<div>
					<label className="auth-label" htmlFor="signup-email">
						Email address
					</label>
					<input
						className="auth-input"
						id="signup-email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>

				<div>
					<label className="auth-label" htmlFor="signup-password">
						Create a password
					</label>
					<input
						className="auth-input"
						id="signup-password"
						type="password"
						placeholder="At least 6 characters"
						autoComplete="new-password"
						minLength={6}
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
					{isSubmitting ? "Creating account..." : "Create account"}
					{!isSubmitting && (
						<FaArrowRight aria-hidden="true" className="text-sm" />
					)}
				</button>
			</form>

			<p className="mt-6 text-center text-sm text-slate-500">
				Already have an account?{" "}
				<Link
					to="/user-login"
					className="font-bold text-emerald-700 hover:text-emerald-800"
				>
					Sign in
				</Link>
			</p>
		</AuthLayout>
	);
};

export default UserSignUp;
