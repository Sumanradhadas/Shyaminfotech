import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { AIAssistant } from "@/components/AIAssistant";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import WhyChooseUs from "@/pages/WhyChooseUs";
import VerifyCertificate from "@/pages/VerifyCertificate";
import Admission from "@/pages/Admission";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/courses" component={Courses} />
      <Route path="/why-choose-us" component={WhyChooseUs} />
      <Route path="/verify-certificate" component={VerifyCertificate} />
      <Route path="/admission" component={Admission} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navigation />
        <Router />
        <AIAssistant />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
