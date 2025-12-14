import CustomCursor from "./Components/CustomCursor";
import Navbar from "./Components/Navbar";
import ParticleBackground from "./Components/ParticleBackground";
import About from "./Sections/About";
import Contact from "./Sections/Contact";
import Experience from "./Sections/Experience";
import Footer from "./Sections/Footer";
import Home from "./Sections/Home";
import Projects from "./Sections/Projects";
import Skills from "./Sections/Skills";
import IntroAnimation from "./Components/IntroAnimation";
import React from "react";

export default function App(){

  const [introDone, setIntroDone] = React.useState(false)
  return(

    <>
   {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)}/>}

    {introDone && (



    <div className="relative gradient text-white">
      {/* <CustomCursor/> */}

      {/* <ParticleBackground/> */}
    <Navbar/>
    <Home/>
    <About/>
    <Skills/>
    <Projects/>
    <Experience/>
    <Contact/>
    <Footer/>
   </div>
   )}
   </>
  )
}
