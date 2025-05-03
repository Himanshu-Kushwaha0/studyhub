import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  CodeIcon, 
  CloudIcon, 
  BrainCircuitIcon, 
  AtomIcon, 
  Users2Icon, 
  BarChart3Icon, 
  FolderIcon,
  FileTextIcon,
  ArrowRightIcon,
  BookOpenIcon
} from "lucide-react";
import { features, collaborationProjects, achievements } from "@/lib/data";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Helmet>
        <title>Dashboard - NextGen Study Hub</title>
        <meta name="description" content="Your personalized dashboard for accessing all NextGen Study Hub features and tools." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-sans text-gray-900">Your Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Manage your projects, access tools, and continue your learning journey.
            </p>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-10">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderIcon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">5</h2>
                      <p className="text-gray-600">Active Projects</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpenIcon className="h-8 w-8 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-bold">3</h2>
                      <p className="text-gray-600">Courses In Progress</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users2Icon className="h-8 w-8 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold">8</h2>
                      <p className="text-gray-600">Collaboration Invites</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {collaborationProjects.map((project, index) => (
                          <div 
                            key={index}
                            className="flex justify-between items-start p-3 bg-gray-50 rounded-md border border-gray-200 hover:border-primary transition-all"
                          >
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{project.title}</h3>
                                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                  project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {project.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{project.description}</p>
                              <div className="flex items-center mt-2">
                                <div className="flex -space-x-2 mr-3">
                                  {project.members.map((member, idx) => (
                                    <div 
                                      key={idx}
                                      className={`w-6 h-6 rounded-full ${member.color} text-white flex items-center justify-center text-xs`}
                                    >
                                      {member.initials}
                                    </div>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">{`Updated ${project.updated}`}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">
                              <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        View All Projects
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Web Development</span>
                            <span className="text-gray-500">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Quantum Computing</span>
                            <span className="text-gray-500">25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>AI & Machine Learning</span>
                            <span className="text-gray-500">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Data Science</span>
                            <span className="text-gray-500">70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Access Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-6 flex flex-col items-center justify-center"
                      >
                        <div className="text-3xl text-primary mb-3">
                          <i className={feature.icon}></i>
                        </div>
                        <span className="font-medium">{feature.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Projects</CardTitle>
                    <Button>Create New Project</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Project cards would go here */}
                      {[1, 2, 3, 4, 5, 6].map((project) => (
                        <Card key={project}>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-bold text-lg">Project Title {project}</h3>
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                Active
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                              This is a brief description of the project and what it aims to accomplish.
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                                  JD
                                </div>
                                <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">
                                  AM
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="text-primary">
                                <ArrowRightIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tools">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <CodeIcon className="h-12 w-12 text-primary mb-4" />
                          <h3 className="font-bold text-lg mb-2">Code Editor</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Write, compile, and debug code in multiple programming languages
                          </p>
                          <Button>Launch</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <CloudIcon className="h-12 w-12 text-primary mb-4" />
                          <h3 className="font-bold text-lg mb-2">Virtual Environments</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Launch VMs and containers for testing and development
                          </p>
                          <Button>Launch</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <BrainCircuitIcon className="h-12 w-12 text-primary mb-4" />
                          <h3 className="font-bold text-lg mb-2">AI Tools</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Generate content and build websites with AI assistance
                          </p>
                          <Button>Launch</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <AtomIcon className="h-12 w-12 text-primary mb-4" />
                          <h3 className="font-bold text-lg mb-2">Quantum Lab</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Design and simulate quantum circuits and algorithms
                          </p>
                          <Button>Launch</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Collaboration Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <Users2Icon className="h-12 w-12 text-secondary mb-4" />
                          <h3 className="font-bold text-lg mb-2">Team Workspace</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Collaborate in real-time with team members
                          </p>
                          <Button>Open</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <FileTextIcon className="h-12 w-12 text-secondary mb-4" />
                          <h3 className="font-bold text-lg mb-2">Shared Documents</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Create and edit documents collaboratively
                          </p>
                          <Button>Open</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <BarChart3Icon className="h-12 w-12 text-secondary mb-4" />
                          <h3 className="font-bold text-lg mb-2">Project Analytics</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Track project progress and team performance
                          </p>
                          <Button>Open</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="learning">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Learning Paths</CardTitle>
                    <Button>Browse Courses</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-bold">Web Development Fundamentals</h3>
                            <div className="text-sm text-gray-600 mb-2">HTML, CSS, JavaScript, React</div>
                            <Progress value={65} className="h-2 w-full md:w-64" />
                            <div className="text-xs text-gray-500 mt-1">13/20 modules completed</div>
                          </div>
                          <Button>Continue</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-bold">Introduction to Quantum Computing</h3>
                            <div className="text-sm text-gray-600 mb-2">Basic concepts, quantum gates, algorithms</div>
                            <Progress value={25} className="h-2 w-full md:w-64" />
                            <div className="text-xs text-gray-500 mt-1">2/8 modules completed</div>
                          </div>
                          <Button>Continue</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-bold">AI & Machine Learning Basics</h3>
                            <div className="text-sm text-gray-600 mb-2">Python, TensorFlow, data analysis</div>
                            <Progress value={40} className="h-2 w-full md:w-64" />
                            <div className="text-xs text-gray-500 mt-1">6/15 modules completed</div>
                          </div>
                          <Button>Continue</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2">Advanced React Patterns</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Learn advanced React techniques, state management, and performance optimization.
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <i className="ri-time-line mr-1"></i>
                            <span>8 hours</span>
                            <span className="mx-2">•</span>
                            <i className="ri-bar-chart-line mr-1"></i>
                            <span>Intermediate</span>
                          </div>
                          <Button variant="outline" className="w-full">
                            Add to Learning Path
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2">Data Science with Python</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Master data analysis, visualization, and machine learning with Python libraries.
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <i className="ri-time-line mr-1"></i>
                            <span>12 hours</span>
                            <span className="mx-2">•</span>
                            <i className="ri-bar-chart-line mr-1"></i>
                            <span>Intermediate</span>
                          </div>
                          <Button variant="outline" className="w-full">
                            Add to Learning Path
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2">Cloud Architecture</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Design and implement scalable cloud solutions across major platforms.
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <i className="ri-time-line mr-1"></i>
                            <span>10 hours</span>
                            <span className="mx-2">•</span>
                            <i className="ri-bar-chart-line mr-1"></i>
                            <span>Advanced</span>
                          </div>
                          <Button variant="outline" className="w-full">
                            Add to Learning Path
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {achievements.map((achievement, index) => (
                        <div 
                          key={index} 
                          className={`flex flex-col items-center p-4 rounded-lg ${
                            achievement.unlocked 
                              ? 'bg-gray-50' 
                              : 'bg-gray-50 opacity-50'
                          }`}
                        >
                          <div className={`${achievement.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-3`}>
                            <i className={`${achievement.icon} text-3xl`}></i>
                          </div>
                          <h3 className="font-medium text-center">{achievement.name}</h3>
                          <span className="text-xs text-gray-500 mt-1">
                            {achievement.unlocked ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Current Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">30-Day Coding Challenge</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            19 days left
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Complete a coding challenge every day for 30 days to earn the Coding Master badge.
                        </p>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm text-gray-500">19/30 days</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">Quantum Computing Basics</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Ongoing
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Complete all introductory quantum computing modules to earn the Quantum Explorer badge.
                        </p>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm text-gray-500">2/5 modules</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
