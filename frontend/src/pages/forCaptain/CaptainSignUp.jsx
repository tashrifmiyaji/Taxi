import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AuthLayout from "../../components/AuthLayout";
import { signupCaptain } from "../../apis/captainApi";
import { useCaptainContext } from "../../context/CaptainContext";

const CaptainSignUp = () => {
	const navigate = useNavigate();
	const { setCaptain } = useCaptainContext();
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [name, setName] = useState({ firstName: "", lastName: "" });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [vehicle, setVehicle] = useState({
		color: "",
		vehicleNumber: "",
		capacity: "",
		vehicleType: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await signupCaptain({
				fullName: name,
				email,
				password,
				vehicle,
			});
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
					"Unable to create your account. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Become a captain"
			description="Set up your profile and start driving with Taxi."
			accountType="captain"
			switchHref="/user-signup"
			switchPrompt="Looking for a ride?"
			switchLabel="Create a rider account"
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
					<label className="auth-label" htmlFor="captain-signup-email">
						Email address
					</label>
					<input
						className="auth-input"
						id="captain-signup-email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>

				<div>
					<label
						className="auth-label"
						htmlFor="captain-signup-password"
					>
						Create a password
					</label>
					<input
						className="auth-input"
						id="captain-signup-password"
						type="password"
						placeholder="At least 6 characters"
						autoComplete="new-password"
						minLength={6}
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>

				<fieldset className="space-y-4 rounded-2xl border border-slate-200 p-4 sm:p-5">
					<legend className="px-1 text-sm font-bold text-slate-800">
						Vehicle details
					</legend>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<input
							className="auth-input"
							type="text"
							placeholder="Vehicle color"
							autoComplete="off"
							required
							value={vehicle.color}
							onChange={(event) =>
								setVehicle((previous) => ({
									...previous,
									color: event.target.value,
								}))
							}
						/>
						<input
							className="auth-input"
							type="text"
							placeholder="Plate number"
							autoComplete="off"
							minLength={4}
							required
							value={vehicle.vehicleNumber}
							onChange={(event) =>
								setVehicle((previous) => ({
									...previous,
									vehicleNumber: event.target.value,
								}))
							}
						/>
						<input
							className="auth-input"
							type="number"
							placeholder="Passenger capacity"
							min={1}
							required
							value={vehicle.capacity}
							onChange={(event) =>
								setVehicle((previous) => ({
									...previous,
									capacity: event.target.value,
								}))
							}
						/>
						<select
							className="auth-input"
							aria-label="Vehicle type"
							required
							value={vehicle.vehicleType}
							onChange={(event) =>
								setVehicle((previous) => ({
									...previous,
									vehicleType: event.target.value,
								}))
							}
						>
							<option value="" disabled>
								Select vehicle type
							</option>
							<option value="car">Car</option>
							<option value="bike">Bike</option>
						</select>
					</div>
				</fieldset>

				{error && (
					<p
						role="alert"
						className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
					>
						{error}
					</p>
				)}

				<button className="btn-primary gap-2" disabled={isSubmitting}>
					{isSubmitting ? "Creating account..." : "Create captain account"}
					{!isSubmitting && (
						<FaArrowRight aria-hidden="true" className="text-sm" />
					)}
				</button>
			</form>

			<p className="mt-6 text-center text-sm text-slate-500">
				Already have an account?{" "}
				<Link
					to="/captain-login"
					className="font-bold text-emerald-700 hover:text-emerald-800"
				>
					Sign in
				</Link>
			</p>
		</AuthLayout>
	);
};

export default CaptainSignUp;
