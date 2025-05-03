import { Helmet } from "react-helmet";
import QuantumComputing from "@/components/quantum/QuantumComputing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuantumComputingPage = () => {
  return (
    <>
      <Helmet>
        <title>Quantum Computing - NextGen Study Hub</title>
        <meta name="description" content="Experiment with quantum circuits and algorithms in our interactive quantum computing lab." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-sans text-gray-900">Quantum Computing Support</h1>
            <p className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
              Explore the cutting-edge field of quantum computing with interactive simulations and learning resources.
            </p>
          </div>
          
          <QuantumComputing />
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">Understanding Quantum Computing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Key Concepts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-primary p-2 rounded-full mr-3 mt-0.5">
                        <span className="font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Qubits</h4>
                        <p className="text-gray-600 text-sm">
                          Quantum bits that can exist in multiple states simultaneously through superposition, 
                          unlike classical bits that can only be 0 or 1.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-primary p-2 rounded-full mr-3 mt-0.5">
                        <span className="font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Superposition</h4>
                        <p className="text-gray-600 text-sm">
                          The ability of quantum systems to exist in multiple states at once, 
                          giving quantum computers their massive parallel processing capability.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-primary p-2 rounded-full mr-3 mt-0.5">
                        <span className="font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Entanglement</h4>
                        <p className="text-gray-600 text-sm">
                          A quantum phenomenon where particles become correlated such that the 
                          quantum state of each particle cannot be described independently.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-primary p-2 rounded-full mr-3 mt-0.5">
                        <span className="font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Quantum Gates</h4>
                        <p className="text-gray-600 text-sm">
                          Operations that manipulate qubits, analogous to logic gates in classical computing 
                          but with the ability to create and manipulate superpositions.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Applications of Quantum Computing</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-secondary p-2 rounded-full mr-3">
                        <i className="ri-lock-line"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Cryptography</h4>
                        <p className="text-gray-600 text-sm">
                          Breaking current encryption methods and developing quantum-resistant cryptography.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-secondary p-2 rounded-full mr-3">
                        <i className="ri-medicine-bottle-line"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Drug Discovery</h4>
                        <p className="text-gray-600 text-sm">
                          Simulating molecular interactions to develop new medications faster.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-secondary p-2 rounded-full mr-3">
                        <i className="ri-line-chart-line"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Optimization</h4>
                        <p className="text-gray-600 text-sm">
                          Solving complex optimization problems in logistics, finance, and engineering.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-secondary p-2 rounded-full mr-3">
                        <i className="ri-ai-line"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Machine Learning</h4>
                        <p className="text-gray-600 text-sm">
                          Accelerating training of machine learning models and pattern recognition.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary text-white">
              Start Learning Quantum Computing
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantumComputingPage;
