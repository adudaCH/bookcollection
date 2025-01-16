import { FunctionComponent, useContext, useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllUsers } from "../sevices/userService"; 
import { Button, Form, Nav, Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import { ThemeContext } from "../sevices/darkLightTheme";
import "../styleSheet/navbar.css";
import { Users } from "../interfaces/Interfaces";

interface NavbarProps {
    logIn: boolean;
    changeMode: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ logIn, changeMode }) => {
    const name = sessionStorage.getItem("userName");
    const [users, setUsers] = useState<Users[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        sessionStorage.getItem("loggedIn") === "true"
    );
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);

    useEffect(() => {
        setIsLoggedIn(sessionStorage.getItem("loggedIn") === "true");
    }, [logIn]);

    useEffect(() => {
        const userName = sessionStorage.getItem("userName");
        if (userName) {
            getAllUsers("")
                .then((res) => {
                    const currentUser = res.data.find((user: Users) => user.name === userName);
                    if (currentUser) {
                        setUsers([currentUser]);
                    }
                })
                .catch((err) => {
                    console.log("Error fetching users:", err);
                });
        }
    }, [logIn]);

    const handleLogout = () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.setItem("loggedIn", "false");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <BootstrapNavbar bg="light" expand="lg" className="navbar-custom">
            <Container>
                <BootstrapNavbar.Brand as={NavLink} to="/" className="library carter-one-regular">
                    Library
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Form className="d-flex align-items-center flex-wrap justify-content-between w-100">
                        {/* Dark Mode Toggle */}
                        <div className="me-3">
                            <button
                                style={{ color: theme.color }}
                                className="navIcon"
                                onClick={() => changeMode()}>
                                <FaMoon />
                            </button>
                        </div>
                        
                        {/* User info and logout button */}
                        {isLoggedIn && users.length > 0 && (
                            <div className="d-flex align-items-center flex-wrap">
                                <h5 className="title me-3 d-none d-sm-inline">Hello {users[0].name}</h5>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger btn-sm mt-2 mt-sm-0">
                                    Log Out
                                </button>
                            </div>
                        )}
                    </Form>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
