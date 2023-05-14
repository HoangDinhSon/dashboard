import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// logic

// self made
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Fragment>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
