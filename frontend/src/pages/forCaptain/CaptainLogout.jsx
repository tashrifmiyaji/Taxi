import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { captainLogout } from "../../apis/captainApi";
import LoadingScreen from "../../components/LoadingScreen";

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
            } catch {
                localStorage.removeItem("token");
                navigate("/captain-login");
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <LoadingScreen
            title="Signing you out"
            message="Securing your captain account."
        />
    );
};

export default CaptainLogout;
