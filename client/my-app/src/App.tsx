import "./App.scss"
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Homepage from "./components/Homepage"  
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom"
import Contact from "./components/Contact"
import SignInCard from "./components/SignInCard"
import { Position, Toaster } from "@blueprintjs/core";
import ProfileInfoCard from "./components/ProfileInfoCard";

export const serverURL = process.env.REACT_APP_SERVER_URL;

export const AppToaster = Toaster.create({
  position: Position.TOP,
  maxToasts: 3
})

function App() {

  // // redux, 2hr25min
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  

  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSignInCard, setSignInCard] = useState(false);
  const hamburgerClick = (): void => {
    setOpenNavMenu(!openNavMenu);
  }
  const signInClick = (): void => {
    setSignInCard(!openSignInCard);
  }
  const profileClick = (): void => {
    setOpenProfile(!openProfile);
  }

  return (
    <BrowserRouter>
    <div className="app-container">
      
      <Navbar isOpen={openNavMenu} toggleMenu={hamburgerClick} toggleSignIn={signInClick} toggleProfile={profileClick}/>
      <SignInCard isOpen={openSignInCard} toggleSignIn={signInClick}/>
      <ProfileInfoCard isOpen={openProfile} toggleProfile={profileClick}/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
