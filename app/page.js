import HeroSlider from "../components/HeroSlider";
import TrustStrip from "../components/TrustStrip";
import FeaturedProducts from "../components/FeaturedProducts";
import TrustedBy from "../components/TrustedBy";
import CollectionShopStrip from "../components/CollectionShopStrip";
import TrustIntro from "../components/TrustIntro";
import Slider from "../components/Slider";
import WhyChoose from "../components/WhyChoose";
import RecentWork from "../components/RecentWork";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import EmailCapture from "../components/EmailCapture";
import CTA from "../components/CTA";

export const metadata = {
  title: "Branded Promotional Products for UK Businesses",
  description:
    "Legacy Imprint SW supplies custom branded pens, notebooks, bags and corporate giveaways for UK businesses. Free visual proof, clear pricing, and a personal service. Based in Tiverton, Devon.",
  alternates: {
    canonical: "https://www.legacyimprint.co.uk",
  },
  openGraph: {
    title: "Branded Promotional Products for UK Businesses | Legacy Imprint SW",
    description:
      "Custom branded pens, notebooks, bags and corporate giveaways. Free visual proof, clear pricing, and a personal service. Based in Tiverton, Devon.",
    url: "https://www.legacyimprint.co.uk",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <TrustStrip />
      <FeaturedProducts />
      <TrustedBy />
      <CollectionShopStrip />
      <TrustIntro />
      <Slider />
      <WhyChoose />
      <RecentWork />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <EmailCapture />
      <CTA />
    </main>
  );
}
