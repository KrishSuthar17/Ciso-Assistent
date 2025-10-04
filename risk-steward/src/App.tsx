import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  Navigate,
} from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// Overview Pages
import Analytics from "./pages/overview/Analytics";
import Assignments from "./pages/overview/Assignments";

// Organization Pages
import Domains from "./pages/organization/Domains";
import Perimeters from "./pages/organization/Perimeters";
import Users from "./pages/organization/Users";
import UserGroups from "./pages/organization/UserGroups";

// Governance Pages
import Exceptions from "./pages/governance/Exceptions.tsx";
import Findings from "./pages/governance/Findings.tsx";
import Issues from "./pages/governance/Issues.tsx";
import Libraries from "./pages/governance/Libraries.tsx";
import Objectives from "./pages/governance/Objectives.tsx";
import Policies from "./pages/governance/Policies.tsx";
import RiskAcceptances from "./pages/governance/RiskAcceptances.tsx";

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
import AppliedControls from "./pages/operations/AppliedControls.tsx";
import Calendar from "./pages/operations/Calendar.tsx";
import Incidents from "./pages/operations/Incidents.tsx";
import Tasks from "./pages/operations/Tasks.tsx";
import XRays from "./pages/operations/XRays.tsx";
import EbiosRM from "./pages/risk/EbiosRM.tsx";
import RiskScenarios from "./pages/risk/RiskScenarios.tsx";
import ScoringAssistant from "./pages/risk/ScoringAssistant.tsx";
import Vulnerabilities from "./pages/risk/Vulnerabilities.tsx";
import Entities from "./pages/third-parties/Entities.tsx";
import EntityAssessments from "./pages/third-parties/EntityAssessments.tsx";
import PrivacyOverview from "./pages/privacy/Overview.tsx";
import Representatives from "./pages/third-parties/Representatives.tsx";
import Solutions from "./pages/third-parties/Solutions.tsx";
import ThirdPartiesOverview from "./pages/third-parties/Overview.tsx";

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
            <Route path="/" element={<SummaryTab />} />
            <Route path="/overview/analytics" element={<Analytics />} />

            {/* Analytics parent route */}
            <Route path="/analytics" element={<Analytics />}>
              {/* Default child route */}
              <Route index element={<Navigate to="summary" replace />} />

              {/* Child tab routes */}
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

            {/* Governance Routes */}
            <Route path="/governance/exceptions" element={<Exceptions />} />
            <Route path="/governance/findings" element={<Findings />} />
            <Route path="/governance/issues" element={<Issues />} />
            <Route path="/governance/libraries" element={<Libraries />} />
            <Route path="/governance/objectives" element={<Objectives />} />
            <Route path="/governance/policies" element={<Policies />} />
            <Route
              path="/governance/risk-acceptances"
              element={<RiskAcceptances />}
            />

            {/* Risk Routes */}
            <Route path="/risk/assessments" element={<RiskAssessments />} />
            <Route path="/risk/ebios-rm" element={<EbiosRM />} />
            <Route path="/risk/scenarios" element={<RiskScenarios />} />
            <Route path="/risk/scoring" element={<ScoringAssistant />} />
            <Route path="/risk/vulnerabilities" element={<Vulnerabilities />} />

            {/* Compliance Routes */}
            <Route path="/compliance/evidences" element={<Evidences />} />

            {/* Placeholder routes */}
            <Route
              path="/catalog/*"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    Catalog Module - Coming Soon
                  </h1>
                </div>
              }
            />
            <Route
              path="/assets/*"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    Assets Management Module - Coming Soon
                  </h1>
                </div>
              }
            />

            {/* Operation Routes */}
            <Route
              path="/operations/applied-controls"
              element={<AppliedControls />}
            />
            <Route path="/operations/calendar" element={<Calendar />} />
            <Route path="/operations/incidents" element={<Incidents />} />
            <Route path="/operations/tasks" element={<Tasks />} />
            <Route path="/operations/x-rays" element={<XRays />} />

            <Route
              path="/compliance/*"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    Compliance Module - Coming Soon
                  </h1>
                </div>
              }
            />

            {/* Third Parties Route */}
            <Route path="/third-parties/entities" element={<Entities />} />
            <Route
              path="/third-parties/assessments"
              element={<EntityAssessments />}
            />
            <Route
              path="/third-parties/overview"
              element={<ThirdPartiesOverview />}
            />
            <Route
              path="/third-parties/representatives"
              element={<Representatives />}
            />
            <Route path="/third-parties/solutions" element={<Solutions />} />

            <Route
              path="/privacy/*"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    Privacy Module - Coming Soon
                  </h1>
                </div>
              }
            />
            <Route
              path="/extra/*"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    Extra Module - Coming Soon
                  </h1>
                </div>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
