import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {!isSignedUp && <Route path="/signup" element={<Signup setIsSignedUp={setIsSignedUp} />} />}
          {isSignedUp && <Route path="/" element={<Home/>} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
