import { Link } from "react-router-dom";


function Footer() {
  return (
    <div>
      <div className="footer" style={{background:"lightgray"}}>
      <div className="column">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/">Advertise</Link></li>
            <li><Link to="/">Terms of use</Link></li>
          </ul>
      </div>
    </div>
    <div className="copyright-claim">
      Content copyright 2022. Re-lease. All rights reserved.
    </div>
  </div>
  );
}

export default Footer;