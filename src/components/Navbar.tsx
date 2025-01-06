import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../sevices/userService"; // Update the path as per your project structure.

const Navbar: FunctionComponent = () => {
    const email = sessionStorage.getItem("userEmail") || "";
    const [users, setUsers] = useState<{ name: string }[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        sessionStorage.getItem("loggedIn") === "true"
    );
    const navigate = useNavigate();

    // Fetch users when the component mounts or email changes
    useEffect(() => {
        if (isLoggedIn && email) {
            getAllUsers(email)
                .then((response) => {
                    setUsers(response.data); // Ensure `response.data` matches the format of your API.
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, [email, isLoggedIn]);

    const handleLogout = () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.setItem("loggedIn", "false");
        setIsLoggedIn(false);
        navigate("/"); // Redirect to login page or home page.
    };

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">library</a>
                {isLoggedIn && (
                    <p>
                        Hello {users && users.length > 0 ? users[0].name : "Guest"}!
                    </p>
                )}
                {isLoggedIn && (
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                </button>)}
            </div>
        </nav>
    );
};

export default Navbar;
