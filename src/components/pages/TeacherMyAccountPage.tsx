import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Bell, Download, Eye, EyeOff, Award, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TeacherMyAccountPageProps {
  user: any;
}

const notificationSettings = [
  { id: "assignments", label: "Assignment Submissions", description: "Get notified when students submit assignments", enabled: true },
  { id: "attendance", label: "Attendance Alerts", description: "Receive notifications about student attendance", enabled: true },
  { id: "announcements", label: "Administrative Announcements", description: "Important updates from administration", enabled: true },
  { id: "schedule", label: "Schedule Changes", description: "Notifications about class schedule modifications", enabled: false },
  { id: "events", label: "Campus Events", description: "Information about college events and activities", enabled: false }
];

const privacySettings = [
  { id: "profile", label: "Profile Visibility", description: "Allow students to see your profile details", enabled: true },
  { id: "status", label: "Online Status", description: "Show when you're available to students", enabled: false },
  { id: "contact", label: "Contact Information", description: "Allow students to see your contact details", enabled: true }
];

// Department-specific teaching history function
function getDepartmentTeachingHistory(user: any) {
  const departmentHistory = {
    "Computer Science": [
      { subject: "Advanced Data Structures", semester: "Spring 2024", students: 32, avgGrade: "A-", type: "Core" },
      { subject: "Algorithm Design & Analysis", semester: "Fall 2023", students: 28, avgGrade: "B+", type: "Core" },
      { subject: "Database Management Systems", semester: "Spring 2023", students: 35, avgGrade: "A", type: "Core" },
      { subject: "Software Engineering Principles", semester: "Fall 2022", students: 30, avgGrade: "A-", type: "Elective" }
    ],
    "Electronics": [
      { subject: "Digital Signal Processing", semester: "Spring 2024", students: 24, avgGrade: "A-", type: "Core" },
      { subject: "VLSI Circuit Design", semester: "Fall 2023", students: 20, avgGrade: "B+", type: "Core" },
      { subject: "Advanced Communication Systems", semester: "Spring 2023", students: 22, avgGrade: "A", type: "Core" },
      { subject: "Microprocessor Applications", semester: "Fall 2022", students: 26, avgGrade: "B+", type: "Elective" }
    ],
    "Mechanical": [
      { subject: "Advanced Thermodynamics", semester: "Spring 2024", students: 28, avgGrade: "B+", type: "Core" },
      { subject: "Computational Fluid Dynamics", semester: "Fall 2023", students: 24, avgGrade: "A-", type: "Core" },
      { subject: "Advanced Machine Design", semester: "Spring 2023", students: 26, avgGrade: "A", type: "Core" },
      { subject: "Manufacturing Automation", semester: "Fall 2022", students: 22, avgGrade: "B+", type: "Elective" }
    ],
    "Information Technology": [
      { subject: "Advanced Web Technologies", semester: "Spring 2024", students: 30, avgGrade: "A", type: "Core" },
      { subject: "Cybersecurity & Cryptography", semester: "Fall 2023", students: 25, avgGrade: "A-", type: "Core" },
      { subject: "Cloud Computing Architecture", semester: "Spring 2023", students: 28, avgGrade: "A-", type: "Core" },
      { subject: "Network Security", semester: "Fall 2022", students: 24, avgGrade: "B+", type: "Elective" }
    ],
    "Civil": [
      { subject: "Advanced Structural Analysis", semester: "Spring 2024", students: 26, avgGrade: "A-", type: "Core" },
      { subject: "Environmental Engineering Design", semester: "Fall 2023", students: 22, avgGrade: "A", type: "Core" },
      { subject: "Geotechnical Engineering", semester: "Spring 2023", students: 24, avgGrade: "B+", type: "Core" },
      { subject: "Project Management in Construction", semester: "Fall 2022", students: 20, avgGrade: "A-", type: "Elective" }
    ]
  };
  
  return departmentHistory[user.department] || [];
}

// Personal account activity (different from dashboard activities)
function getPersonalAccountActivity(user: any) {
  const accountActivities = [
    { action: "Profile information updated", timestamp: "2024-01-15 09:45 AM", type: "profile", icon: "User" },
    { action: "Password changed successfully", timestamp: "2024-01-10 03:20 PM", type: "security", icon: "Shield" },
    { action: "Notification preferences modified", timestamp: "2024-01-08 11:15 AM", type: "settings", icon: "Bell" },
    { action: "Office hours schedule updated", timestamp: "2024-01-05 02:30 PM", type: "profile", icon: "Calendar" },
    { action: "Contact information verified", timestamp: "2024-01-03 10:00 AM", type: "profile", icon: "Mail" },
    { action: "Privacy settings adjusted", timestamp: "2023-12-28 04:45 PM", type: "privacy", icon: "Eye" },
    { action: "Account security scan completed", timestamp: "2023-12-25 01:15 PM", type: "security", icon: "Shield" }
  ];
  
  return accountActivities;
}

