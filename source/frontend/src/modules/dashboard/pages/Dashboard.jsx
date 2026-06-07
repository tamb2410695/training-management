import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

            if (!user) {

        return (
            <Navigate to="/login" />
        );

    }

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (
        <div>

            <h2>Dashboard</h2>

            <p>
                Welcome {user.username}
            </p>

            <p>
                Role: {user.role}
            </p>

            <button
                className="btn btn-danger"
                onClick={handleLogout}
            >
                Logout
            </button>


        </div>


    );
}

export default Dashboard;