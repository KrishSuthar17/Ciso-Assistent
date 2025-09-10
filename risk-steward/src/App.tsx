import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// Overview Pages
import Analytics from "./pages/overview/Analytics";
import Assignments from "./pages/overview/Assignments";

// Organization Pages
import Domains from "./pages/organization/Domains";
import Perimeters from "./pages/organization/Perimeters";
import Users from "./pages/organization/Users";
import UserGroups from "./pages/organization/UserGroups";

// tabs
import SummaryTab from "./pages/overview/tabs/Summary.tsx";
import GovernanceTab from "./pages/overview/tabs/Governance";
import RiskTab from "./pages/overview/tabs/Risk";
import ComplianceTab from "./pages/overview/tabs/Compliance";

// Additional pages
import Frameworks from "./pages/catalog/Frameworks";
import Assets from "./pages/assets/Assets";
import RiskAssessments from "./pages/risk/RiskAssessments";
import Evidences from "./pages/compliance/Evidences";

import NotFound from "./pages/NotFound";
import ImpactAnalysis from "./pages/assets/ImpactAnalysis.tsx";
import Threats from "./pages/catalog/Threats.tsx";
import Controls from "./pages/catalog/Controls.tsx";
import Mappings from "./pages/catalog/Mappings.tsx";
import RiskMatrices from "./pages/catalog/RiskMatrices.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {/* Overview Routes */}
            <Route path="/" element={<Analytics />} />
            <Route path="/overview/analytics" element={<Analytics />} />
            <Route path="/analytics" element={<Analytics />}>
              {/* Nested routes for tabs */}
              <Route path="summary" element={<SummaryTab />} />
              <Route path="governance" element={<GovernanceTab />} />
              <Route path="risk" element={<RiskTab />} />
              <Route path="compliance" element={<ComplianceTab />} />
            </Route>

            <Route path="/overview/assignments" element={<Assignments />} />

            {/* Organization Routes */}
            <Route path="/organization/domains" element={<Domains />} />
            <Route path="/organization/perimeters" element={<Perimeters />} />
            <Route path="/organization/users" element={<Users />} />
            <Route path="/organization/user-groups" element={<UserGroups />} />

            {/* Catalog Routes */}
            <Route path="/catalog/frameworks" element={<Frameworks />} />
            <Route path="/catalog/threats" element={<Threats />} />
            <Route path="/catalog/controls" element={<Controls />} />
            <Route path="/catalog/mappings" element={<Mappings />} />
            <Route path="/catalog/risk-matrices" element={<RiskMatrices />} />



            {/* Assets Routes */}
            <Route path="/assets/assets" element={<Assets />} />
            <Route path="/assets/list" element={<Assets />} />
            <Route path="/assets/ImpactAnalysis" element={<ImpactAnalysis />} />

            {/* Risk Routes */}
            <Route path="/risk/assessments" element={<RiskAssessments />} />

            {/* Compliance Routes */}
            <Route path="/compliance/evidences" element={<Evidences />} />

            {/* Placeholder routes for remaining modules */}
            <Route path="/catalog/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Catalog Module - Coming Soon</h1></div>} />
            <Route path="/assets/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Assets Management Module - Coming Soon</h1></div>} />
            <Route path="/operations/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Operations Module - Coming Soon</h1></div>} />
            <Route path="/governance/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Governance Module - Coming Soon</h1></div>} />
            <Route path="/risk/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Risk Module - Coming Soon</h1></div>} />
            <Route path="/compliance/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Compliance Module - Coming Soon</h1></div>} />
            <Route path="/third-parties/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Third Parties Module - Coming Soon</h1></div>} />
            <Route path="/privacy/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Privacy Module - Coming Soon</h1></div>} />
            <Route path="/extra/*" element={<div className="p-6"><h1 className="text-2xl font-bold">Extra Module - Coming Soon</h1></div>} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;