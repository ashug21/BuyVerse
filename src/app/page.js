"use client"

import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import MultiDeals from "@/components/MoreTopDeals/MoreTopDeals";
import Navbar from "@/components/Navbar/Navbar";
import PopularSection from "@/components/Popular/Popular";
import TopDeals from "@/components/TopDeals/TopDeals";
import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    const startServer = async () => {
      try {
        await fetch("/api/startServer", { cache: "no-store" });
        console.log("Server waked up successfully");
      } catch (err) {
        console.error("Server warm-up failed");
      }
    };
  
    startServer();
  }, []);

  return (
    <div>
      <Navbar />
      <br /> <br /> <br />
      <Banner />
      <br />
      <br />
      <TopDeals />
      <br />
      <MultiDeals />
      <br/> <br/> <br/>
      <PopularSection/>
      <br/><br/><br/><br/>
      <br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default Home;
