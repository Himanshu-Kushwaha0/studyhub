import { Helmet } from "react-helmet";
import Collaboration from "@/components/collaboration/Collaboration";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CollaborationPage = () => {
  return (
    <>
      <Helmet>
        <title>Collaboration - NextGen Study Hub</title>
        <meta name="description" content="Work together in real-time and track your progress with our collaborative tools and gamification features." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-sans text-gray-900">Collaboration and Gamification</h1>
            <p className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
              Connect with peers, work on projects together, and track your progress through engaging challenges.
            </p>
          </div>
          
          <Collaboration />
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">Collaboration Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-blue-100 text-primary p-3 rounded-full inline-block mb-3">
                      <i className="ri-vidicon-line text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Video Conferencing</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-center">
                    Connect face-to-face with team members through high-quality video calls with screen sharing.
                  </p>
                  <Button className="w-full">Start Meeting</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-blue-100 text-primary p-3 rounded-full inline-block mb-3">
                      <i className="ri-file-list-3-line text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Task Management</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-center">
                    Organize your team's workflow with Kanban boards, task assignments, and progress tracking.
                  </p>
                  <Button className="w-full">View Tasks</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-blue-100 text-primary p-3 rounded-full inline-block mb-3">
                      <i className="ri-file-cloud-line text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Document Collaboration</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-center">
                    Create and edit documents together in real-time with version history and comments.
                  </p>
                  <Button className="w-full">Open Documents</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-sans">Learning Paths & Gamification</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Structured Learning Paths</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Follow curated learning paths designed by experts in various fields
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Track your progress and see what skills you've mastered
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Receive personalized recommendations based on your interests
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Earn certificates upon completion of learning paths
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Gamification Elements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Earn points, badges, and achievements for completing tasks
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Participate in challenges and competitions with other users
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Climb leaderboards to showcase your skills and knowledge
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">
                          Unlock premium content and features as you progress
                        </span>
                      </li>
                    </ul>
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

export default CollaborationPage;
