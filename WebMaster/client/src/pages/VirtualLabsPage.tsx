import { Helmet } from "react-helmet";
import VirtualLabs from "@/components/virtual-labs/VirtualLabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VirtualLabsPage = () => {
  return (
    <>
      <Helmet>
        <title>Virtual Labs - NextGen Study Hub</title>
        <meta name="description" content="Launch cloud-based environments for testing, simulation, and project deployment with our virtual labs." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-sans text-gray-900">On-Demand Virtual Labs</h1>
            <p className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
              Access powerful computing resources and emulated environments for testing, development, and learning.
            </p>
          </div>
          
          <VirtualLabs />
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">Additional Lab Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="ri-server-line text-primary text-3xl mr-3"></i>
                    <h3 className="text-xl font-bold">Infrastructure as Code</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Create and manage infrastructure using code templates with Terraform, Ansible, and CloudFormation.
                  </p>
                  <Button className="w-full">Explore IaC Tools</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="ri-test-tube-line text-primary text-3xl mr-3"></i>
                    <h3 className="text-xl font-bold">Scientific Simulation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Run complex scientific simulations for physics, chemistry, biology, and environmental science.
                  </p>
                  <Button className="w-full">Launch Simulations</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="ri-global-line text-primary text-3xl mr-3"></i>
                    <h3 className="text-xl font-bold">Network Laboratories</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Design and test network topologies, security configurations, and traffic analysis.
                  </p>
                  <Button className="w-full">Configure Networks</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">Usage Instructions</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-2">1. Select Environment Type</h3>
                    <p className="text-gray-600">
                      Choose from PC emulators, mobile emulators, or cloud environments based on your project needs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2">2. Configure Resources</h3>
                    <p className="text-gray-600">
                      Specify CPU, memory, storage, and networking requirements for your virtual environment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2">3. Launch and Connect</h3>
                    <p className="text-gray-600">
                      Start your environment and connect through the browser or using SSH/RDP depending on the selected lab type.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2">4. Save Your Work</h3>
                    <p className="text-gray-600">
                      Commit changes to repositories, export artifacts, or save environment states before shutting down your lab.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualLabsPage;
