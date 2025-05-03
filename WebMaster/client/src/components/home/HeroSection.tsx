import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">Study Hub: Project Bolt</h1>
            <p className="text-xl mb-6">Transform your learning experience with advanced tools for education, collaboration, and innovation. Your complete platform for building digital skills.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/innovation-lab">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Explore Labs
                </Button>
              </Link>
              <Link href="/ai-tools">
                <Button size="lg" className="bg-accent hover:bg-opacity-90">
                  AI Tools
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Students collaborating on digital workspace" 
                className="w-full h-auto max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
