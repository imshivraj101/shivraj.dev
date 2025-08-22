import React from 'react'
import Home from "../components/Home";
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Blogs from '../components/Blogs';



const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Home />
       <Projects limit={4} />
      <Blogs limit = {3}/>
      <Experience/>
    </div>
  )
}

export default HomePage