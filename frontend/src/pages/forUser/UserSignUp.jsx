import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import { userRegister } from "../../apis/api";

const UserSignup = () => {
	const [name, setName] = useState({});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const { user, setUser } = useContext(UserDataContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const newUser = {
			fullName: {
				firstName: name.firstName,
				lastName: name.lastName,
			},
			email,
			password,
		};

		try {
			const res = await userRegister(newUser);
			if (res.status === 201) {
				localStorage.setItem("token", res.data.token);
				setUser(res.data);
				navigate("/home");
			}
		} catch (error) {
			console.log(error);
			if (
				error.response &&
				error.response.data &&
				error.response.data.error
			) {
				setError(error.response.data.error[0].msg);
			} else {
				setError("something went wrong!");
			}
		}
	};
	return (
		<div>
			<div className="h-screen w-full flex justify-between flex-col">
				<div className="logo">Taxi</div>
				<div className="p-7 flex flex-col justify-between flex-1">
					<div>
						<form onSubmit={(e) => handleSubmit(e)}>
							<h3 className="text-lg w-1/2  font-medium mb-2">
								What's your name
							</h3>
							<div className="flex gap-4 mb-7">
								<input
									required
									className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
									type="text"
									placeholder="First name"
									value={name.firstName}
									onChange={(e) =>
										setName((prev) => ({
											...prev,
											firstName: e.target.value,
										}))
									}
								/>
								<input
									required
									className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
									type="text"
									placeholder="Last name"
									value={name.lastName}
									onChange={(e) =>
										setName((prev) => ({
											...prev,
											lastName: e.target.value,
										}))
									}
								/>
							</div>

							<h3 className="text-lg font-medium mb-2">
								What's your email
							</h3>
							<input
								required
								className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
								type="email"
								placeholder="email@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<h3 className="text-lg font-medium mb-2">
								Enter Password
							</h3>

							<input
								className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
								required
								type="password"
								placeholder="password"
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
								className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
							>
								Create account
							</button>
						</form>
						<p className="text-center">
							Already have a account?{" "}
							<Link to="/user-login" className="text-blue-600">
								Login here
							</Link>
						</p>
					</div>
					<div>
						<p className="text-[10px] leading-tight">
							This site is protected by reCAPTCHA and the{" "}
							<span className="underline">
								Google Privacy Policy
							</span>{" "}
							and{" "}
							<span className="underline">
								Terms of Service apply
							</span>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserSignup;
