import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <div>
              <h1>Welcome to the Expense Tracker</h1>
              <Signup setIsSignedUp={setIsSignedUp} />
              <Login setIsSignedUp={setIsSignedUp} />
            </div>
          } />
          {isSignedUp && <Route path='/home' element={<Home />}/> }
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// function App() {
//   const [isSignedUp, setIsSignedUp] = useState(false);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path='/signup' element={<Signup setIsSignedUp={setIsSignedUp} />} />
//           {isSignedUp ? (
//             <Route path='/' element={<Home />} />
//           ) : (
//             <Route path='login' element={<Login setIsSignedUp={setIsSignedUp} />} />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


