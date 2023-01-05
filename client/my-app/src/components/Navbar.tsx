import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean,
  toggleMenu: () => void,
  toggleSignIn: () => void
};

function Navbar (props: Props) {

  return (
      <div className="header">
        <Link to="/"><h1> Re-Lease </h1></Link>
        <ul className={`nav-menu ${props.isOpen ? "active" : "inactive"}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <div className="sign-in-label"onClick={(props.toggleSignIn)}>Register</div>
          </li>         
           {/* <li>
            <Link to="/home-owner">For Homeowners</Link>
          </li> */}
        </ul>
        <div className="hamburger" onClick={props.toggleMenu}>
              {props.isOpen ? <FaTimes /> : <FaBars /> }        
        </div>
    </div>
  );
}

export default Navbar;