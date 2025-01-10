import React, { useContext } from "react";
import Hero from "../component/Hero";
import Biography from "../component/Biography";
import MessageForm from "../component/MessageForm";
import Department from "../component/Department"
const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to E-Care Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  );
};

export default Home;
