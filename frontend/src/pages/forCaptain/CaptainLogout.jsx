import { useEffect } from "react";
import { useNavigate } from "react-router";
import { captainLogout } from "../../apis/captainApi";

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/captain-login");
                    return;
                }

                const res = await captainLogout(token);
                if (res?.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/captain-login");
                }
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/captain-login");
            }
        };

        handleLogout();
    }, []);

    return null;
};

export default CaptainLogout;
