import Hero from "./components/Hero";
import CoreBenefit from "./components/CoreBenefit";
import ValueAdded from "./components/ValueAdded";
import Faq from "@/components/layout/Faq"
import Footer from "@/components/layout/Footer";
import CCC from  "@/components/layout/TwoComponents"

export default function MylapayCSwitch() {
    return(
        <div>
            <Hero/>
            <CoreBenefit/>
            <ValueAdded/>
            <CCC/>
            <Faq/>
            <Footer/>
        </div>
    );
}