import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	useEffect(() => {
		if (!token && role === "user") {
			navigate("/user-login");
		}
		if (!token && role === "captain") {
			navigate("/captain-login");
		}
		if (!token && !role) {
			navigate("/");
		}
	}, [token, role]);

	return <>{children}</>;
};

export default UserProtectedRoute;
