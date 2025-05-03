import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { collaborationProjects, chatMessages, achievements } from "@/lib/data";

const Collaboration = () => {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      alert(`Message sent: ${newMessage}`);
      setNewMessage("");
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-sans text-gray-900">Collaboration and Gamification</h2>
          <p className="text-lg text-gray-600 mt-2">Work together and track your progress with interactive challenges</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-gray-900 text-white p-4">
                <div className="flex items-center">
                  <i className="ri-team-line mr-2"></i>
                  <CardTitle className="font-medium">Live Collaboration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-7/12">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold mb-3">Active Projects</h3>
                      <div className="space-y-3">
                        {collaborationProjects.map((project, index) => (
                          <div 
                            key={index}
                            className="bg-gray-50 p-3 rounded border border-gray-200 hover:border-primary transition-colors cursor-pointer"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{project.title}</h4>
                              <Badge variant={project.status === "Active" ? "success" : "warning"}>
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex -space-x-2">
                                {project.members.map((member, idx) => (
                                  <div 
                                    key={idx}
                                    className={`w-7 h-7 rounded-full ${member.color} text-white flex items-center justify-center text-xs`}
                                  >
                                    {member.initials}
                                  </div>
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">{`Updated ${project.updated}`}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold">Team Chat</h3>
                        <Button variant="link" className="text-primary hover:underline text-sm p-0">View All</Button>
                      </div>
                      <div className="space-y-3">
                        {chatMessages.map((chat, index) => (
                          <div key={index} className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full ${chat.sender.color} text-white flex items-center justify-center flex-shrink-0`}>
                              {chat.sender.initials}
                            </div>
                            <div>
                              <div className="bg-gray-100 rounded-lg p-2">
                                <p className="text-sm">{chat.message}</p>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{`${chat.sender.name} • ${chat.time}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Input
                          type="text"
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-grow"
                        />
                        <Button 
                          className="bg-primary text-white"
                          onClick={sendMessage}
                        >
                          <i className="ri-send-plane-fill"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-5/12">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold">Shared Whiteboard</h3>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary transition-colors">
                          <i className="ri-pencil-line"></i>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary transition-colors">
                          <i className="ri-eraser-line"></i>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary transition-colors">
                          <i className="ri-chat-1-line"></i>
                        </Button>
                      </div>
                    </div>
                    <div className="border border-gray-300 rounded-lg bg-white h-72 p-2 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <i className="ri-landscape-line text-6xl mb-4"></i>
                        <p>Interactive whiteboard will appear here</p>
                        <Button className="mt-3 bg-primary text-white">
                          Start New Whiteboard
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="bg-gray-900 text-white p-4">
                <div className="flex items-center">
                  <i className="ri-trophy-line mr-2"></i>
                  <CardTitle className="font-medium">Challenges & Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Active Challenges</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <h4 className="font-medium">30-Day Coding Challenge</h4>
                      <div className="flex items-center mt-2">
                        <Progress value={65} className="h-2.5 mr-2" />
                        <span className="text-xs whitespace-nowrap">65%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">19/30 days completed</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <h4 className="font-medium">Quantum Basics Badge</h4>
                      <div className="flex items-center mt-2">
                        <Progress value={40} className="h-2.5 mr-2" />
                        <span className="text-xs whitespace-nowrap">40%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">2/5 modules completed</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-3">Your Achievements</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`bg-gray-50 p-2 rounded ${!achievement.unlocked && 'opacity-50'}`}
                      >
                        <div className={`${achievement.color} p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                          <i className={`${achievement.icon} text-2xl`}></i>
                        </div>
                        <p className="text-xs font-medium">{achievement.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900">
                      View All Achievements
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
