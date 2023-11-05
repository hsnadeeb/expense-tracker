import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import NavbarC from './components/Navbar';
import Welcome from './components/pages/Welcome';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsSignedUp(true);
    }
  }, []);

  return (
    <Router>
      <NavbarC />
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup setIsSignedUp={setIsSignedUp} />} />
          <Route path="/login" element={<Login setIsSignedUp={setIsSignedUp} />} />
          {isSignedUp && (
            <Route
              path="/home"
              element={
                <div>
                  <NavbarC /> {/* You can include the Navbar in the Home component */}
                  <Home />
                </div>
              }
            />
          )}
          {isSignedUp && <Route path="/profile" element={<Profile />} />}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
