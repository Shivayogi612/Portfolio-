import { useState } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/Logo.png"
import { FiMenu } from "react-icons/fi";


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
                <a
                    href="#contact"
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">Reach Out</span>
                </a>
            </div>


        </nav>
        


        <OverlayMenu isOpen = {menuOpen} onClose={()=> setMenuOpen(false)}/>
        </>
    )
}