import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../apis/api";
import LoadingScreen from "../../components/LoadingScreen";

const UserLogout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const handleLogout = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					navigate("/user-login");
					return;
				}

				const res = await userLogout(token);
				if (res?.status === 200) {
					localStorage.removeItem("token");
					navigate("/user-login");
				}
			} catch {
				localStorage.removeItem("token");
				navigate("/user-login");
			}
		};

		handleLogout();
	}, [navigate]);

	return (
		<LoadingScreen
			title="Signing you out"
			message="Securing your rider account."
		/>
	);
};

export default UserLogout;
