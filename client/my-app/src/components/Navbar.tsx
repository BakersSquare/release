import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../state/index"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthReduxState } from "../utils/types";
import { Intent } from "@blueprintjs/core";
import { createToast } from "../utils/util";

type Props = {
  isOpen: boolean,
  toggleMenu: () => void,
  toggleSignIn: () => void,
  toggleProfile: () => void
};

function Navbar (props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state: AuthReduxState) => state.token))

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
            { isAuth ? 
            <Link to="/" onClick={() => {
              dispatch(
                setLogout()
              )
              if(props.isOpen) {
                props.toggleMenu();
              }
              createToast("Now logged out!", Intent.PRIMARY)
            }}>Log Out</Link> 
            :
             (
                <div className="sign-in-label"onClick={() => {
                  if(props.isOpen) {
                    props.toggleMenu();
                  }
                  props.toggleSignIn();
                }}>Log In</div>
            )}
          </li>  
          {isAuth ? (
            <li>
                <div className="sign-in-label"onClick={() => {
                  if(props.isOpen) {
                    props.toggleMenu();
                  }
                  props.toggleProfile();
                }}>Profile</div>

            </li> ):
             <></>}       
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