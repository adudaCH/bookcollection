import { FunctionComponent, useContext, useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllUsers } from "../sevices/userService"; // Update the path as per your project structure.
import { Button } from "react-bootstrap";
import { ThemeContext } from "../sevices/darkLightTheme";
import "../styleSheet/themeToggle.css";

interface NavbarProps {
    logIn: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ logIn }) => {
    const email = sessionStorage.getItem("userEmail");
    // const [users, setUsers] = useState<{ name: string }[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        sessionStorage.getItem("loggedIn") === "true"
    );
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);
    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem("loggedIn");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
        }
    }, [logIn]);

    const handleLogout = () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.setItem("loggedIn", "false");
        setIsLoggedIn(false);
        navigate("/");
    };

    function changeMode(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <NavLink
                    className="navbar-brand me-5 carter-one-regular"
                    to="/">
                    Library
                </NavLink>
                <hr />
                {isLoggedIn && (
                    <ul className="navbar-nav text-dark mt-2 d-flex">
                        <li className="nav-item">
                            <h5 className="card-title">{email || ""}</h5>
                        </li>
                        <li>
                            <Button className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </Button>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger">
                                Log Out
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
