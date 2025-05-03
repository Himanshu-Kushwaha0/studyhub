import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { devEnvironments } from "@/lib/data";
import CodeEditorAdvanced from "./CodeEditorAdvanced";
import { 
  CommandIcon, 
  BrainCogIcon, 
  UploadCloudIcon, 
  CpuIcon
} from "lucide-react";

const InnovationLab = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-blue-600/10 rounded-full p-3 mr-3">
              <CommandIcon className="h-7 w-7 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold font-sans bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text">
              VS Code Innovation Lab
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience professional-grade coding with our VS Code-like environment. 
            Write, compile, and execute code in multiple languages with AI-powered assistance.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row mb-8 gap-6">
          <Card className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
            <CardContent className="p-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-600/10 mb-4">
                <BrainCogIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Assistance</h3>
              <p className="text-gray-600">
                Get intelligent code suggestions, bug detection, and real-time code optimization using 
                OpenAI's GPT models. Generate complete functions with natural language prompts.
              </p>
            </CardContent>
          </Card>
          
          <Card className="lg:w-1/3 bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
            <CardContent className="p-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-600/10 mb-4">
                <CpuIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-Language Support</h3>
              <p className="text-gray-600">
                Code in Python, JavaScript, Java, C++, HTML/CSS and more with syntax highlighting, 
                intelligent auto-completion, and language-specific tools and features.
              </p>
            </CardContent>
          </Card>
          
          <Card className="lg:w-1/3 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
            <CardContent className="p-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-600/10 mb-4">
                <UploadCloudIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Integrated Terminal</h3>
              <p className="text-gray-600">
                Execute your code directly within the editor with an integrated terminal. See real-time 
                output, error messages, and debugging information in the same interface.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <CodeEditorAdvanced />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Development Environments</h3>
          </div>
          
          {devEnvironments.map((env, index) => (
            <Card key={index} className="hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-center mb-3">
                  <i className={`${env.icon} text-primary text-2xl mr-2`}></i>
                  <h3 className="text-lg font-bold">{env.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">{env.description}</p>
                <Link href={env.link}>
                  <a className="text-primary hover:underline text-sm font-medium">Try environment →</a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
