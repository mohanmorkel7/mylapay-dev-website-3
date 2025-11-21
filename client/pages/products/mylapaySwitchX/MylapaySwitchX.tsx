import Hero from "./components/Hero";
import CoreBenefit from "./components/CoreBenefit";
import ValueAdded from "./components/ValueAdded";
import Faq from "@/components/layout/Faq"
import Footer from "@/components/layout/Footer";
import CCC from  "@/components/layout/TwoComponents";
import Cababilities from "./components/Capabilities";
import Achivements from "./components/Achivements"

export default function MylapaySwitchX() {
    return(
        <div>
            <Hero/>
            <CoreBenefit/>
            <ValueAdded/>
            <Achivements/>
            <Cababilities/>
            <CCC/>
            <Faq/>
            <Footer/>
        </div>
    );
}