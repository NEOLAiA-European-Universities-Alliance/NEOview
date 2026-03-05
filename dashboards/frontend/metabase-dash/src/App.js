import './App.css';
import DashLoader from './pages/DashLoader';
import Home from './pages/home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router basename='/neoview'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:dashId' element={<DashLoader />} />
      </Routes>
    </Router>
  );
}

export default App;
