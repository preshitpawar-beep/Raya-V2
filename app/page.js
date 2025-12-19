import HeroSlider from "../components/HeroSlider";
import TrustIntro from "../components/TrustIntro";
import Slider from "../components/Slider";
import FeaturedProducts from "../components/FeaturedProducts";
import Benefits from "../components/Benefits";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <TrustIntro />
      <Slider />
      <FeaturedProducts />
      <Benefits />
      <WhyChoose />
      <HowItWorks />
      <CTA />
    </main>
  );
}
