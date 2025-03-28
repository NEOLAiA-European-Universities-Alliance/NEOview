import './App.css';
import MobilityDash from './pages/mobility_dash';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Router basename='/mobilitywindow'>
        <Routes>
          <Route basename={'/mobilitywindow'} path='*' element={<MobilityDash />} /> 
        </Routes>
      </Router>
  );
}

export default App;
