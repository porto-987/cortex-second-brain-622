
import { 
  Home,
  FileText, 
  ClipboardList, 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings,
  Brain,
  TrendingUp
} from "lucide-react";

export const menuItems = [
  {
    id: "accueil",
    labelKey: "navigation.dashboard",
    icon: Home,
    section: "dashboard"
  },
  {
    id: "textes-juridiques",
    labelKey: "navigation.legalTexts",
    icon: FileText,
    submenu: [
      { labelKey: "navigation.menu.legal.catalog", section: "legal-catalog" },
      { labelKey: "navigation.menu.legal.enrichment", section: "legal-enrichment" },
      { labelKey: "navigation.menu.legal.search", section: "legal-search" }
    ]
  },
  {
    id: "procedures-administratives",
    labelKey: "navigation.procedures",
    icon: ClipboardList,
    submenu: [
      { labelKey: "navigation.menu.procedures.catalog", section: "procedures-catalog" },
      { labelKey: "navigation.menu.procedures.enrichment", section: "procedures-enrichment" },
      { labelKey: "navigation.menu.procedures.search", section: "procedures-search" },
      { labelKey: "navigation.menu.procedures.resources", section: "procedures-resources" }
    ]
  },
  {
    id: "analyse-rapports",
    labelKey: "navigation.analysis",
    icon: BarChart3,
    submenu: [
      { labelKey: "navigation.menu.analysis.dashboards", section: "dashboards" },
      { labelKey: "navigation.menu.analysis.analyticsDashboards", section: "analytics-dashboards" },
      { labelKey: "navigation.menu.analysis.analysis", section: "analysis" },
      { labelKey: "navigation.menu.analysis.reports", section: "reports" },
      { labelKey: "navigation.menu.analysis.assistedWriting", section: "assisted-writing" }
    ]
  },
  {
    id: "intelligence-artificielle",
    labelKey: "navigation.ai",
    icon: Brain,
    submenu: [
      { labelKey: "navigation.menu.ai.assistant", section: "ai-assistant" },
      { labelKey: "navigation.menu.ai.advanced", section: "ai-advanced" },
      { labelKey: "navigation.menu.ai.search", section: "ai-search" }
    ]
  },
  {
    id: "collaboration",
    labelKey: "navigation.collaboration",
    icon: Users,
    submenu: [
      { labelKey: "navigation.menu.collaboration.forum", section: "forum" },
      { labelKey: "navigation.menu.collaboration.workspace", section: "collaborative-workspace" },
      { labelKey: "navigation.menu.collaboration.sharedResources", section: "shared-resources" }
    ]
  },
  {
    id: "actualites-references",
    labelKey: "navigation.news",
    icon: BookOpen,
    submenu: [
      { labelKey: "navigation.menu.news.news", section: "news" },
      { labelKey: "navigation.menu.news.library", section: "library" },
      { labelKey: "navigation.menu.news.dictionaries", section: "dictionaries" },
      { labelKey: "navigation.menu.news.directories", section: "directories" }
    ]
  },
  {
    id: "configuration",
    labelKey: "navigation.configuration",
    icon: Settings,
    submenu: [
      { labelKey: "navigation.menu.config.nomenclature", section: "nomenclature" },
      { labelKey: "navigation.menu.config.complementaryResources", section: "complementary-resources" },
      { labelKey: "navigation.menu.config.dataManagement", section: "data-management" },
      { labelKey: "navigation.menu.config.alertsNotifications", section: "alerts-notifications" },
      { labelKey: "navigation.menu.config.userManagement", section: "user-management" },
      { labelKey: "navigation.menu.config.security", section: "security" },
      { labelKey: "navigation.menu.config.performance", section: "performance-scalability" },
      { labelKey: "navigation.menu.config.integrations", section: "integrations-interoperability" },
      { labelKey: "navigation.menu.config.accessibility", section: "accessibility-settings" },
      { labelKey: "navigation.menu.config.offline", section: "offline-mode" },
      { labelKey: "navigation.menu.config.mobile", section: "mobile-app" }
    ]
  }
];
