import React from "react";
import Hero from "../component/Hero";
import Biography from "../component/Biography";

function AboutUs() {
  return (
    <>
       <Hero
        title={"Learn More About Us | E-Care Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />


    </>
  )
}

export default AboutUs