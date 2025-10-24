import "./App.css";
import { Routes, Route } from "react-router";
import Start from "./pages/Start";
import Home from "./pages/forUser/Home";
import UserSignUp from "./pages/forUser/UserSignUp";
import UserLogin from "./pages/forUser/UserLogin";
import UserLogout from "./pages/forUser/UserLogout";
import UserProtectedRoute from "./routes/UserProtectedRoute";
import CaptainSignUp from "./pages/forCaptain/CaptainSignUp";
import CaptainLogin from "./pages/forCaptain/CaptainLogin";

function App() {
	return (
		<>
			<div>
				<Routes>
					<Route path="/" element={<Start />} />
					<Route
						path="/home"
						element={
							<UserProtectedRoute>
								<Home />
							</UserProtectedRoute>
						}
					/>
					<Route path="/user-signup" element={<UserSignUp />} />
					<Route path="/user-login" element={<UserLogin />} />
					<Route
						path="/user-logout"
						element={
							<UserProtectedRoute>
								<UserLogout />
							</UserProtectedRoute>
						}
					/>
					<Route path="/captain-signup" element={<CaptainSignUp />} />
					<Route path="/captain-login" element={<CaptainLogin />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
