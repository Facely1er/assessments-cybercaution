import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  SunMoon, 
  Moon, 
  User, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Menu, 
  Check, 
  AlertTriangle, 
  Network, 
  ChevronDown, 
  LayoutDashboard, 
  Gauge, 
  ClipboardList, 
  BarChart2, 
  Building2, 
  Heart, 
  LinkIcon, 
  ShieldCheck, 
  Lock, 
  FileText, 
  FileCheck, 
  LayoutGrid, 
  Mailbox as Toolbox, 
  GraduationCap,
  Home
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../ui/Toaster';
import { Button } from '../ui/Button';

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
  toggleMobileMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, darkMode, toggleMobileMenu }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Close dropdowns when location changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);
  
  const notifications = [
    { id: 1, title: 'Risk assessment due', message: 'Quarterly risk assessment is due in 3 days', time: '2 hours ago', read: false },
    { id: 2, title: 'New compliance framework', message: 'NIST CSF 2.0 framework has been added', time: '1 day ago', read: false },
    { id: 3, title: 'System update scheduled', message: 'Maintenance window scheduled for Sunday 2:00 AM', time: '2 days ago', read: true },
  ];

  // Consolidated quick tools with focused functionality
  const quickTools = [
    { name: 'Ransomware Assessment', path: '/ransomware-assessment', icon: AlertTriangle },
    { name: 'Supply Chain Assessment', path: '/supply-chain-assessment', icon: Network },
    { name: 'NIST CSF Alignment', path: '/nist-csf-alignment', icon: Check },
    { name: 'Tabletop Exercise', path: '/tabletop-exercise', icon: Check },
  ];

  // Streamlined main menu structure with clearer organization
  const mainMenuItems = [
    {
      name: 'Security Assessments',
      icon: Gauge,
      items: [
        { name: 'Dashboard', path: '/app/dashboard-new', icon: LayoutDashboard },
        { name: 'Ransomware Protection', path: '/app/ransomware', icon: AlertTriangle },
        { name: 'Supply Chain Security', path: '/app/supply-chain-risk-dashboard', icon: Network },
        { name: 'NIST CSF Alignment', path: '/nist-csf-alignment', icon: Check }
      ]
    },
    {
      name: 'Risk Management',
      icon: BarChart2,
      items: [
        { name: 'Risk Register', path: '/app/risk-register', icon: ClipboardList },
        { name: 'Risk Assessment', path: '/app/risk-assessment', icon: BarChart2 },
        { name: 'Business Impact', path: '/app/business-impact', icon: Building2 },
        { name: 'Continuity Planning', path: '/app/continuity', icon: Heart }
      ]
    },
    {
      name: 'Compliance',
      icon: ShieldCheck,
      items: [
        { name: 'Control Mapping', path: '/app/control-mapping', icon: LinkIcon },
        { name: 'Frameworks', path: '/app/compliance', icon: ShieldCheck },
        { name: 'RMF Dashboard', path: '/app/rmf', icon: Lock }
      ]
    },
    {
      name: 'Resources',
      icon: FileText,
      items: [
        { name: 'Documents', path: '/app/documents', icon: FileText },
        { name: 'Evidence', path: '/app/evidence', icon: FileCheck },
        { name: 'Asset Inventory', path: '/app/inventory', icon: LayoutGrid },
        { name: 'Tools & Utilities', path: '/app/toolkit', icon: Toolbox }
      ]
    }
  ];
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully', 'You have been logged out of your account');
    setShowUserMenu(false);
  };

  const handleDropdownToggle = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isMenuItemActive = (item: {name: string, items: {path: string}[]}) => {
    return item.items.some(subItem => location.pathname === subItem.path);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full flex-shrink-0 bg-background shadow-md backdrop-blur-sm">
      <div className="flex flex-1 justify-between px-4">
        {toggleMobileMenu && (
          <button 
            className="md:hidden flex items-center px-2"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        )}
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-4 group">
            <img 
              src="/cybercaution.png" 
              alt="CyberCaution Logo" 
              className="h-10 w-10 transform group-hover:scale-110 transition-transform" 
            />
            <span className="ml-2 text-lg font-bold text-foreground hidden md:block">CyberCaution<sup>™</sup><span className="text-sm font-normal text-muted-foreground ml-1">by ERMITS</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-foreground hover:bg-muted"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            
            {mainMenuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={(e) => handleDropdownToggle(e, item.name)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isMenuItemActive(item) 
                      ? "bg-electric-blue/10 text-electric-blue" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <span>{item.name}</span>
                  <ChevronDown className={`h-3.5 w-3.5 ml-0.5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === item.name && (
                  <div className="absolute z-50 left-0 mt-1 w-48 rounded-md bg-background border border-border shadow-lg">
                    <div className="py-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <subItem.icon className="h-4 w-4 mr-2" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-md items-center justify-center">
          <div className="relative w-full max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <input
              className="block w-full rounded-md border border-input bg-background py-1.5 pl-10 pr-3 text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-electric-blue sm:text-sm sm:leading-6"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
        
        <div className="flex items-center md:ml-6 space-x-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground hover:bg-muted/70"
              onClick={(e) => {
                e.stopPropagation();
                setShowToolsMenu(!showToolsMenu);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              aria-label="Quick tools"
            >
              <Check className="h-5 w-5" aria-hidden="true" />
            </Button>
            
            {showToolsMenu && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-background border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in slide-in">
                <div className="p-3 border-b border-border">
                  <h3 className="font-medium">Quick Assessments</h3>
                </div>
                <div className="py-1">
                  {quickTools.map((tool) => (
                    <Link 
                      key={tool.name}
                      to={tool.path} 
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setShowToolsMenu(false)}
                    >
                      <tool.icon className="h-4 w-4 mr-2" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-foreground hover:bg-muted/70"
            aria-label="View help"
          >
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-foreground hover:bg-muted/70"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunMoon className="h-5 w-5 hover:rotate-12 transition-transform" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5 hover:rotate-12 transition-transform" aria-hidden="true" />
            )}
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground hover:bg-muted/70"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowToolsMenu(false);
                setShowUserMenu(false);
              }}
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notifications.some(n => !n.read) && (
                <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-critical-red ring-2 ring-background animate-pulse" />
              )}
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-background border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in slide-in">
                <div className="p-3 border-b border-border">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto py-1">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "px-4 py-3 hover:bg-muted cursor-pointer border-l-2 transition-all",
                        notification.read ? "border-transparent" : "border-electric-blue"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-foreground">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border flex justify-center">
                  <Button variant="link" size="sm" className="text-xs">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowToolsMenu(false);
              }}
              aria-expanded={showUserMenu}
              aria-haspopup="true"
              aria-label="Open user menu"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full" 
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-muted-foreground text-background flex items-center justify-center ring-2 ring-electric-blue/20">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </Button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-background border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in slide-in">
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user?.email || 'user@example.com'}</p>
                  </div>
                  <Link 
                    to="/app/settings" 
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;