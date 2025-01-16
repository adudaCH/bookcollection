import React, { createContext, useEffect, useState } from "react";
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
import { BooksProvider } from "./components/context/booksContext";
import { ThemeContext, ThemeProvider } from "./sevices/darkLightTheme";

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setTheme((prevTheme: any) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
        document.body.className = theme ? "dark" : "light"; 
    }, [theme]);

    return (
        <div className="App" >
            <ThemeContext.Provider value={{ background: theme ? "dark" : "light", color: theme ? "white" : "black", toggleTheme }}>
            <ToastContainer />
            <BooksProvider>
            <BookProvider>
                <Router>
                    <Navbar logIn={false} changeMode={toggleTheme} />
                    <Routes>
                        <Route path="/" element={<LogIn />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/registry" element={<Registry />} />
                        <Route path="/addNewBook" element={<AddNewBook />} />
                        <Route path="/books" element={<BooksTable />} />
                    </Routes>
                </Router>
            </BookProvider>
            </BooksProvider>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
