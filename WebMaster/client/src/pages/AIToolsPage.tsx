import { Helmet } from "react-helmet";
import AITools from "@/components/ai-tools/AITools";
import { Card, CardContent } from "@/components/ui/card";

const AIToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Tools - NextGen Study Hub</title>
        <meta name="description" content="Create videos, transform text, and build websites with our advanced AI-powered content tools." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-sans text-gray-900">AI-Powered Content Tools</h1>
            <p className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to create, transform, and optimize your content.
            </p>
          </div>
          
          <AITools />
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">Additional AI Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-primary p-3 rounded-full mr-4">
                      <i className="ri-image-edit-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Image Generation & Editing</h3>
                      <p className="text-gray-600">Create and modify images with AI-powered tools</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Generate images from text descriptions</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Edit and enhance existing images</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Remove backgrounds and unwanted elements</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Style transfer and artistic transformations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 text-secondary p-3 rounded-full mr-4">
                      <i className="ri-book-read-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Research Assistant</h3>
                      <p className="text-gray-600">Accelerate research and content creation with AI assistance</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Summarize academic papers and reports</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Generate literature reviews</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Extract key insights from large datasets</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                      <span>Create citations and references</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">How Our AI Tools Work</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-input-method-line text-primary text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2">Input</h3>
                    <p className="text-gray-600 text-sm">
                      Provide text prompts, requirements, and preferences
                    </p>
                  </div>
                  
                  <div>
                    <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-brain-line text-primary text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2">Processing</h3>
                    <p className="text-gray-600 text-sm">
                      AI models analyze and transform your input
                    </p>
                  </div>
                  
                  <div>
                    <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-tools-line text-primary text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2">Refinement</h3>
                    <p className="text-gray-600 text-sm">
                      Adjust and customize the generated content
                    </p>
                  </div>
                  
                  <div>
                    <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-download-cloud-line text-primary text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2">Output</h3>
                    <p className="text-gray-600 text-sm">
                      Download or publish your finished content
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

export default AIToolsPage;
