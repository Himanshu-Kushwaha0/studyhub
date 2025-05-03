import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import InnovationLabPage from "@/pages/InnovationLabPage";
import VirtualLabsPage from "@/pages/VirtualLabsPage";
import AIToolsPage from "@/pages/AIToolsPage";
import QuantumComputingPage from "@/pages/QuantumComputingPage";
import CollaborationPage from "@/pages/CollaborationPage";
import Dashboard from "@/pages/Dashboard";
import EasterEggs from "@/components/easter-eggs/EasterEggs";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/innovation-lab" component={InnovationLabPage} />
          <Route path="/virtual-labs" component={VirtualLabsPage} />
          <Route path="/ai-tools" component={AIToolsPage} />
          <Route path="/quantum-computing" component={QuantumComputingPage} />
          <Route path="/collaboration" component={CollaborationPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      <EasterEggs />
    </QueryClientProvider>
  );
}

export default App;
