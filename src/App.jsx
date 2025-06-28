
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";
import AdminAddPatients from "./pages/AdminAddPatients";
import AdminAddRecords from "./pages/AdminAddRecords";
import Messages from "./pages/Messages";
import Records from "./pages/Records";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen w-full bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Top Bar */}
              <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              
              {/* Page Content */}
              <main className="flex-1 overflow-auto p-4 md:p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/patients/add" element={<AdminAddPatients />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/doctors/add" element={<AddDoctor />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/records" element={<Records />} />
                  <Route path="/records/add" element={<AdminAddRecords />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
