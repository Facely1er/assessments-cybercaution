import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { 
  Settings as SettingsIcon, 
  User, 
  ShieldCheck, 
  Bell, 
  Mail, 
  Globe, 
  CheckCircle,
  UserCircle,
  LogOut,
  Trash
} from 'lucide-react';
import { toast } from '../components/ui/Toaster';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleSaveChanges = () => {
    toast.success('Settings saved', 'Your changes have been saved successfully');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <Card className="md:w-64 flex-shrink-0">
          <CardContent className="p-4">
            <nav className="space-y-1">
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm ${
                  activeTab === 'profile' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
              
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm ${
                  activeTab === 'security' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Security</span>
              </button>
              
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm ${
                  activeTab === 'notifications' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </button>
              
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm ${
                  activeTab === 'api' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveTab('api')}
              >
                <Globe className="h-4 w-4" />
                <span>API Access</span>
              </button>
              
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm ${
                  activeTab === 'system' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveTab('system')}
              >
                <SettingsIcon className="h-4 w-4" />
                <span>System Settings</span>
              </button>
            </nav>
            
            <div className="pt-4 mt-4 border-t border-border">
              <button
                className="w-full flex items-center space-x-2 p-2 rounded-md text-sm text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="rounded-full w-24 h-24 object-cover" 
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <UserCircle className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Job Title</label>
                        <input
                          type="text"
                          defaultValue="Risk Manager"
                          className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Department</label>
                        <input
                          type="text"
                          defaultValue="Security & Compliance"
                          className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="Risk management professional with over 5 years of experience in information security and compliance."
                        className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-medium mb-4">Preferences</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Language</p>
                        <p className="text-xs text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Date Format</p>
                        <p className="text-xs text-muted-foreground">Choose your preferred date format</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Time Zone</p>
                        <p className="text-xs text-muted-foreground">Set your timezone for accurate reporting</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>Eastern Time (ET)</option>
                        <option>Pacific Time (PT)</option>
                        <option>UTC</option>
                        <option>Central European Time (CET)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full rounded-md border-border bg-background py-2 px-3 text-sm"
                      />
                    </div>
                  </div>
                  
                  <Button>Update Password</Button>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Windows • Chrome • New York, USA</p>
                      </div>
                      <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Mobile Session</p>
                        <p className="text-xs text-muted-foreground">iOS • Safari • Boston, USA</p>
                      </div>
                      <Button variant="ghost" size="sm">Sign Out</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Sign Out All Other Sessions
                  </Button>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>
                  
                  <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Delete Account</p>
                      <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Risk Updates</p>
                        <p className="text-xs text-muted-foreground">Receive notifications when risks are updated</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="risk-updates" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Compliance Changes</p>
                        <p className="text-xs text-muted-foreground">Receive notifications about compliance status changes</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="compliance-changes" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Report Generation</p>
                        <p className="text-xs text-muted-foreground">Receive notifications when reports are generated</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="report-generation" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">System Updates</p>
                        <p className="text-xs text-muted-foreground">Receive notifications about system updates</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="system-updates" 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Risk Assignments</p>
                        <p className="text-xs text-muted-foreground">Receive notifications when risks are assigned to you</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="risk-assignments" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Treatment Due Dates</p>
                        <p className="text-xs text-muted-foreground">Receive reminders for upcoming treatment due dates</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="treatment-due-dates" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Comments & Mentions</p>
                        <p className="text-xs text-muted-foreground">Receive notifications when you are mentioned in comments</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="comments-mentions" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Notification Schedule</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Summary Email Frequency</p>
                      <p className="text-xs text-muted-foreground">How often you receive summary emails</p>
                    </div>
                    <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button onClick={handleSaveChanges}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'api' && (
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage API keys and integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">API Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our RESTful API allows you to integrate risk management data with your other systems and applications.
                  </p>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    View API Documentation
                  </Button>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">API Keys</h3>
                    <Button size="sm">Generate New Key</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium">Production API Key</p>
                          <p className="text-xs text-muted-foreground">Created on Mar 10, 2025</p>
                        </div>
                        <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Active</span>
                      </div>
                      <div className="flex items-center justify-between bg-muted p-2 rounded">
                        <code className="text-xs">••••••••••••••••••••••••••8f23</code>
                        <Button variant="ghost" size="sm">Show</Button>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" size="sm">Revoke</Button>
                        <Button variant="ghost" size="sm">Copy</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg opacity-60">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium">Development API Key</p>
                          <p className="text-xs text-muted-foreground">Created on Jan 15, 2025</p>
                        </div>
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">Revoked</span>
                      </div>
                      <div className="flex items-center justify-between bg-muted p-2 rounded">
                        <code className="text-xs">••••••••••••••••••••••••••3a12</code>
                        <Button variant="ghost" size="sm" disabled>Show</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Webhooks</h3>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-medium">Risk Update Webhook</p>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="risk-webhook" 
                          defaultChecked 
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Endpoint URL</label>
                      <input
                        type="text"
                        defaultValue="https://example.com/webhooks/risks"
                        className="w-full rounded-md border-border bg-background py-1.5 px-3 text-sm"
                      />
                    </div>
                    <div className="flex items-center mt-3 text-xs text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Last delivery successful at Mar 19, 2025, 14:23 UTC
                    </div>
                  </div>
                  
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Access Control</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">IP Restriction</p>
                        <p className="text-xs text-muted-foreground">Limit API access to specific IP addresses</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="ip-restriction" 
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Rate Limiting</p>
                        <p className="text-xs text-muted-foreground">Current limit: 100 requests per minute</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>100/minute</option>
                        <option>500/minute</option>
                        <option>1000/minute</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Save API Settings</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'system' && (
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Risk Calculation</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Risk Calculation Method</p>
                        <p className="text-xs text-muted-foreground">Define how risk scores are calculated</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>Standard (L×I)</option>
                        <option>Advanced (L×I×V)</option>
                        <option>Custom Formula</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Risk Level Thresholds</p>
                        <p className="text-xs text-muted-foreground">Define score ranges for risk levels</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Risk Register</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Default Risk Owner</p>
                        <p className="text-xs text-muted-foreground">Default assignment for new risks</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>Select User</option>
                        <option selected>John Doe</option>
                        <option>Jane Smith</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Risk ID Format</p>
                        <p className="text-xs text-muted-foreground">Format for automatically generated risk IDs</p>
                      </div>
                      <input
                        type="text"
                        defaultValue="RISK-{YYYY}-{####}"
                        className="rounded-md border-border bg-background py-1 px-2 text-sm w-44"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Risk Retention Period</p>
                        <p className="text-xs text-muted-foreground">How long to keep closed risks in the register</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>6 months</option>
                        <option>1 year</option>
                        <option selected>3 years</option>
                        <option>Indefinitely</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Compliance</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Default Framework</p>
                        <p className="text-xs text-muted-foreground">Primary regulatory framework</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>NIST CSF</option>
                        <option selected>ISO 27001</option>
                        <option>NIST 800-53</option>
                        <option>GDPR</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Compliance Reassessment Interval</p>
                        <p className="text-xs text-muted-foreground">How often to reassess compliance</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>Monthly</option>
                        <option selected>Quarterly</option>
                        <option>Bi-annually</option>
                        <option>Annually</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-sm font-medium">Data Management</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Automatic Backups</p>
                        <p className="text-xs text-muted-foreground">Frequency of data backups</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option>Daily</option>
                        <option selected>Weekly</option>
                        <option>Monthly</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Data Export Format</p>
                        <p className="text-xs text-muted-foreground">Default format for data exports</p>
                      </div>
                      <select className="rounded-md border-border bg-background py-1 px-2 text-sm">
                        <option selected>JSON</option>
                        <option>CSV</option>
                        <option>Excel</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Backup Now
                  </Button>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button onClick={handleSaveChanges}>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;