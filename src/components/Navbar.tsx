import { FunctionComponent, useContext, useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllUsers } from "../sevices/userService"; 
import { Button, Form, Nav, Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import { ThemeContext } from "../sevices/darkLightTheme";
import "../styleSheet/navbar.css";
import { Users } from "../interfaces/Interfaces";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface NavbarProps {
    logIn: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ logIn }) => {
    const email = sessionStorage.getItem("userEmail");
    const [users, setUsers] = useState<Users[]>([])
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

    useEffect(() => {
		getAllUsers("")
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

<BootstrapNavbar bg="light" expand="lg">
            <Container>
                <BootstrapNavbar.Brand as={NavLink} to="/" className="library carter-one-regular">
                    Library
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Form className="d-flex align-items-center">
                        <div className="form-check form-switch me-3">
                        <Button
                            style={{ color: theme.color }}
                            className="navIcon"
                            onClick={() => changeMode()}>
                            <FaMoon className="navIcon" />
                        </Button>
                        </div>
                        {isLoggedIn && (
                            <div className="d-flex align-items-center">
                                <h5 className="title me-3">
                                    {users.length > 0 ? `Hello ${users[0].email}` : ""}
                                </h5>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger">
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
