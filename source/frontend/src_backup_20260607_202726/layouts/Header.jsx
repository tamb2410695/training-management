import { Link } from "react-router-dom";

function Header() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >
                    Training Management
                </Link>

                <div className="collapse navbar-collapse">

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/courses"
                            >
                                Courses
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/classes"
                            >
                                Classes
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/students"
                            >
                                Students
                            </Link>
                        </li>

                    </ul>

                    <span className="text-light me-3">
                        {user?.username}
                    </span>

                </div>

            </div>

        </nav>
    );
}

export default Header;