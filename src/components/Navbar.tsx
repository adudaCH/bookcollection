import { FunctionComponent, useContext, useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllUsers } from "../sevices/userService";
import {
    Button,
    Form,
    Nav,
    Navbar as BootstrapNavbar,
    Container,
} from "react-bootstrap";
import { ThemeContext } from "../sevices/darkLightTheme";
import "../styleSheet/navbar.css";
import { Users } from "../interfaces/Interfaces";
import { UserContext } from "./context/userContext";

interface NavbarProps {
    logIn: boolean;
    
}

const Navbar: FunctionComponent<NavbarProps> = ({ logIn }) => {
    const name = sessionStorage.getItem("userName");
    // const [users, setUsers] = useState<Users[]>([]);
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    //     sessionStorage.getItem("loggedIn") === "true"
    // );
    const navigate = useNavigate();
    
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext) || {};

    // useEffect(() => {
    //     setIsLoggedIn(sessionStorage.getItem("loggedIn") === "true");
    // }, [logIn]);

    useEffect(() => {
        // const userName = sessionStorage.getItem("userName");
        // if (userName) {
        //     getAllUsers("")
        //         .then((res) => {
        //             const currentUser = res.data.find((user: Users) => user.name === userName);
        //             if (currentUser) {
        //                 setUsers([currentUser]);
        //             }
        //         })
        //         .catch((err) => {
        //             console.log("Error fetching users:", err);
        //         });
        // }
        console.log(user);
        console.log(isLoggedIn);
    }, [logIn]);

    const handleLogout = async () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.setItem("loggedIn", "false");
        if(setIsLoggedIn && setUser){
            setIsLoggedIn(false);
            const user:Users  = {email:"",password:"",name:""}
            setUser(user)
        }
        navigate("/");
    };

    return (
        <BootstrapNavbar bg="light" expand="lg" className="navbar-custom">
            <Container>
                <BootstrapNavbar.Brand
                    as={NavLink}
                    to="/"
                    className="library carter-one-regular">
                    Library
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Form className="d-flex align-items-center flex-wrap justify-content-between w-100">
                        {/* Dark Mode Toggle */}
                        <div className="me-3">
                            {/* darkMode */}
                        </div>

                        {/* User info and logout button */}
                        {user && isLoggedIn && (
                            <div className="d-flex align-items-center flex-wrap">
                                <h5 className="title me-3 d-sm-inline">
                                    Hello {user.name}
                                </h5>
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
