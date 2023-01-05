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
  const [openSignInCard, setSignInCard] = useState(false);
  const hamburgerClick = (): void => {
    setOpenNavMenu(!openNavMenu);
  }
  const signInClick = (): void => {
    setSignInCard(!openSignInCard);
  }
  return (
    <BrowserRouter>
      <Navbar isOpen={openNavMenu} toggleMenu={hamburgerClick} toggleSignIn={signInClick}/>
      <SignInCard isOpen={openSignInCard} toggleSignIn={signInClick}/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
