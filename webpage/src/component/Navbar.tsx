import { Fragment } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="fixed">
      <ul className="">
        <li>
          <Link to="/">Dashboard</Link>{" "}
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
