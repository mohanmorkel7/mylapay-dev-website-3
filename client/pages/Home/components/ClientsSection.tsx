import ScrollScale from "@/components/ui/scroll-scale";
import Camspay from "@/pages/assets/images/camspaylogo.svg";
import img1 from "@/pages/assets/images/client-logo/1.webp";
import img2 from "@/pages/assets/images/client-logo/2.webp";
import img3 from "@/pages/assets/images/client-logo/3.webp";
import img4 from "@/pages/assets/images/client-logo/4.webp";
import img5 from "@/pages/assets/images/client-logo/5.webp";
import img6 from "@/pages/assets/images/client-logo/6.webp";




export default function ClientsSection() {
    const logos = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        Camspay
    ];

    return (
        <section id="clients" className="bg-white overflow-hidden ">
            <ScrollScale
                as="div"
                className="container mx-auto py-10 md:w-2/3 w-full"
                direction="right"
                fromScale={0.7}
                toScale={1}
                fromOpacity={0.12}
                toOpacity={1}
            >
                <h3 className="text-center text-sm font-semibold text-slate-700 mb-6">
                    Trusted By The Top Payment Aggregator & Gateways
                </h3>

                <div className="relative w-full overflow-hidden">
                    <style>{`
                        @keyframes scrollLeft {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .logo-track {
                            display: flex;
                            width: calc(200%); /* double width for seamless loop */
                            animation: scrollLeft 20s linear infinite;
                        }
                        .logo-item {
                            flex: 0 0 auto;
                            margin: 0 20px;
                            height: 50px;
                        }
                        .logo-item img {
                            height: 100%;
                            object-fit: contain;
                        }
                    `}</style>

                    <div className="logo-track ">
                        {/* Repeat logos twice for infinite loop */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="logo-item">
                                <img src={typeof logo === "string" ? logo : logo} alt={`Logo ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollScale>
        </section>
    );
}
