import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-sans mb-6">Ready to Transform Your Learning Experience?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of students, professionals, and researchers on this next-generation platform for education and innovation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-medium">
            Create Free Account
          </Button>
          <Button size="lg" className="bg-accent hover:bg-opacity-90 font-medium">
            Explore Premium Features
          </Button>
        </div>
        <p className="mt-6 text-white text-opacity-80">
          Contact: <a href="tel:+917999916500" className="underline">+91 7999916500</a> • <span>Himanshu Kushwaha</span>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
