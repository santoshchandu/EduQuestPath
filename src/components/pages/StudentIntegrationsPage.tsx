import { useState } from "react";
import { Puzzle, CheckCircle, Settings, Plus, Globe, Smartphone, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

interface StudentIntegrationsPageProps {
  user: any;
}

const availableIntegrations = [
  {
    id: 1,
    name: "Google Calendar",
    description: "Sync your class schedules and assignment deadlines with Google Calendar",
    icon: Calendar,
    category: "Productivity",
    connected: true,
    features: ["Class Schedule Sync", "Assignment Reminders", "Exam Notifications"],
    setupTime: "2 minutes"
  },
  {
    id: 2,
    name: "Microsoft Office 365",
    description: "Access and edit documents directly from the learning platform",
    icon: FileText,
    category: "Documents",
    connected: false,
    features: ["Document Editing", "OneDrive Integration", "Teams Collaboration"],
    setupTime: "5 minutes"
  },
  {
    id: 3,
    name: "Mobile App",
    description: "Get notifications and access courses on your mobile device",
    icon: Smartphone,
    category: "Mobile",
    connected: true,
    features: ["Push Notifications", "Offline Reading", "Quick Access"],
    setupTime: "1 minute"
  },
  {
    id: 4,
    name: "Zoom Integration",
    description: "Join virtual classes directly from the platform",
    icon: Globe,
    category: "Communication",
    connected: false,
    features: ["One-click Join", "Recording Access", "Attendance Tracking"],
    setupTime: "3 minutes"
  }
];

const connectedApps = [
  {
    name: "Google Calendar",
    status: "Active",
    lastSync: "2024-01-15 10:30 AM",
    dataShared: "Class schedules, assignments"
  },
  {
    name: "EduQuest Mobile App",
    status: "Active",
    lastSync: "2024-01-15 11:45 AM",
    dataShared: "All platform data"
  }
];

const integrationCategories = [
  { name: "All", count: availableIntegrations.length },
  { name: "Productivity", count: availableIntegrations.filter(i => i.category === "Productivity").length },
  { name: "Documents", count: availableIntegrations.filter(i => i.category === "Documents").length },
  { name: "Mobile", count: availableIntegrations.filter(i => i.category === "Mobile").length },
  { name: "Communication", count: availableIntegrations.filter(i => i.category === "Communication").length }
];

export function StudentIntegrationsPage({ user }: StudentIntegrationsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [integrations, setIntegrations] = useState(availableIntegrations);

  const toggleIntegration = (id: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const filteredIntegrations = selectedCategory === "All" 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Integrations</h1>
            <p className="text-dark-secondary mt-2">Connect your favorite apps and services</p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
            <Puzzle className="w-4 h-4 mr-2" />
            {connectedCount} Connected
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Available Integrations</p>
                  <p className="text-3xl font-bold text-dark-primary">{integrations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Puzzle className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Connected Apps</p>
                  <p className="text-3xl font-bold text-dark-primary">{connectedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Categories</p>
                  <p className="text-3xl font-bold text-dark-primary">{integrationCategories.length - 1}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="bg-dark-card border-dark-color">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {integrationCategories.map((category) => (
                <Button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`${
                    selectedCategory === category.name
                      ? 'dark-button-primary'
                      : 'dark-button-secondary'
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Integrations */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Available Integrations</CardTitle>
            <CardDescription className="text-dark-secondary">
              Connect apps to enhance your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {filteredIntegrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div key={integration.id} className="flex items-start space-x-4 p-6 bg-dark-hover rounded-lg">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-dark-primary flex items-center space-x-2">
                            <span>{integration.name}</span>
                            {integration.connected && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </h3>
                          <p className="text-sm text-dark-secondary mt-1">{integration.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {integration.category}
                          </Badge>
                          <Switch
                            checked={integration.connected}
                            onCheckedChange={() => toggleIntegration(integration.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-dark-primary mb-2">Features:</p>
                          <div className="flex flex-wrap gap-2">
                            {integration.features.map((feature, index) => (
                              <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-dark-secondary">
                            Setup time: {integration.setupTime}
                          </span>
                          {!integration.connected ? (
                            <Button 
                              onClick={() => toggleIntegration(integration.id)}
                              className="dark-button-primary"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Connect
                            </Button>
                          ) : (
                            <Button className="dark-button-secondary">
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Connected Apps Management */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Connected Apps</CardTitle>
            <CardDescription className="text-dark-secondary">
              Manage your connected applications and data sharing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedApps.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-primary">{app.name}</p>
                      <p className="text-sm text-dark-secondary">Last sync: {app.lastSync}</p>
                      <p className="text-xs text-dark-secondary">Data shared: {app.dataShared}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {app.status}
                    </Badge>
                    <Button size="sm" className="dark-button-secondary">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration Tips */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-dark-primary">Integration Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-dark-primary">Productivity Boost</h4>
                  <p className="text-sm text-dark-secondary">
                    Connect Google Calendar to automatically sync your class schedules and never miss an assignment deadline.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-dark-primary">Stay Connected</h4>
                  <p className="text-sm text-dark-secondary">
                    Install the mobile app to receive instant notifications about grades, announcements, and updates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}