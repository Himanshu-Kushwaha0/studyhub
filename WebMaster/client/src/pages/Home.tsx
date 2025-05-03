import HeroSection from "@/components/home/HeroSection";
import FeaturesOverview from "@/components/home/FeaturesOverview";
import InnovationLab from "@/components/innovation-lab/InnovationLab";
import VirtualLabs from "@/components/virtual-labs/VirtualLabs";
import AITools from "@/components/ai-tools/AITools";
import QuantumComputing from "@/components/quantum/QuantumComputing";
import Collaboration from "@/components/collaboration/Collaboration";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>NextGen Study Hub - Advanced Learning Platform</title>
        <meta name="description" content="Transform your learning experience with NextGen Study Hub's advanced tools for education, collaboration, and innovation." />
      </Helmet>
      <HeroSection />
      <FeaturesOverview />
      <InnovationLab />
      <VirtualLabs />
      <AITools />
      <QuantumComputing />
      <Collaboration />
      <CTASection />
    </>
  );
};

export default Home;