export function TeacherMyAccountPage({ user }: TeacherMyAccountPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [privacy, setPrivacy] = useState(privacySettings);
  
  // Get personalized data
  const teachingHistory = getDepartmentTeachingHistory(user);
  const accountActivity = getPersonalAccountActivity(user);
  
  // Department-specific contact information
  const departmentContacts = {
    "Computer Science": {
      phone: "+91 98765 11001",
      address: "CS Faculty Block, Room 201",
      officeHours: "Mon-Wed-Fri, 10:00 AM - 12:00 PM"
    },
    "Electronics": {
      phone: "+91 98765 22002", 
      address: "ECE Faculty Block, Room 305",
      officeHours: "Tue-Thu-Sat, 2:00 PM - 4:00 PM"
    },
    "Mechanical": {
      phone: "+91 98765 33003",
      address: "ME Faculty Block, Room 102", 
      officeHours: "Mon-Thu, 1:00 PM - 3:00 PM"
    },
    "Information Technology": {
      phone: "+91 98765 44004",
      address: "IT Faculty Block, Room 401",
      officeHours: "Tue-Fri, 11:00 AM - 1:00 PM"
    },
    "Civil": {
      phone: "+91 98765 55005",
      address: "Civil Faculty Block, Room 203",
      officeHours: "Mon-Wed-Fri, 3:00 PM - 5:00 PM"
    }
  };
  
  const deptContact = departmentContacts[user.department] || departmentContacts["Computer Science"];
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: deptContact.phone,
    address: deptContact.address,
    officeHours: deptContact.officeHours,
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
            <p className="text-dark-secondary mt-2">Manage your profile and teaching preferences</p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
            <User className="w-4 h-4 mr-2" />
            Faculty Member
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
            <TabsTrigger value="teaching" className="data-[state=active]:bg-dark-hover">
              Teaching Profile
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
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
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
                        <Label htmlFor="teacherId" className="text-dark-primary">Teacher ID</Label>
                        <Input
                          id="teacherId"
                          value={user.id}
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
                        <Label htmlFor="designation" className="text-dark-primary">Designation</Label>
                        <Input
                          id="designation"
                          value={user.designation}
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
                    <Label htmlFor="address" className="text-dark-primary">Office Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="officeHours" className="text-dark-primary">Office Hours</Label>
                    <Input
                      id="officeHours"
                      value={formData.officeHours}
                      onChange={(e) => handleInputChange('officeHours', e.target.value)}
                      disabled={!isEditing}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-dark-primary">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-dark-hover rounded-lg">
                      <p className="text-sm text-dark-secondary">Experience</p>
                      <p className="text-2xl font-bold text-dark-primary">{user.experience} years</p>
                    </div>
                    <div className="p-4 bg-dark-hover rounded-lg">
                      <p className="text-sm text-dark-secondary">Specialization</p>
                      <p className="text-lg font-bold text-dark-primary">{user.specialization}</p>
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

          {/* Teaching Profile */}
          <TabsContent value="teaching" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Teaching History
                </CardTitle>
                <CardDescription className="text-dark-secondary">
                  Your past and current teaching assignments in {user.department}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teachingHistory.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          course.type === 'Core' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                        }`}>
                          <BookOpen className={`w-5 h-5 ${
                            course.type === 'Core' ? 'text-blue-400' : 'text-purple-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-dark-primary">{course.subject}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-dark-secondary">{course.semester}</p>
                            <Badge className={`text-xs ${
                              course.type === 'Core' 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            }`}>
                              {course.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm text-dark-secondary">Students</p>
                            <p className="font-semibold text-dark-primary">{course.students}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-dark-secondary">Performance</p>
                            <Badge className={`${
                              course.avgGrade.startsWith('A') 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            }`}>
                              {course.avgGrade}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Teaching Performance Summary */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-dark-primary">{teachingHistory.length}</p>
                    <p className="text-sm text-dark-secondary">Courses Taught</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-dark-primary">
                      {teachingHistory.reduce((sum, course) => sum + course.students, 0)}
                    </p>
                    <p className="text-sm text-dark-secondary">Total Students</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-dark-primary">A-</p>
                    <p className="text-sm text-dark-secondary">Avg Performance</p>
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
                  Control what information students and colleagues can see
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
                <CardTitle className="text-dark-primary">Personal Account Activity</CardTitle>
                <CardDescription className="text-dark-secondary">
                  Your recent profile and account management activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountActivity.map((activity, index) => {
                    const getActivityIcon = (type: string) => {
                      switch(type) {
                        case 'profile': return User;
                        case 'security': return Shield;
                        case 'settings': return Bell;
                        case 'privacy': return Eye;
                        default: return User;
                      }
                    };
                    
                    const getActivityColor = (type: string) => {
                      switch(type) {
                        case 'profile': return 'bg-blue-500/20 text-blue-400';
                        case 'security': return 'bg-red-500/20 text-red-400';
                        case 'settings': return 'bg-yellow-500/20 text-yellow-400';
                        case 'privacy': return 'bg-green-500/20 text-green-400';
                        default: return 'bg-purple-500/20 text-purple-400';
                      }
                    };
                    
                    const getBadgeColor = (type: string) => {
                      switch(type) {
                        case 'profile': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
                        case 'security': return 'bg-red-500/20 text-red-400 border-red-500/30';
                        case 'settings': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
                        case 'privacy': return 'bg-green-500/20 text-green-400 border-green-500/30';
                        default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
                      }
                    };
                    
                    const IconComponent = getActivityIcon(activity.type);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-dark-primary">{activity.action}</p>
                            <p className="text-sm text-dark-secondary">{activity.timestamp}</p>
                          </div>
                        </div>
                        <Badge className={getBadgeColor(activity.type)}>
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Personal Data Export</CardTitle>
                <CardDescription className="text-dark-secondary">
                  Download your personal profile and account data
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
                    Download Account History
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