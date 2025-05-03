import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import CodeEditor from "@/components/innovation-lab/CodeEditor";
import { devEnvironments } from "@/lib/data";
import { Link } from "wouter";

const InnovationLabPage = () => {
  return (
    <>
      <Helmet>
        <title>Innovation Lab - NextGen Study Hub</title>
        <meta name="description" content="Code, compute, and create with powerful development environments in our interactive innovation lab." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-sans text-gray-900">Interactive Innovation Lab</h1>
            <p className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
              Accelerate your learning and development with our state-of-the-art coding environments and tools.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-sans">Advanced Code Editor</h2>
            <CodeEditor />
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-sans">Specialized Development Environments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {devEnvironments.map((env, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-center mb-3">
                      <i className={`${env.icon} text-primary text-2xl mr-2`}></i>
                      <h3 className="text-lg font-bold">{env.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{env.description}</p>
                    <Link href={env.link}>
                      <a className="text-primary hover:underline text-sm font-medium">Launch environment →</a>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-sans">Tools & Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-primary p-3 rounded-full mr-4">
                      <i className="ri-git-branch-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Version Control</h3>
                      <p className="text-gray-600">Integrated Git workflows with GitHub, GitLab, and Bitbucket support</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span>Commit, push, and pull directly from your workspace</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span>Branch management and merge conflict resolution</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span>Pull request integration and CI/CD pipeline triggers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 text-secondary p-3 rounded-full mr-4">
                      <i className="ri-database-2-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Database Tools</h3>
                      <p className="text-gray-600">Connect and manage databases with visual query builders</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span>SQL and NoSQL database connections</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span>Data visualization and schema design tools</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      <span>Import/export functionality and data migration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnovationLabPage;
