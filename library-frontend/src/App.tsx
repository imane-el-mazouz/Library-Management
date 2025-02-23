import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BooksList from './pages/BooksList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<LibrarianDashboard />} />
                <Route path="/bookslist" element={<BooksList />} />

            </Routes>
        </Router>
    );
}

export default App;