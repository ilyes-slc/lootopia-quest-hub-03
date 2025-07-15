import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AvailableHunts from "./pages/AvailableHunts";
import HuntDetail from "./pages/HuntDetail";
import MyHunts from "./pages/MyHunts";
import CreateHunt from "./pages/CreateHunt";
import HuntDashboard from "./pages/HuntDashboard";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminHunts from "./pages/AdminHunts";
import AdminStats from "./pages/AdminStats";
import GameExperience from "./pages/GameExperience";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hunts" element={<AvailableHunts />} />
          <Route path="/hunt/:id" element={<HuntDetail />} />
          <Route path="/game/:id" element={<GameExperience />} />
          <Route path="/my-hunts" element={<MyHunts />} />
          <Route path="/create-hunt" element={<CreateHunt />} />
          <Route path="/dashboard" element={<HuntDashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/hunts" element={<AdminHunts />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
