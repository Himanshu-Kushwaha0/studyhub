import { features } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesOverview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-sans text-gray-900">Power-Packed Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="text-primary text-3xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-2 font-sans">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
