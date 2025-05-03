import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cloudResources } from "@/lib/data";

const VirtualLabs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Virtual Development Environments</h2>
          <p className="text-lg text-gray-600 mt-2">Access powerful emulators and virtual environments for cross-platform development</p>
        </div>
        
        {/* External Emulator Links */}
        <Card>
          <CardHeader className="bg-gray-900 text-white p-4">
            <div className="flex items-center">
              <i className="ri-link-m mr-2"></i>
              <CardTitle className="font-medium">External Emulator Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="pc" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8 w-full">
                <TabsTrigger value="pc" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  PC Emulators
                </TabsTrigger>
                <TabsTrigger value="mobile" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  Mobile Emulators
                </TabsTrigger>
                <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  Cross-Platform & Cloud
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pc">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* VirtualBox */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">VirtualBox</h3>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Windows/Linux/Mac</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        A powerful open-source emulator for creating and running virtual machines.
                      </p>
                      <a 
                        href="https://www.virtualbox.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>

                  {/* VMware */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">VMware Workstation Player</h3>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Windows/Linux</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        A reliable PC emulator for running multiple operating systems on one machine.
                      </p>
                      <a 
                        href="https://www.vmware.com/products/workstation-player.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="mobile">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bluestacks */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Bluestacks</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Android</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        One of the most popular Android emulators for running Android apps and games on your PC.
                      </p>
                      <a 
                        href="https://www.bluestacks.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>

                  {/* NoxPlayer */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">NoxPlayer</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Android</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        A lightweight Android emulator suitable for gaming and app testing.
                      </p>
                      <a 
                        href="https://www.bignox.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>

                  {/* Android Studio */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Android Studio Emulator</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Android</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        The official Android development emulator provided by Google. Ideal for developers building and testing Android apps.
                      </p>
                      <a 
                        href="https://developer.android.com/studio" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>

                  {/* Xcode */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Xcode Simulator</h3>
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">iOS</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Apple's official iOS simulator for developers to test iOS apps. Available as part of Xcode.
                      </p>
                      <a 
                        href="https://developer.apple.com/xcode/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="cloud">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Genymotion */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Genymotion</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Android</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        A high-performance cloud-based Android emulator for developers.
                      </p>
                      <a 
                        href="https://www.genymotion.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>

                  {/* LambdaTest */}
                  <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">LambdaTest</h3>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Cross-Platform</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        A cloud-based platform for mobile and browser testing with various virtual devices.
                      </p>
                      <a 
                        href="https://www.lambdatest.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-sm text-gray-500">
                These links are provided for educational purposes. Please refer to the official documentation for each tool for the most up-to-date information and installation instructions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cloud Resources Manager */}
        <Card className="mt-10">
          <CardHeader className="bg-gray-900 text-white p-4">
            <div className="flex items-center">
              <i className="ri-cloud-line mr-2"></i>
              <CardTitle className="font-medium">Cloud Resources Manager</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cloudResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <i className={`${resource.icon} text-2xl mr-2 ${
                          resource.provider === 'AWS' ? 'text-yellow-500' : 
                          resource.provider === 'Azure' ? 'text-blue-500' :
                          resource.provider === 'GCP' ? 'text-red-500' : 'text-gray-800'
                        }`}></i>
                        <span className="font-medium">{resource.provider}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        resource.status === 'Connected' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {resource.status}
                      </span>
                    </div>
                    
                    {resource.status === 'Connected' && resource.resources ? (
                      <div className="space-y-2 text-sm">
                        {resource.resources.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.name}:</span>
                            <span>{item.count}</span>
                          </div>
                        ))}
                        <Button variant="outline" className="mt-4 w-full text-sm">
                          Manage Resources
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center h-24">
                        <Button className="bg-primary text-white">
                          Connect {resource.provider} Account
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VirtualLabs;