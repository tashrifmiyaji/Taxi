import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { userProfile } from "../apis/api";
import { UserDataContext } from "../context/UserContext";
import LoadingScreen from "../components/LoadingScreen";

const UserProtectedRoute = ({ children }) => {
	const { setUser } = useContext(UserDataContext);

	const [isChecking, setIsChecking] = useState(true);
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	useEffect(() => {
		(async () => {
			if (!token) {
				navigate("/user-login");
				return;
			}
			try {
				const res = await userProfile(token);
				setUser(res.data);
				setIsChecking(false);
			} catch (error) {
				console.log("Profile check failed:", error);
				navigate("/user-login");
			}
		})();
	}, [token, navigate, setUser]);

	if (isChecking) {
		return (
			<LoadingScreen
				title="Checking your account"
				message="Verifying your rider session securely."
			/>
		);
	}

	return <>{children}</>;
};

export default UserProtectedRoute;
