import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Bell, Download, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface StudentMyAccountPageProps {
  user: any;
}

const notificationSettings = [
  { id: "assignments", label: "Assignment Reminders", description: "Get notified about upcoming assignments", enabled: true },
  { id: "grades", label: "Grade Updates", description: "Receive notifications when grades are posted", enabled: true },
  { id: "announcements", label: "Class Announcements", description: "Important updates from your instructors", enabled: true },
  { id: "schedule", label: "Schedule Changes", description: "Notifications about class schedule modifications", enabled: false },
  { id: "events", label: "Campus Events", description: "Information about college events and activities", enabled: false }
];

const privacySettings = [
  { id: "profile", label: "Profile Visibility", description: "Allow other students to see your profile", enabled: true },
  { id: "activity", label: "Activity Status", description: "Show when you're online to classmates", enabled: false },
  { id: "progress", label: "Progress Sharing", description: "Allow sharing of academic progress", enabled: true }
];

const recentActivity = [
  { action: "Logged in from Mobile App", timestamp: "2024-01-15 08:30 AM", location: "Mobile Device" },
  { action: "Downloaded course material", timestamp: "2024-01-14 03:45 PM", location: "Web Browser" },
  { action: "Submitted assignment", timestamp: "2024-01-14 11:20 AM", location: "Web Browser" },
  { action: "Updated profile information", timestamp: "2024-01-13 02:15 PM", location: "Web Browser" }
];

export function StudentMyAccountPage({ user }: StudentMyAccountPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [privacy, setPrivacy] = useState(privacySettings);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 98765 43210",
    address: "123 Student Hostel, Campus Area",
    emergencyContact: "+91 98765 43211",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const togglePrivacy = (id: string) => {
    setPrivacy(privacy.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">My Account</h1>
            <p className="text-dark-secondary mt-2">Manage your profile and account settings</p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
            <User className="w-4 h-4 mr-2" />
            Active Student
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-dark-card border border-dark-color">
            <TabsTrigger value="profile" className="data-[state=active]:bg-dark-hover">
              Profile Information
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-dark-hover">
              Security & Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-dark-hover">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-dark-hover">
              Account Activity
            </TabsTrigger>
          </TabsList>

          {/* Profile Information */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-dark-primary">Personal Information</CardTitle>
                    <CardDescription className="text-dark-secondary">
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="dark-button-primary"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture and Basic Info */}
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-dark-primary">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="bg-dark-bg border-dark-color text-dark-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rollNo" className="text-dark-primary">Roll Number</Label>
                        <Input
                          id="rollNo"
                          value={user.rollNo}
                          disabled
                          className="bg-dark-bg border-dark-color text-dark-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department" className="text-dark-primary">Department</Label>
                        <Input
                          id="department"
                          value={user.department}
                          disabled
                          className="bg-dark-bg border-dark-color text-dark-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="semester" className="text-dark-primary">Current Semester</Label>
                        <Input
                          id="semester"
                          value={user.semester}
                          disabled
                          className="bg-dark-bg border-dark-color text-dark-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-dark-primary">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-dark-primary">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="bg-dark-bg border-dark-color text-dark-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-dark-primary">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="bg-dark-bg border-dark-color text-dark-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-dark-primary">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency" className="text-dark-primary">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      disabled={!isEditing}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-dark-primary">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-dark-hover rounded-lg">
                      <p className="text-sm text-dark-secondary">Current CGPA</p>
                      <p className="text-2xl font-bold text-dark-primary">{user.cgpa}</p>
                    </div>
                    <div className="p-4 bg-dark-hover rounded-lg">
                      <p className="text-sm text-dark-secondary">Semester</p>
                      <p className="text-2xl font-bold text-dark-primary">{user.semester}</p>
                    </div>
                    <div className="p-4 bg-dark-hover rounded-lg">
                      <p className="text-sm text-dark-secondary">Department</p>
                      <p className="text-lg font-bold text-dark-primary">{user.department}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security & Privacy */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Password & Security
                </CardTitle>
                <CardDescription className="text-dark-secondary">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-dark-primary">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="bg-dark-bg border-dark-color text-dark-primary pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-dark-secondary" />
                        ) : (
                          <Eye className="h-4 w-4 text-dark-secondary" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="text-dark-primary">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-dark-primary">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                </div>
                <Button className="dark-button-primary">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Privacy Settings</CardTitle>
                <CardDescription className="text-dark-secondary">
                  Control what information others can see
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {privacy.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-dark-primary">{setting.label}</p>
                      <p className="text-sm text-dark-secondary">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => togglePrivacy(setting.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-dark-secondary">
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-dark-primary">{setting.label}</p>
                      <p className="text-sm text-dark-secondary">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggleNotification(setting.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Activity */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Recent Activity</CardTitle>
                <CardDescription className="text-dark-secondary">
                  Your recent account activity and login history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-dark-primary">{activity.action}</p>
                          <p className="text-sm text-dark-secondary">{activity.timestamp}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {activity.location}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Data Export</CardTitle>
                <CardDescription className="text-dark-secondary">
                  Download your account data and academic records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="dark-button-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Profile Data
                  </Button>
                  <Button className="dark-button-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Academic Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}