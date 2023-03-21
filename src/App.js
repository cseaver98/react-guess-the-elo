import React from 'react';
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import About from './components/About';
import Play from './components/Play';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;