import { useState } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/Logo.png"
import { FiMenu } from "react-icons/fi";
import AnimatedButton from "./AnimatedButton";

export default function Navbar(){
 
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50">

            <div className="flex items-center space-x-2">
                <img src={Logo} alt="logo" className="w-10 h-10"  />
                {/* <div className="text-2xl font-bold text-white hidden sm:block">Shivayogi</div> */}

            </div>

            <div className="block lg:absolute lg:left-1/2 transform -translate-x-1/2">

                <button onClick={()=>setMenuOpen(true)} className="text-white text-3xl focus:outline-none"
                    aria-label="open Menu">
                 <FiMenu />
                </button>

            </div>

            <div className="hidden lg:block">
                <AnimatedButton href="#contact">
                    Reach Out
                </AnimatedButton>
            </div>


        </nav>
        


        <OverlayMenu isOpen = {menuOpen} onClose={()=> setMenuOpen(false)}/>
        </>
    )
}