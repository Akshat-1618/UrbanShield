import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import WorkflowSection from "../components/landing/WorkflowSection";
import CtaSection from "../components/landing/CtaSection";
import Footer from "../components/landing/Footer";

const LandingPage = () => (
  <div className="min-h-screen bg-white">
    <LandingNavbar />
    <HeroSection />
    <StatsSection />
    <FeaturesSection />
    <WorkflowSection />
    <CtaSection />
    <Footer />
  </div>
);

export default LandingPage;
