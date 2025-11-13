import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { userProfile } from "../apis/api";

const UserProtectedRoute = ({ children }) => {
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
				await userProfile(token);
				setIsChecking(false);
			} catch (error) {
				console.log("Profile check failed:", error);
				navigate("/user-login");
			}
		})();
	}, [token, navigate]);

	if (isChecking) return <div>Checking authentication...</div>;

	return <>{children}</>;
};

export default UserProtectedRoute;
