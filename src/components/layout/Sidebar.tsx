import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  LineChart, 
  ShieldCheck, 
  FileText, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Shield,
  Link as LinkIcon,
  FileCheck,
  BookOpen,
  BarChart3,
  AlertTriangle,
  Network,
  Lock,
  FileDigit,
  Users,
  Building2,
  Heart,
  Mailbox as Toolbox,
  GraduationCap,
  LayoutGrid,
  Gauge
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapsed }) => {
  const { user } = useAuth();

  // Reorganized navigation structure with clear grouping and reduced redundancy
  const navigationItems = [
    // Main Dashboard
    { type: 'item', name: 'Dashboard', to: '/app/dashboard-new', icon: LayoutDashboard },
    
    // Assessments Section
    { type: 'divider', label: 'Assessments' },
    { type: 'item', name: 'Ransomware Protection', to: '/app/ransomware', icon: AlertTriangle },
    { type: 'item', name: 'Supply Chain Risk', to: '/app/supply-chain-risk-dashboard', icon: Network },
    { type: 'item', name: 'NIST CSF Alignment', to: '/app/nist-csf-alignment', icon: Shield },
    
    // Risk Management Section
    { type: 'divider', label: 'Risk Management' },
    { type: 'item', name: 'Risk Register', to: '/app/risk-register', icon: ClipboardList },
    { type: 'item', name: 'Risk Assessment', to: '/app/risk-assessment', icon: LineChart },
    { type: 'item', name: 'Business Impact', to: '/app/business-impact', icon: Building2 },
    { type: 'item', name: 'Business Continuity', to: '/app/continuity', icon: Heart },
    
    // Compliance Section
    { type: 'divider', label: 'Compliance' },
    { type: 'item', name: 'Control Mapping', to: '/app/control-mapping', icon: LinkIcon },
    { type: 'item', name: 'Frameworks', to: '/app/compliance', icon: ShieldCheck },
    { type: 'item', name: 'RMF Dashboard', to: '/app/rmf', icon: Lock },
    
    // Resources Section
    { type: 'divider', label: 'Resources' },
    { type: 'item', name: 'Documents', to: '/app/documents', icon: FileText },
    { type: 'item', name: 'Evidence', to: '/app/evidence', icon: FileCheck },
    { type: 'item', name: 'Asset Inventory', to: '/app/inventory', icon: LayoutGrid },
    { type: 'item', name: 'Toolkit', to: '/app/toolkit', icon: Toolbox },
    { type: 'item', name: 'Training', to: '/app/training', icon: GraduationCap },
    
    // Settings (always at the bottom)
    { type: 'divider', label: 'System' },
    { type: 'item', name: 'Settings', to: '/app/settings', icon: Settings },
  ];

  const mockUser = user || {
    id: 'dev-user',
    name: 'Development User',
    role: 'admin',
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-gray-100 dark:bg-gray-800 border-r border-border transition-all duration-300 ease-in-out z-30 h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 border-b border-border flex items-center px-4 bg-white dark:bg-gray-900">
        <Link to="/" className={cn("flex items-center", collapsed ? "mx-auto" : "")}>
          {!collapsed ? (
            <>
              <img 
                src="/cybercaution.png" 
                alt="CyberCaution Logo" 
                className="h-8 w-8" 
              />
              <div className="ml-2">
                <span className="text-xl font-semibold text-foreground block leading-none">CyberCenter</span>
                  </div>
            </>
          ) : (
            <img 
              src="/cybercaution.png" 
              alt="CyberCaution Logo" 
              className="w-10 h-10" 
            />
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={toggleCollapsed}
            className="rounded-full p-1 hover:bg-muted transition-colors ml-auto"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={toggleCollapsed}
            className="rounded-full p-1 hover:bg-muted transition-colors mt-2"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-0.5 px-2">
          {navigationItems.map((item, index) => (
            item.type === 'divider' ? 
              (!collapsed && (
                <div key={index} className="px-3 py-2 mt-4 mb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              )) 
            : 
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-electric-blue text-white dark:bg-dark-electric dark:text-white"
                      : "text-foreground hover:bg-white dark:hover:bg-gray-700",
                    collapsed ? "justify-center" : "justify-start"
                  )
                }
              >
                <item.icon className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between bg-white dark:bg-gray-900">
        {!collapsed ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-muted-foreground text-background flex items-center justify-center">
              {mockUser?.name?.charAt(0)}
            </div>
            <div className="ml-3 truncate">
              <p className="text-sm font-medium text-foreground">{mockUser?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{mockUser?.role.replace('_', ' ')}</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-muted-foreground text-background flex items-center justify-center mx-auto">
            {mockUser?.name?.charAt(0)}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;