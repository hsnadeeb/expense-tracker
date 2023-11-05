import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import NavbarC from './components/Navbar';
import Welcome from './components/pages/Welcome';
import LoginVerification from './components/pages/LoginVerification';
import PasswordReset from './components/pages/PasswordReset';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
          <Route path="/loginverification" element={<LoginVerification setIsVerified={setIsVerified} />} /> 
          <Route path="/passwordreset" element={<PasswordReset />} />
          {isSignedUp && (
            <Route
              path="/home"
              element={
                <div>
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
