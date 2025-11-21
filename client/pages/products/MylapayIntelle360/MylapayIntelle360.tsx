import Hero from "./components/Hero";
import CoreBenefit from "./components/CoreBenefit";
import ValueAdded from "./components/ValueAdded";
import Faq from "@/components/layout/Faq"
import Footer from "@/components/layout/Footer";
import CCC from  "@/components/layout/TwoComponentsAlternate";
import Achivements from "./components/Achivements";
import Capabilities from "./components/Cababilities"

export default function MylapayIntelle360() {
    return(
        <div>
            <Hero/>
            <CoreBenefit/>
            <ValueAdded/>
            <Achivements/>
            <Capabilities/>
            <CCC/>
            <Faq/>
            <Footer/>
        </div>
    );
}