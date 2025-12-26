import "./App.css";
import { Routes, Route } from "react-router";
import Start from "./pages/Start";
import Home from "./pages/forUser/Home";
import UserSignUp from "./pages/forUser/UserSignUp";
import UserLogin from "./pages/forUser/UserLogin";
import UserLogout from "./pages/forUser/UserLogout";
import UserProtectedRoute from "./protector/UserProtectedRoute";
import CaptainHome from "./pages/forCaptain/CaptainHome";
import CaptainSignUp from "./pages/forCaptain/CaptainSignUp";
import CaptainLogin from "./pages/forCaptain/CaptainLogin";
import CaptainProtectedRoute from "./protector/CaptainProtectedRoute";
import Riding from "./pages/forUser/Riding";
import CaptainRiding from "./pages/forCaptain/CaptainRiding";
import CaptainLogout from "./pages/forCaptain/CaptainLogout";

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
						path="/riding"
						element={
							<UserProtectedRoute>
								<Riding />
							</UserProtectedRoute>
						}
					/>
					<Route
						path="/user-logout"
						element={
							<UserProtectedRoute>
								<UserLogout />
							</UserProtectedRoute>
						}
					/>
					{/* ------ */}
					<Route path="/captain-signup" element={<CaptainSignUp />} />
					<Route path="/captain-login" element={<CaptainLogin />} />
					<Route
						path="/captain-home"
						element={
							<CaptainProtectedRoute>
								<CaptainHome />
							</CaptainProtectedRoute>
						}
					/>
					<Route
						path="/captain-riding"
						element={
							<CaptainProtectedRoute>
								<CaptainRiding />
							</CaptainProtectedRoute>
						}
					/>
					<Route
						path="/captain-logout"
						element={
							<CaptainProtectedRoute>
								<CaptainLogout />
							</CaptainProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
