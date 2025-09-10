import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Building2,
  BookOpen,
  HardDrive,
  Settings,
  Shield,
  AlertTriangle,
  FileCheck,
  Users,
  Eye,
  MoreHorizontal,
  ChevronDown,
  Home,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const navigationItems = [
  {
    title: "Overview",
    icon: Home,
    items: [
      { title: "Analytics", url: "/overview/analytics" },
      { title: "My assignments", url: "/overview/assignments" },
    ],
  },
  {
    title: "Organization",
    icon: Building2,
    items: [
      { title: "Domains", url: "/organization/domains" },
      { title: "Perimeters", url: "/organization/perimeters" },
      { title: "Users", url: "/organization/users" },
      { title: "User groups", url: "/organization/user-groups" },
    ],
  },
  {
    title: "Catalog",
    icon: BookOpen,
    items: [
      { title: "Frameworks", url: "/catalog/frameworks" },
      { title: "Threats", url: "/catalog/Threats" },
      { title: "Reference controls", url: "/catalog/Controls" },
      { title: "Mappings", url: "/catalog/Mappings" },
      { title: "Risk matrices", url: "/catalog/Risk-Matrices" },
    ],
  },
  {
    title: "Assets Management",
    icon: HardDrive,
    items: [
      { title: "Assets", url: "/assets/assets" },
      { title: "Business Impact Analysis", url: "/assets/ImpactAnalysis" },
    ],
  },
  {
    title: "Operations",
    icon: Settings,
    items: [
      { title: "Applied controls", url: "/operations/applied-controls" },
      { title: "Calendar", url: "/operations/calendar" },
      { title: "X-rays", url: "/operations/x-rays" },
      { title: "Incidents", url: "/operations/incidents" },
      { title: "Tasks", url: "/operations/tasks" },
    ],
  },
  {
    title: "Governance",
    icon: Shield,
    items: [
      { title: "Libraries", url: "/governance/libraries" },
      { title: "Policies", url: "/governance/policies" },
      { title: "Issues (ISO)", url: "/governance/issues" },
      { title: "Objectives (ISO)", url: "/governance/objectives" },
      { title: "Risk acceptances", url: "/governance/risk-acceptances" },
      { title: "Exceptions", url: "/governance/exceptions" },
      { title: "Findings tracking", url: "/governance/findings" },
    ],
  },
  {
    title: "Risk",
    icon: AlertTriangle,
    items: [
      { title: "Risk assessments", url: "/risk/assessments" },
      { title: "Ebios RM", url: "/risk/ebios-rm" },
      { title: "Risk scenarios", url: "/risk/scenarios" },
      { title: "Scoring assistant", url: "/risk/scoring" },
      { title: "Vulnerabilities", url: "/risk/vulnerabilities" },
    ],
  },
  {
    title: "Compliance",
    icon: FileCheck,
    items: [
      { title: "Audits", url: "/compliance/audits" },
      { title: "Evidences", url: "/compliance/evidences" },
      { title: "Recap", url: "/compliance/recap" },
    ],
  },
  {
    title: "Third Parties",
    icon: Users,
    items: [
      { title: "Overview", url: "/third-parties/overview" },
      { title: "Entities", url: "/third-parties/entities" },
      { title: "Representatives", url: "/third-parties/representatives" },
      { title: "Solutions", url: "/third-parties/solutions" },
      { title: "Entity assessments", url: "/third-parties/assessments" },
    ],
  },
  {
    title: "Privacy",
    icon: Eye,
    items: [
      { title: "Overview", url: "/privacy/overview" },
      { title: "Processings", url: "/privacy/processings" },
      { title: "Personal Data", url: "/privacy/personal-data" },
      { title: "Purposes", url: "/privacy/purposes" },
    ],
  },
  {
    title: "Extra",
    icon: MoreHorizontal,
    items: [
      { title: "Labels", url: "/extra/labels" },
      { title: "Terminologies", url: "/extra/terminologies" },
      { title: "Settings", url: "/extra/settings" },
      { title: "Backup & restore", url: "/extra/backup" },
      { title: "Experimental", url: "/extra/experimental" },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>(['Overview']);
  const collapsed = state === "collapsed";

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev =>
      prev.includes(groupTitle)
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-sidebar-primary" />
            {!collapsed && (
              <span className="font-bold text-sidebar-foreground">GRC Trackr</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Collapsible
                    open={openGroups.includes(item.title)}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                        {!collapsed && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${openGroups.includes(item.title) ? 'rotate-180' : ''
                              }`}
                          />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!collapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.url}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    `block px-3 py-2 text-sm rounded-md transition-colors ${isActive
                                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                    }`
                                  }
                                >
                                  {subItem.title}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}