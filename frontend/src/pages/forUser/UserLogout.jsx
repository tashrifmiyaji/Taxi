import { useEffect } from "react";
import { useNavigate } from "react-router";
import { userLogout } from "../../apis/api";

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
			} catch (error) {
				localStorage.removeItem("token");
				navigate("/user-login");
			}
		};

		handleLogout();
	}, []);

	return null
};

export default UserLogout;
