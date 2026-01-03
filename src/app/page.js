import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import MultiDeals from "@/components/MoreTopDeals/MoreTopDeals";
import Navbar from "@/components/Navbar/Navbar";
import TopDeals from "@/components/TopDeals/TopDeals";
import React from "react";

const Home = () => {
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
      <br/><br/><br/><br/>
      <br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default Home;
