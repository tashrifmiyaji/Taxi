import "./App.css";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserProtectedRoute from "./protector/UserProtectedRoute";
import CaptainProtectedRoute from "./protector/CaptainProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";

const Start = lazy(() => import("./pages/Start"));
const Home = lazy(() => import("./pages/forUser/Home"));
const UserSignUp = lazy(() => import("./pages/forUser/UserSignUp"));
const UserLogin = lazy(() => import("./pages/forUser/UserLogin"));
const UserLogout = lazy(() => import("./pages/forUser/UserLogout"));
const CaptainHome = lazy(() => import("./pages/forCaptain/CaptainHome"));
const CaptainSignUp = lazy(() => import("./pages/forCaptain/CaptainSignUp"));
const CaptainLogin = lazy(() => import("./pages/forCaptain/CaptainLogin"));
const Riding = lazy(() => import("./pages/forUser/Riding"));
const CaptainRiding = lazy(() => import("./pages/forCaptain/CaptainRiding"));
const CaptainLogout = lazy(() => import("./pages/forCaptain/CaptainLogout"));

function App() {
	return (
		<Suspense fallback={<LoadingScreen />}>
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
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Suspense>
	);
}

export default App;
