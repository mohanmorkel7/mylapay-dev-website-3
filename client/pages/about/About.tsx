import WhoWeAre from "./components/WhoWeAre"
import WeSpecialist from "./components/WeSpecialist"
import Footer from "@/components/layout/Footer"
import OurStory from "./components/OurStory";
import Founders from "./components/Founders";
import OurCulture from "./components/OurCulture";
import Gallery from "./components/Gallery"
export default function About(){
    return(
        <>
        <WhoWeAre/>
        {/* <WeSpecialist/> */}
        <OurStory/>
        <Founders/>
        <OurCulture/>
        <Gallery/>
        <Footer/>
        </>
    );
}