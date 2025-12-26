import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { userProfile } from "../apis/api";
import { UserDataContext } from "../context/UserContext";

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
	}, [token, navigate]);

	if (isChecking) return <div>Checking authentication...</div>;

	return <>{children}</>;
};

export default UserProtectedRoute;
