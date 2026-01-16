import HeroSlider from "../components/HeroSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import TrustIntro from "../components/TrustIntro";
import Slider from "../components/Slider";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <FeaturedProducts />
      <TrustIntro />
      <Slider />
      <WhyChoose />
      <HowItWorks />
      <CTA />
    </main>
  );
}
