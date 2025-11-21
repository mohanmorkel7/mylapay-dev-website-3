import HeroSection from "./components/HeroSection";
import Overview from "./components/Overview";
import CoreValues from "./components/CoreValues";
import UseCase from "./components/UseCase";
import Coverage from "./components/Coverage";
import Faq from "@/components/layout/Faq";
import AcquringCCC from "@/components/layout/TwoComponents";
import Footer from "@/components/layout/Footer";
import New from "./components/New";
import ProductShowcase from "./components/ProductShowcase";


export default function UpiPayments() {
    return( 
        <div>
            <HeroSection/>
            <Overview/>
            <New/>
            {/* <CoreValues/> */}
            
            {/* <UseCase/> */}
            <Coverage/>
            <ProductShowcase/>
            {/* <ProductSet/> */}
            <AcquringCCC/>
            <Faq/>
            <Footer/>

        </div>
    );
}