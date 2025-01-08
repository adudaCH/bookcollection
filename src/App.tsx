import React, { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import Home from './components/Home';
import AddNewBook from './components/AddNewBook';
import BooksTable from './components/BooksTable';
import Registry from './components/Registry';








function App() {
  return (
    <div className="App">
      <Router>
        <Navbar logIn={false} />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/addNewBook" element={<AddNewBook/>} />
          <Route path="/books" element={<BooksTable />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
