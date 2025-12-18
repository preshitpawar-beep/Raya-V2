import HeroSlider from "../components/HeroSlider";
import Slider from "../components/Slider";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Slider />
      <FeaturedProducts />
      <Categories />
      <WhyChoose />
      <HowItWorks />
      <CTA />
    </main>
  );
}
