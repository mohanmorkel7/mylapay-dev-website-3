import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/reveal";
import ScrollScale from "@/components/ui/scroll-scale"; 
import ScrollStack from "./components/ScrollStack";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import GlobalSection from "./components/GlobalSection";
import ScaleSection from "./components/ScaleSection";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/ProductsSection";
import CountersSection from "./components/CountersSection";
import ClientsSection from "./components/ClientsSection";
import Testimonials from "./components/Testimonials";
import Who from "./components/Who";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import Whonew from "./components/Whonew";
  // useEffect(() => {
  //   window.onbeforeunload = () => {
  //     window.scrollTo(0, 0);
  //   };
  // }, []);
export default function Index() {





  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <section className="relative z-10">
        {/* Hero content (video plays only in this section) */}
        <HeroSection/>
        {/* Content sections for anchors */}
        <About/>
        {/* Global map section */}
        <GlobalSection/>
      </section>
        {/* Scroll stack section */}
      <ScrollStack />
      <section className="relative z-10">

        {/* Scale section */}     
        <ScaleSection/>
        {/* features */}
        <FeaturesSection/>
        {/* products */}
        <ProductsSection/>
        {/* Counters */}
        <CountersSection/>
        {/* clients */}
        <ClientsSection/>
        {/* testimonials */}
        <Testimonials/>
        {/* who we are */}
        {/* <Who/> */}
        <Whonew/>
        {/* Footer */}
        <Footer/>
      </section>
    </main>
  );
}
