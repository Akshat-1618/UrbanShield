import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import WorkflowSection from "../components/landing/WorkflowSection";
import Footer from "../components/landing/Footer";

const LandingPage = () => (
  <div className="min-h-screen bg-slate-50">
    <LandingNavbar />
    <HeroSection />
    <StatsSection />
    <FeaturesSection />
    <WorkflowSection />
    <Footer />
  </div>
);

export default LandingPage;