import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		setEmail("");
		setPassword("");
	};

	return (
		<div>
			<div className="h-screen w-full flex justify-between flex-col">
				<div className="logo">Taxi</div>
				<div className="p-7 flex flex-col justify-between flex-1">
					<div>
						<form onSubmit={(e) => submitHandler(e)}>
							<h3 className="text-lg font-medium mb-2">
								What's your email
							</h3>
							<input
								className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
								type="email"
								placeholder="email@example.com"
								required
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button
								type="submit"
								className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
							>
								Login
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
