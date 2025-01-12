import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import AddNewBook from "./components/AddNewBook";
import BooksTable from "./components/BooksTable";
import Registry from "./components/Registry";
import { ToastContainer } from "react-toastify";
import { BookProvider } from "./components/context/bookContext";
import { ThemeContext } from "./sevices/darkLightTheme";

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setTheme((prevTheme: any) => !prevTheme);
    };

    return (
        <div className="App" >
            {/* <ThemeContext.Provider> */}

            <ToastContainer />
            <BookProvider>
                <Router>
                    <Navbar logIn={false} />
                    <Routes>
                        <Route path="/" element={<LogIn />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/registry" element={<Registry />} />
                        <Route path="/addNewBook" element={<AddNewBook />} />
                        <Route path="/books" element={<BooksTable />} />
                    </Routes>
                </Router>
            </BookProvider>
            {/* </ThemeContext.Provider> */}
        </div>
    );
}

export default App;
