import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/index"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  isOpen: boolean,
  toggleMenu: () => void,
  toggleSignIn: () => void
};

function Navbar (props: Props) {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);

  return (
      <div className="header">
        <Link to="/"><h1> Re-Lease </h1></Link>
        <ul className={`nav-menu ${props.isOpen ? "active" : "inactive"}`}>
          <li onClick={() => {
                  if(props.isOpen) {
                    props.toggleMenu();
                  }
          }}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => {
                  if(props.isOpen) {
                    props.toggleMenu();
                  }
          }}>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <div className="sign-in-label"onClick={() => {
              if(props.isOpen) {
                props.toggleMenu();
              }
              props.toggleSignIn();
            }}>Register</div>
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