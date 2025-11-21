import ScrollScale from "@/components/ui/scroll-scale";

export default function ScaleSection() {
    return(
        <section
        id="scale"
        className="bg-background scroll-mt-20 md:scroll-mt-24"
      >
        <ScrollScale
          as="div"
          className="container mx-auto py-8 md:py-12 text-center"
          direction="right"
          fromScale={0.7}
          toScale={1}
          fromOpacity={0.12}
          toOpacity={1}
        >
          <h2 className="text-l md:text-3xl lg:text-4xl font-semibold">
            Built for Scale, Engineered for
          </h2>
          <h3 className="mt-2 text-l md:text-3xl lg:text-4xl font-semibold">
            Security & Designed for Profitability
          </h3>
        </ScrollScale>
      </section>
    );

}