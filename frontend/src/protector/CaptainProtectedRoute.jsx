import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { captainProfile } from "../apis/captainApi";
import { useCaptainContext } from "../context/CaptainContext";
import LoadingScreen from "../components/LoadingScreen";

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
	}, [navigate, token, setCaptain]);

	if (isChecking) {
		return (
			<LoadingScreen
				title="Checking your account"
				message="Verifying your captain session securely."
			/>
		);
	}

	return <>{children}</>;
};

export default CaptainProtectedRoute;
