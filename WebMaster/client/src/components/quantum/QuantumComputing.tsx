import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quantumModules } from "@/lib/data";
import { AlertTriangle } from "lucide-react";

const QuantumComputing = () => {
  const [qubits, setQubits] = useState("2 qubits");
  const [framework, setFramework] = useState("Qiskit");

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-sans text-gray-900">Quantum Computing Support</h2>
          <p className="text-lg text-gray-600 mt-2">Experiment with quantum circuits and algorithms</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="bg-secondary text-white p-4">
              <div className="flex items-center">
                <i className="ri-pulse-line mr-2"></i>
                <CardTitle className="font-medium">Quantum Circuit Designer</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="mb-4 bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <div className="flex flex-nowrap space-x-6 min-w-max">
                  {/* Wire 0 */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white mb-2">
                      0
                    </div>
                    <div className="h-40 w-1 bg-blue-400"></div>
                  </div>
                  
                  {/* H Gate */}
                  <div className="flex flex-col items-center">
                    <div className="h-6 invisible">s</div>
                    <div className="w-10 h-10 border-2 border-yellow-400 rounded flex items-center justify-center text-white mt-4">
                      H
                    </div>
                    <div className="h-24 w-1 bg-blue-400"></div>
                  </div>
                  
                  {/* CNOT Gate Top */}
                  <div className="flex flex-col items-center">
                    <div className="h-6 invisible">s</div>
                    <div className="w-6 h-6 rounded-full border-2 border-green-400 flex items-center justify-center text-white mt-6">
                      •
                    </div>
                    <div className="h-28 w-1 bg-green-400"></div>
                  </div>
                  
                  {/* Measurement Gate */}
                  <div className="flex flex-col items-center">
                    <div className="h-6 invisible">s</div>
                    <div className="w-10 h-10 rounded flex items-center justify-center text-white mt-4">
                      <i className="ri-pulse-line text-purple-400 text-xl"></i>
                    </div>
                    <div className="h-24 w-1 bg-blue-400"></div>
                  </div>
                  
                  {/* Wire 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white mb-2">
                      1
                    </div>
                    <div className="h-16 w-1 bg-blue-400"></div>
                    <div className="w-10 h-10 border-2 border-yellow-400 rounded flex items-center justify-center text-white">
                      X
                    </div>
                    <div className="h-14 w-1 bg-blue-400"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Qubits
                  </label>
                  <Select value={qubits} onValueChange={setQubits}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qubits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 qubits">2 qubits</SelectItem>
                      <SelectItem value="3 qubits">3 qubits</SelectItem>
                      <SelectItem value="4 qubits">4 qubits</SelectItem>
                      <SelectItem value="5 qubits">5 qubits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Framework
                  </label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Qiskit">Qiskit</SelectItem>
                      <SelectItem value="Cirq">Cirq</SelectItem>
                      <SelectItem value="Braket">Braket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="flex-1 bg-primary text-white">
                  Simulate
                </Button>
                <Button className="flex-1 bg-accent text-white">
                  Run on Quantum Hardware
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-secondary text-white p-4">
              <div className="flex items-center">
                <i className="ri-book-open-line mr-2"></i>
                <CardTitle className="font-medium">Quantum Learning Modules</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Available Modules</h3>
                <div className="space-y-4">
                  {quantumModules.map((module, index) => (
                    <div key={index} className="bg-white p-3 rounded shadow-sm flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                      <Button className="bg-primary text-white px-3 py-1 rounded text-sm">
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-blue-800">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium mb-1">Quantum Hardware Access</h4>
                    <p className="text-sm">Access to real quantum computers from IBM Quantum and Azure Quantum is available for premium users. Upgrade your plan to run your circuits on actual quantum hardware.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuantumComputing;
