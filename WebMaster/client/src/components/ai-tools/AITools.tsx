import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ApiKeyModal, ApiServiceType } from "@/components/ui/api-key-modal";
import { Award, Code, Loader2 } from "lucide-react";

const AITools = () => {
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // State for video generation
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoStyle, setVideoStyle] = useState("3D Animation");
  const [videoDuration, setVideoDuration] = useState("15 seconds");
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoResult, setVideoResult] = useState<{
    videoId?: string;
    status?: string;
    videoUrl?: string;
    isFallback?: boolean;
  } | null>(null);
  
  // State for text transformation
  const [textContent, setTextContent] = useState("");
  const [transformStyle, setTransformStyle] = useState("Creative");
  const [isTransformingText, setIsTransformingText] = useState(false);
  const [textProgress, setTextProgress] = useState(0);
  
  // State for website generation
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [websiteTheme, setWebsiteTheme] = useState("Modern");
  const [websitePages, setWebsitePages] = useState("Landing Page");
  const [brandingName, setBrandingName] = useState("");
  const [isGeneratingWebsite, setIsGeneratingWebsite] = useState(false);
  const [websiteProgress, setWebsiteProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  
  // State for Replit app generation
  const [replitDescription, setReplitDescription] = useState("");
  const [replitTemplate, setReplitTemplate] = useState("Web App");
  const [replitLanguage, setReplitLanguage] = useState("JavaScript");
  const [isGeneratingReplit, setIsGeneratingReplit] = useState(false);
  const [replitProgress, setReplitProgress] = useState(0);
  
  // State for image generation
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("Photorealistic");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [imageResult, setImageResult] = useState<{
    images?: string[];
    prompt?: string;
    isFallback?: boolean;
  } | null>(null);
  
  // State for API key modal
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [apiKeyService, setApiKeyService] = useState<ApiServiceType>("openai");
  const [apiKeyError, setApiKeyError] = useState<string | undefined>();
  
  // State for generated content
  const [generatedContent, setGeneratedContent] = useState<{
    type: string;
    content: any;
  } | null>(null);
  
  // Achievements and points
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("text");
  
  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset achievement notification
    setShowAchievement(null);
  };
  
  // Function to check video status
  const checkVideoStatus = useCallback(async (videoId: string) => {
    try {
      const response = await apiRequest("GET", `/api/video-status?videoId=${videoId}`);
      
      if (response.status === "completed" && response.videoUrl) {
        setVideoResult({
          videoId,
          status: "completed",
          videoUrl: response.videoUrl,
          isFallback: response.isFallback
        });
        setIsGeneratingVideo(false);
        setVideoProgress(100);
        
        if (!response.isFallback) {
          setShowAchievement("Video Creator");
          // Would update user achievements and points in a real app
        }
        
        toast({
          title: "Video Generated",
          description: "Your AI video has been generated successfully!",
          variant: "default",
        });
        
        setGeneratedContent({
          type: "video",
          content: response.videoUrl
        });
      } else if (response.status === "failed") {
        setIsGeneratingVideo(false);
        setVideoProgress(0);
        
        toast({
          title: "Video Generation Failed",
          description: response.error || "An error occurred while generating the video.",
          variant: "destructive",
        });
      } else {
        // Still processing
        const progressValue = Math.min(90, videoProgress + 5);
        setVideoProgress(progressValue);
        
        // Schedule another check
        setTimeout(() => checkVideoStatus(videoId), 3000);
      }
    } catch (error) {
      console.error("Error checking video status:", error);
      const errorMessage = (error as any)?.message || "An error occurred";
      
      // Check if error is due to missing API key
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
        setApiKeyService("predis");
        setApiKeyError("Valid Predis API key required for video generation");
        setApiKeyModalOpen(true);
      }
      
      setIsGeneratingVideo(false);
      setVideoProgress(0);
      
      toast({
        title: "Error",
        description: "Failed to check video status. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast, videoProgress]);
  
  // Function to generate video
  const handleVideoGeneration = async () => {
    if (!videoPrompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a description for your video.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingVideo(true);
    setVideoProgress(10);
    setGeneratedContent(null);
    
    try {
      const durationSeconds = parseInt(videoDuration.split(" ")[0]);
      
      const response = await apiRequest("POST", "/api/generate-video", {
        prompt: videoPrompt,
        style: videoStyle,
        duration: durationSeconds,
        resolution: "720p"
      });
      
      if (response.videoId) {
        setVideoProgress(30);
        setTimeout(() => checkVideoStatus(response.videoId as string), 3000);
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error generating video:", error);
      const errorMessage = (error as any)?.message || "An error occurred";
      
      // Check if error is due to missing API key
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
        setApiKeyService("predis");
        setApiKeyError("Valid Predis API key required for video generation");
        setApiKeyModalOpen(true);
      }
      
      setIsGeneratingVideo(false);
      setVideoProgress(0);
      
      toast({
        title: "Error",
        description: "Failed to generate video. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to transform text
  const handleTextTransform = async () => {
    if (!textContent.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter text to transform.",
        variant: "destructive",
      });
      return;
    }
    
    setIsTransformingText(true);
    setTextProgress(20);
    setGeneratedContent(null);
    
    try {
      const response = await apiRequest("POST", "/api/generate-text", {
        text: textContent,
        style: transformStyle
      });
      
      if (response.text) {
        setTextProgress(100);
        setIsTransformingText(false);
        
        setShowAchievement("Text Transformer");
        // Would update user achievements and points in a real app
        
        toast({
          title: "Text Transformed",
          description: "Your text has been transformed successfully!",
          variant: "default",
        });
        
        setGeneratedContent({
          type: "text",
          content: response.text
        });
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error transforming text:", error);
      const errorMessage = (error as any)?.message || "An error occurred";
      
      // Check if error is due to missing API key
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
        setApiKeyService("openai");
        setApiKeyError("Valid OpenAI API key required for text transformation");
        setApiKeyModalOpen(true);
      }
      
      setIsTransformingText(false);
      setTextProgress(0);
      
      toast({
        title: "Error",
        description: "Failed to transform text. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to generate website
  const handleWebsiteGeneration = async () => {
    if (!websiteDescription.trim()) {
      toast({
        title: "Empty Description",
        description: "Please enter a description for your website.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingWebsite(true);
    setWebsiteProgress(15);
    setGeneratedContent(null);
    
    try {
      const response = await apiRequest("POST", "/api/generate-website", {
        description: websiteDescription,
        theme: websiteTheme,
        pages: websitePages,
        brandName: brandingName || undefined
      });
      
      if (response.html) {
        setWebsiteProgress(100);
        setIsGeneratingWebsite(false);
        
        setShowAchievement("Website Creator");
        // Would update user achievements and points in a real app
        
        toast({
          title: "Website Generated",
          description: "Your website has been generated successfully!",
          variant: "default",
        });
        
        setGeneratedContent({
          type: "website",
          content: response.html
        });
        
        // Set preview mode
        setPreviewMode(true);
        
        // Load HTML into iframe
        if (iframeRef.current) {
          const iframe = iframeRef.current;
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(response.html);
            iframeDoc.close();
          }
        }
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error generating website:", error);
      const errorMessage = (error as any)?.message || "An error occurred";
      
      // Check if error is due to missing API key
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
        setApiKeyService("openai");
        setApiKeyError("Valid OpenAI API key required for website generation");
        setApiKeyModalOpen(true);
      }
      
      setIsGeneratingWebsite(false);
      setWebsiteProgress(0);
      
      toast({
        title: "Error",
        description: "Failed to generate website. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to generate Replit app
  const handleReplitAppGeneration = async () => {
    if (!replitDescription.trim()) {
      toast({
        title: "Empty Description",
        description: "Please enter a description for your Replit app.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingReplit(true);
    setReplitProgress(10);
    setGeneratedContent(null);
    
    try {
      const response = await apiRequest("POST", "/api/generate-replit", {
        description: replitDescription,
        template: replitTemplate,
        language: replitLanguage
      });
      
      if (response.code) {
        setReplitProgress(100);
        setIsGeneratingReplit(false);
        
        setShowAchievement("App Creator");
        // Would update user achievements and points in a real app
        
        toast({
          title: "Replit App Created",
          description: "Your application code has been generated successfully!",
          variant: "default",
        });
        
        setGeneratedContent({
          type: "code",
          content: response.code
        });
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error generating Replit app:", error);
      const errorMessage = (error as any)?.message || "An error occurred";
      
      // Check if error is due to missing API key
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
        setApiKeyService("openai");
        setApiKeyError("Valid OpenAI API key required for app generation");
        setApiKeyModalOpen(true);
      }
      
      setIsGeneratingReplit(false);
      setReplitProgress(0);
      
      toast({
        title: "Error",
        description: "Failed to generate Replit app. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to generate image
  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a description for your image.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingImage(true);
    setImageProgress(20);
    setImageResult(null);
    setGeneratedContent(null);
    
    try {
      const response = await apiRequest("POST", "/api/generate-image", {
        prompt: imagePrompt,
        style: imageStyle,
        negativePrompt: negativePrompt || undefined
      });
      
      if (response.images && response.images.length > 0) {
        setImageProgress(100);
        setIsGeneratingImage(false);
        
        setImageResult({
          images: response.images,
          prompt: response.prompt,
          isFallback: response.isFallback
        });
        
        if (!response.isFallback) {
          setShowAchievement("Image Creator");
          // Would update user achievements and points in a real app
        }
        
        toast({
          title: "Image Generated",
          description: "Your AI image has been generated successfully!",
          variant: "default",
        });
        
        setGeneratedContent({
          type: "image",
          content: response.images
        });
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      const errorMessage = (error as any)?.message || "An error occurred";
      
      // Check if error is due to missing API key
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
        setApiKeyService("together");
        setApiKeyError("Valid Together API key required for image generation");
        setApiKeyModalOpen(true);
      }
      
      setIsGeneratingImage(false);
      setImageProgress(0);
      
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to render generated content
  const renderGeneratedContent = () => {
    if (!generatedContent) return null;
    
    switch (generatedContent.type) {
      case "text":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-primary">Transformed Text</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-gray-700 whitespace-pre-wrap">
                {generatedContent.content}
              </CardContent>
            </Card>
          </motion.div>
        );
        
      case "website":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-slate-50 border-b flex justify-between items-center">
                <CardTitle className="text-primary">Generated Website</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                    {previewMode ? "View Code" : "Preview"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden">
                {previewMode ? (
                  <div className="w-full bg-gray-100 min-h-[400px]">
                    <iframe
                      ref={iframeRef}
                      className="w-full h-[500px] border-0"
                      title="Website Preview"
                    />
                  </div>
                ) : (
                  <pre className="language-html p-4 overflow-auto max-h-[500px] text-sm">
                    <code>{generatedContent.content}</code>
                  </pre>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
        
      case "code":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-primary">Generated Code</CardTitle>
                <CardDescription>
                  Copy and paste this code into Replit to create your app
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden">
                <pre className="language-javascript p-4 overflow-auto max-h-[500px] text-sm">
                  <code>{generatedContent.content}</code>
                </pre>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t p-3 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent.content);
                    toast({
                      title: "Copied!",
                      description: "Code copied to clipboard",
                      variant: "default",
                    });
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Copy Code
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
        
      case "video":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-primary">Generated Video</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden">
                <div className="w-full bg-gray-900">
                  <video 
                    controls 
                    className="w-full h-auto" 
                    autoPlay 
                    loop
                    src={generatedContent.content}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t p-3 flex justify-between">
                <div>
                  <span className="text-sm text-gray-500">Generated from your prompt</span>
                </div>
                <a 
                  href={generatedContent.content} 
                  download="ai-generated-video.mp4"
                  className="text-primary text-sm hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Video
                </a>
              </CardFooter>
            </Card>
          </motion.div>
        );
        
      case "image":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-primary">Generated Images</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(generatedContent.content as string[]).map((imageUrl, index) => (
                    <div key={index} className="overflow-hidden rounded-md border">
                      <img 
                        src={imageUrl} 
                        alt={`Generated image ${index + 1}`} 
                        className="w-full h-auto object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t p-3 flex justify-between">
                <div>
                  <span className="text-sm text-gray-500">Generated from your prompt</span>
                </div>
                <a 
                  href={(generatedContent.content as string[])[0]} 
                  download="ai-generated-image.png"
                  className="text-primary text-sm hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Image
                </a>
              </CardFooter>
            </Card>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <section className="py-16 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              AI-Powered Content Tools
            </h2>
            <p className="text-lg text-gray-600 mt-2">Create videos, transform text, and build websites with advanced AI</p>
          </div>
          
          <Tabs defaultValue="text" className="mb-8" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 mb-8 w-full">
              <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Text Transformer
              </TabsTrigger>
              <TabsTrigger value="website" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Website Builder
              </TabsTrigger>
              <TabsTrigger value="replit" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Replit App Creator
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Video Generator
              </TabsTrigger>
              <TabsTrigger value="image" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Image Generator
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="video">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-secondary to-primary text-white p-4">
                    <div className="flex items-center">
                      <i className="ri-movie-line mr-2"></i>
                      <CardTitle className="font-medium">AI Video Generator</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Enter your prompt
                      </label>
                      <Textarea
                        rows={3}
                        placeholder="Describe the video you want to create..."
                        className="w-full transition-all focus:ring-2 focus:ring-primary"
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Style
                        </label>
                        <Select value={videoStyle} onValueChange={setVideoStyle}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3D Animation">3D Animation</SelectItem>
                            <SelectItem value="2D Animation">2D Animation</SelectItem>
                            <SelectItem value="Motion Graphics">Motion Graphics</SelectItem>
                            <SelectItem value="Cinematic">Cinematic</SelectItem>
                            <SelectItem value="Educational">Educational</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Duration
                        </label>
                        <Select value={videoDuration} onValueChange={setVideoDuration}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15 seconds">15 seconds</SelectItem>
                            <SelectItem value="30 seconds">30 seconds</SelectItem>
                            <SelectItem value="60 seconds">60 seconds</SelectItem>
                            <SelectItem value="2 minutes">2 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {isGeneratingVideo && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Video generation in progress</span>
                          <span>{videoProgress}%</span>
                        </div>
                        <Progress value={videoProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all" 
                      onClick={handleVideoGeneration}
                      disabled={isGeneratingVideo}
                    >
                      {isGeneratingVideo ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Video"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="text">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-secondary to-primary text-white p-4">
                    <div className="flex items-center">
                      <i className="ri-file-text-line mr-2"></i>
                      <CardTitle className="font-medium">AI Text Transformer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Enter your text
                      </label>
                      <Textarea
                        rows={5}
                        placeholder="Enter the text you want to transform..."
                        className="w-full transition-all focus:ring-2 focus:ring-primary"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Transformation Style
                        </label>
                        <Badge variant="outline" className="bg-primary text-white">
                          {transformStyle}
                        </Badge>
                      </div>
                      <Select value={transformStyle} onValueChange={setTransformStyle}>
                        <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Creative">Creative</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Simplified">Simplified</SelectItem>
                          <SelectItem value="Poetic">Poetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {isTransformingText && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Transformation in progress</span>
                          <span>{textProgress}%</span>
                        </div>
                        <Progress value={textProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all" 
                      onClick={handleTextTransform}
                      disabled={isTransformingText}
                    >
                      {isTransformingText ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Transforming...
                        </>
                      ) : (
                        "Transform Text"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="website">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-secondary to-primary text-white p-4">
                    <div className="flex items-center">
                      <i className="ri-global-line mr-2"></i>
                      <CardTitle className="font-medium">AI Website Builder</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Website Description
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="Describe the website you want to create..."
                        className="w-full transition-all focus:ring-2 focus:ring-primary"
                        value={websiteDescription}
                        onChange={(e) => setWebsiteDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Theme
                          </label>
                          <Badge variant="outline" className="bg-primary text-white">
                            {websiteTheme}
                          </Badge>
                        </div>
                        <Select value={websiteTheme} onValueChange={setWebsiteTheme}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Modern">Modern</SelectItem>
                            <SelectItem value="Minimalist">Minimalist</SelectItem>
                            <SelectItem value="Corporate">Corporate</SelectItem>
                            <SelectItem value="Creative">Creative</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Pages
                        </label>
                        <Select value={websitePages} onValueChange={setWebsitePages}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Landing Page">Landing Page</SelectItem>
                            <SelectItem value="Multi-page (3-5)">Multi-page (3-5)</SelectItem>
                            <SelectItem value="Portfolio">Portfolio</SelectItem>
                            <SelectItem value="Blog">Blog</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Branding Name (Optional)
                        </label>
                        <Input 
                          placeholder="Enter your brand name"
                          value={brandingName}
                          onChange={(e) => setBrandingName(e.target.value)}
                          className="transition-all focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    {isGeneratingWebsite && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Website generation in progress</span>
                          <span>{websiteProgress}%</span>
                        </div>
                        <Progress value={websiteProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all" 
                      onClick={handleWebsiteGeneration}
                      disabled={isGeneratingWebsite}
                    >
                      {isGeneratingWebsite ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Website...
                        </>
                      ) : (
                        "Generate Website"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="replit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-secondary to-primary text-white p-4">
                    <div className="flex items-center">
                      <i className="ri-code-box-line mr-2"></i>
                      <CardTitle className="font-medium">Replit App Generator</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        App Description
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="Describe the application you want to create..."
                        className="w-full transition-all focus:ring-2 focus:ring-primary"
                        value={replitDescription}
                        onChange={(e) => setReplitDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Template
                          </label>
                          <Badge variant="outline" className="bg-primary text-white">
                            {replitTemplate}
                          </Badge>
                        </div>
                        <Select value={replitTemplate} onValueChange={setReplitTemplate}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web App">Web App</SelectItem>
                            <SelectItem value="CLI Application">CLI Application</SelectItem>
                            <SelectItem value="API Server">API Server</SelectItem>
                            <SelectItem value="Game">Game</SelectItem>
                            <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Language
                          </label>
                          <Badge variant="outline" className="bg-primary text-white">
                            {replitLanguage}
                          </Badge>
                        </div>
                        <Select value={replitLanguage} onValueChange={setReplitLanguage}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="JavaScript">JavaScript</SelectItem>
                            <SelectItem value="TypeScript">TypeScript</SelectItem>
                            <SelectItem value="Python">Python</SelectItem>
                            <SelectItem value="HTML/CSS/JS">HTML/CSS/JS</SelectItem>
                            <SelectItem value="React">React</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {isGeneratingReplit && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Code generation in progress</span>
                          <span>{replitProgress}%</span>
                        </div>
                        <Progress value={replitProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all" 
                      onClick={handleReplitAppGeneration}
                      disabled={isGeneratingReplit}
                    >
                      {isGeneratingReplit ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Code...
                        </>
                      ) : (
                        "Generate Replit App"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="image">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-secondary to-primary text-white p-4">
                    <div className="flex items-center">
                      <i className="ri-image-line mr-2"></i>
                      <CardTitle className="font-medium">AI Image Generator</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Enter your prompt
                      </label>
                      <Textarea
                        rows={3}
                        placeholder="Describe the image you want to create..."
                        className="w-full transition-all focus:ring-2 focus:ring-primary"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Style
                        </label>
                        <Select value={imageStyle} onValueChange={setImageStyle}>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Photorealistic">Photorealistic</SelectItem>
                            <SelectItem value="Digital Art">Digital Art</SelectItem>
                            <SelectItem value="3D Render">3D Render</SelectItem>
                            <SelectItem value="Anime">Anime</SelectItem>
                            <SelectItem value="Oil Painting">Oil Painting</SelectItem>
                            <SelectItem value="Watercolor">Watercolor</SelectItem>
                            <SelectItem value="Sketch">Sketch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Negative Prompt (Optional)
                        </label>
                        <Textarea
                          rows={1}
                          placeholder="What to exclude from the image..."
                          className="w-full transition-all focus:ring-2 focus:ring-primary"
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {isGeneratingImage && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Image generation in progress</span>
                          <span>{imageProgress}%</span>
                        </div>
                        <Progress value={imageProgress} className="h-2" />
                      </div>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all" 
                      onClick={handleImageGeneration}
                      disabled={isGeneratingImage}
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Image"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {renderGeneratedContent()}
          
          <div className="mt-8">
            <AnimatePresence>
              {showAchievement && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed bottom-4 right-4 bg-gradient-to-r from-secondary to-primary text-white p-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
                >
                  <Award className="mr-2 h-5 w-5" />
                  <div>
                    <div className="font-bold">Achievement Unlocked!</div>
                    <div className="text-sm">{showAchievement}</div>
                  </div>
                  <div className="ml-3 font-bold text-yellow-200">+50 pts</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSuccess={() => {
          setApiKeyModalOpen(false);
          toast({
            title: "API Key Saved",
            description: "Your API key has been saved successfully.",
            variant: "default",
          });
        }}
        defaultService={apiKeyService}
        error={apiKeyError}
      />
    </>
  );
};

export default AITools;