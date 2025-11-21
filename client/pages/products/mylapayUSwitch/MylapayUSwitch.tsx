import Hero from "./components/Hero";
import CoreBenefit from "./components/CoreBenefit";
import ValueAdded from "./components/ValueAdded";
import Faq from "@/components/layout/Faq"
import Footer from "@/components/layout/Footer";
import CCC from  "@/components/layout/TwoComponents";
import Achivements from "./components/Achivements"

export default function MylapayUSwitch() {
    return(
        <div>
            <Hero/>
            <CoreBenefit/>
            <ValueAdded/>
            <Achivements/>
            <CCC/>
            <Faq/>
            <Footer/>
        </div>
    );
}