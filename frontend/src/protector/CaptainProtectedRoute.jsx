import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { captainProfile } from "../apis/captainApi";
import { useCaptainContext } from "../context/CaptainContext";

const CaptainProtectedRoute = ({ children }) => {
	const { setCaptain } = useCaptainContext();

	const navigate = useNavigate();
	const [isChecking, setIsChecking] = useState(true);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const verifyCaptain = async () => {
			if (!token) {
				navigate("/captain-login");
				return;
			}

			try {
				const res = await captainProfile(token);
				setCaptain(res.data)
				setIsChecking(false);
			} catch (error) {
				console.log("Profile check failed:", error);
				navigate("/captain-login");
			}
		};

		verifyCaptain();
	}, [navigate, token]);

	if (isChecking) return <div>Checking authentication...</div>;

	return <>{children}</>;
};

export default CaptainProtectedRoute;
