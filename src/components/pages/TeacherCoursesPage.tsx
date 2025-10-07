import { BookOpen, Users, Calendar, FileText, Settings, Plus, Clock, Award, TrendingUp, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

interface TeacherCoursesPageProps {
  user: any;
}

// Department-specific course data
const getDepartmentCourses = (department: string) => {
  const allCourses = {
    "Computer Science": [
      {
        id: 1,
        name: "Data Structures & Algorithms",
        code: "CS301",
        semester: "6th Semester",
        students: 25,
        credits: 4,
        schedule: ["Mon 10:00-11:30", "Wed 10:00-11:30", "Fri 2:00-3:30"],
        room: "Lab 204",
        avgAttendance: 92,
        avgPerformance: 87,
        assignments: 8,
        completedLectures: 24,
        totalLectures: 30,
        status: "Active"
      },
      {
        id: 2,
        name: "Database Management Systems",
        code: "CS401",
        semester: "8th Semester", 
        students: 22,
        credits: 4,
        schedule: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
        room: "Room 301",
        avgAttendance: 89,
        avgPerformance: 92,
        assignments: 6,
        completedLectures: 22,
        totalLectures: 28,
        status: "Active"
      },
      {
        id: 3,
        name: "Software Engineering",
        code: "CS303",
        semester: "6th Semester",
        students: 20,
        credits: 3,
        schedule: ["Mon 2:00-3:30", "Wed 11:00-12:30"],
        room: "Room 205",
        avgAttendance: 85,
        avgPerformance: 78,
        assignments: 5,
        completedLectures: 18,
        totalLectures: 24,
        status: "Active"
      }
    ],
    "Electronics": [
      {
        id: 4,
        name: "Digital Signal Processing",
        code: "EC301",
        semester: "6th Semester",
        students: 18,
        credits: 4,
        schedule: ["Mon 9:00-10:30", "Wed 9:00-10:30", "Fri 11:00-12:30"],
        room: "Lab 301",
        avgAttendance: 90,
        avgPerformance: 85,
        assignments: 7,
        completedLectures: 20,
        totalLectures: 26,
        status: "Active"
      },
      {
        id: 5,
        name: "VLSI Design",
        code: "EC401",
        semester: "8th Semester",
        students: 16,
        credits: 4,
        schedule: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
        room: "Lab 302",
        avgAttendance: 87,
        avgPerformance: 89,
        assignments: 6,
        completedLectures: 18,
        totalLectures: 24,
        status: "Active"
      },
      {
        id: 6,
        name: "Communication Systems",
        code: "EC302",
        semester: "6th Semester",
        students: 20,
        credits: 3,
        schedule: ["Mon 3:00-4:30", "Wed 3:00-4:30"],
        room: "Room 401",
        avgAttendance: 88,
        avgPerformance: 82,
        assignments: 5,
        completedLectures: 16,
        totalLectures: 22,
        status: "Active"
      }
    ],
    "Mechanical": [
      {
        id: 7,
        name: "Thermodynamics",
        code: "ME301",
        semester: "6th Semester",
        students: 24,
        credits: 4,
        schedule: ["Mon 10:00-11:30", "Wed 10:00-11:30", "Fri 1:00-2:30"],
        room: "Room 501",
        avgAttendance: 91,
        avgPerformance: 84,
        assignments: 7,
        completedLectures: 22,
        totalLectures: 28,
        status: "Active"
      },
      {
        id: 8,
        name: "Fluid Mechanics",
        code: "ME401",
        semester: "8th Semester",
        students: 22,
        credits: 4,
        schedule: ["Tue 1:00-2:30", "Thu 1:00-2:30"],
        room: "Lab 504",
        avgAttendance: 86,
        avgPerformance: 87,
        assignments: 6,
        completedLectures: 19,
        totalLectures: 25,
        status: "Active"
      },
      {
        id: 9,
        name: "Machine Design",
        code: "ME302",
        semester: "6th Semester",
        students: 18,
        credits: 3,
        schedule: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
        room: "Room 502",
        avgAttendance: 89,
        avgPerformance: 81,
        assignments: 5,
        completedLectures: 17,
        totalLectures: 23,
        status: "Active"
      }
    ],
    "Information Technology": [
      {
        id: 10,
        name: "Web Development",
        code: "IT301",
        semester: "6th Semester",
        students: 20,
        credits: 4,
        schedule: ["Mon 9:30-11:00", "Wed 9:30-11:00", "Fri 2:00-3:30"],
        room: "Lab 601",
        avgAttendance: 93,
        avgPerformance: 90,
        assignments: 8,
        completedLectures: 25,
        totalLectures: 30,
        status: "Active"
      },
      {
        id: 11,
        name: "Database Systems",
        code: "IT401",
        semester: "8th Semester",
        students: 18,
        credits: 4,
        schedule: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
        room: "Lab 602",
        avgAttendance: 88,
        avgPerformance: 86,
        assignments: 6,
        completedLectures: 21,
        totalLectures: 27,
        status: "Active"
      },
      {
        id: 12,
        name: "Cybersecurity",
        code: "IT302",
        semester: "6th Semester",
        students: 16,
        credits: 3,
        schedule: ["Mon 4:00-5:30", "Wed 4:00-5:30"],
        room: "Room 603",
        avgAttendance: 85,
        avgPerformance: 83,
        assignments: 5,
        completedLectures: 16,
        totalLectures: 22,
        status: "Active"
      }
    ],
    "Civil": [
      {
        id: 13,
        name: "Structural Engineering",
        code: "CE301",
        semester: "6th Semester",
        students: 22,
        credits: 4,
        schedule: ["Mon 8:00-9:30", "Wed 8:00-9:30", "Fri 10:00-11:30"],
        room: "Room 701",
        avgAttendance: 90,
        avgPerformance: 85,
        assignments: 7,
        completedLectures: 23,
        totalLectures: 29,
        status: "Active"
      },
      {
        id: 14,
        name: "Environmental Engineering",
        code: "CE401",
        semester: "8th Semester",
        students: 20,
        credits: 4,
        schedule: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
        room: "Lab 702",
        avgAttendance: 87,
        avgPerformance: 88,
        assignments: 6,
        completedLectures: 20,
        totalLectures: 26,
        status: "Active"
      },
      {
        id: 15,
        name: "Construction Management",
        code: "CE302",
        semester: "6th Semester",
        students: 18,
        credits: 3,
        schedule: ["Mon 2:30-4:00", "Wed 2:30-4:00"],
        room: "Room 703",
        avgAttendance: 89,
        avgPerformance: 82,
        assignments: 5,
        completedLectures: 18,
        totalLectures: 24,
        status: "Active"
      }
    ]
  };

  return allCourses[department] || [];
};

// Get department-specific upcoming classes
const getDepartmentUpcomingClasses = (department: string) => {
  const allUpcomingClasses = {
    "Computer Science": [
      { course: "Data Structures & Algorithms", time: "Today, 10:00 AM", room: "Lab 204", topic: "Binary Search Trees" },
      { course: "Database Management Systems", time: "Today, 2:00 PM", room: "Room 301", topic: "Query Optimization" },
      { course: "Software Engineering", time: "Tomorrow, 2:00 PM", room: "Room 205", topic: "Design Patterns" }
    ],
    "Electronics": [
      { course: "Digital Signal Processing", time: "Today, 9:00 AM", room: "Lab 301", topic: "FFT Algorithms" },
      { course: "VLSI Design", time: "Today, 11:00 AM", room: "Lab 302", topic: "Layout Verification" },
      { course: "Communication Systems", time: "Tomorrow, 3:00 PM", room: "Room 401", topic: "Modulation Techniques" }
    ],
    "Mechanical": [
      { course: "Thermodynamics", time: "Today, 10:00 AM", room: "Room 501", topic: "Heat Engines" },
      { course: "Fluid Mechanics", time: "Today, 1:00 PM", room: "Lab 504", topic: "Boundary Layer Theory" },
      { course: "Machine Design", time: "Tomorrow, 3:30 PM", room: "Room 502", topic: "Gear Design" }
    ],
    "Information Technology": [
      { course: "Web Development", time: "Today, 9:30 AM", room: "Lab 601", topic: "React Components" },
      { course: "Database Systems", time: "Today, 2:00 PM", room: "Lab 602", topic: "Index Optimization" },
      { course: "Cybersecurity", time: "Tomorrow, 4:00 PM", room: "Room 603", topic: "Network Security" }
    ],
    "Civil": [
      { course: "Structural Engineering", time: "Today, 8:00 AM", room: "Room 701", topic: "Steel Design" },
      { course: "Environmental Engineering", time: "Today, 11:00 AM", room: "Lab 702", topic: "Water Treatment" },
      { course: "Construction Management", time: "Tomorrow, 2:30 PM", room: "Room 703", topic: "Project Planning" }
    ]
  };

  return allUpcomingClasses[department] || [];
};

export function TeacherCoursesPage({ user }: TeacherCoursesPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showManageCourse, setShowManageCourse] = useState(false);

  const teachingCourses = getDepartmentCourses(user.department);
  const upcomingClasses = getDepartmentUpcomingClasses(user.department);

  const totalStudents = teachingCourses.reduce((sum, course) => sum + course.students, 0);
  const avgAttendance = teachingCourses.length > 0 ? Math.round(teachingCourses.reduce((sum, course) => sum + course.avgAttendance, 0) / teachingCourses.length) : 0;
  const avgPerformance = teachingCourses.length > 0 ? Math.round(teachingCourses.reduce((sum, course) => sum + course.avgPerformance, 0) / teachingCourses.length) : 0;
  const totalCredits = teachingCourses.reduce((sum, course) => sum + course.credits, 0);

  const recentActivities = [
    { action: `Updated course material for ${teachingCourses[0]?.name || 'course'}`, time: "2 hours ago", type: "content" },
    { action: `Graded assignments for ${teachingCourses[1]?.name || 'course'}`, time: "5 hours ago", type: "grading" },
    { action: `Posted announcement in ${teachingCourses[2]?.name || 'course'}`, time: "1 day ago", type: "announcement" },
    { action: `Scheduled exam for ${teachingCourses[0]?.name || 'course'}`, time: "2 days ago", type: "exam" }
  ];

  const handleManageCourse = (course: any) => {
    setSelectedCourse(course);
    setShowManageCourse(true);
  };

  const handleCourseSettings = (course: any) => {
    setSelectedCourse(course);
    setShowSettings(true);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Registered Courses</h1>
            <p className="text-dark-secondary mt-2">Manage your {user.department} department courses</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              {teachingCourses.length} Active Courses
            </Badge>
            <Button className="dark-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Total Students</p>
                  <p className="text-3xl font-bold text-dark-primary">{totalStudents}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Avg Attendance</p>
                  <p className="text-3xl font-bold text-dark-primary">{avgAttendance}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Avg Performance</p>
                  <p className="text-3xl font-bold text-dark-primary">{avgPerformance}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Teaching Credits</p>
                  <p className="text-3xl font-bold text-dark-primary">{totalCredits}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teachingCourses.map((course) => (
            <Card key={course.id} className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-dark-primary">{course.name}</CardTitle>
                    <CardDescription className="text-dark-secondary mt-1">
                      {course.code} • {course.semester} • {course.credits} Credits
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Course Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-secondary">Course Progress</span>
                    <span className="text-sm text-dark-primary">
                      {course.completedLectures}/{course.totalLectures} lectures
                    </span>
                  </div>
                  <Progress value={(course.completedLectures / course.totalLectures) * 100} className="h-2" />
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-dark-hover rounded-lg">
                    <p className="text-xl font-bold text-dark-primary">{course.students}</p>
                    <p className="text-xs text-dark-secondary">Students</p>
                  </div>
                  <div className="p-3 bg-dark-hover rounded-lg">
                    <p className="text-xl font-bold text-dark-primary">{course.avgAttendance}%</p>
                    <p className="text-xs text-dark-secondary">Attendance</p>
                  </div>
                  <div className="p-3 bg-dark-hover rounded-lg">
                    <p className="text-xl font-bold text-dark-primary">{course.avgPerformance}%</p>
                    <p className="text-xs text-dark-secondary">Performance</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-dark-primary">Schedule</p>
                  <div className="flex flex-wrap gap-2">
                    {course.schedule.map((time, index) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-dark-secondary">Room: {course.room}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-4 border-t border-dark-color">
                  <Button 
                    className="flex-1 dark-button-primary"
                    onClick={() => handleManageCourse(course)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Course
                  </Button>
                  <Button 
                    className="dark-button-secondary"
                    onClick={() => handleCourseSettings(course)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Upcoming Classes
              </CardTitle>
              <CardDescription className="text-dark-secondary">Your next scheduled classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-primary">{cls.course}</p>
                        <p className="text-sm text-dark-secondary">{cls.time} • {cls.room}</p>
                        <p className="text-xs text-blue-400">Topic: {cls.topic}</p>
                      </div>
                    </div>
                    <Button size="sm" className="dark-button-secondary">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Recent Activities</CardTitle>
              <CardDescription className="text-dark-secondary">Your latest course-related actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-dark-hover rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'grading' ? 'bg-green-500/20' :
                      activity.type === 'content' ? 'bg-blue-500/20' :
                      activity.type === 'announcement' ? 'bg-purple-500/20' :
                      'bg-orange-500/20'
                    }`}>
                      <FileText className={`w-4 h-4 ${
                        activity.type === 'grading' ? 'text-green-400' :
                        activity.type === 'content' ? 'text-blue-400' :
                        activity.type === 'announcement' ? 'text-purple-400' :
                        'text-orange-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-dark-primary">{activity.action}</p>
                      <p className="text-sm text-dark-secondary">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-dark-primary">Quick Actions</h3>
              <p className="text-dark-secondary">
                Frequently used course management tools for {user.department} department
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button className="dark-button-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
                <Button className="dark-button-secondary">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Exam
                </Button>
                <Button className="dark-button-secondary">
                  <Users className="w-4 h-4 mr-2" />
                  View Students
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Manage Course Dialog */}
      <Dialog open={showManageCourse} onOpenChange={setShowManageCourse}>
        <DialogContent className="max-w-4xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary text-2xl">
              Manage Course: {selectedCourse?.name}
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive course management and content organization
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-dark-hover border border-dark-color">
              <TabsTrigger value="overview" className="data-[state=active]:bg-dark-card">Overview</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-dark-card">Content</TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-dark-card">Assignments</TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-dark-card">Students</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-dark-card">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-primary mb-2">Course Information</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-dark-secondary">Code: <span className="text-dark-primary">{selectedCourse?.code}</span></p>
                      <p className="text-dark-secondary">Credits: <span className="text-dark-primary">{selectedCourse?.credits}</span></p>
                      <p className="text-dark-secondary">Room: <span className="text-dark-primary">{selectedCourse?.room}</span></p>
                      <p className="text-dark-secondary">Students: <span className="text-dark-primary">{selectedCourse?.students}</span></p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-primary mb-2">Performance Metrics</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-dark-secondary">Attendance: <span className="text-green-400">{selectedCourse?.avgAttendance}%</span></p>
                      <p className="text-dark-secondary">Performance: <span className="text-blue-400">{selectedCourse?.avgPerformance}%</span></p>
                      <p className="text-dark-secondary">Assignments: <span className="text-dark-primary">{selectedCourse?.assignments}</span></p>
                      <p className="text-dark-secondary">Progress: <span className="text-purple-400">{selectedCourse?.completedLectures}/{selectedCourse?.totalLectures}</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark-primary">Course Materials</h3>
                  <Button className="dark-button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Material
                  </Button>
                </div>
                <div className="grid gap-3">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="bg-dark-hover border-dark-color p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-primary">Lecture {item}: Introduction to Topic</p>
                          <p className="text-sm text-dark-secondary">Added 2 days ago</p>
                        </div>
                        <Button size="sm" className="dark-button-secondary">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark-primary">Assignments & Exams</h3>
                  <Button className="dark-button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
                <div className="grid gap-3">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="bg-dark-hover border-dark-color p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-primary">Assignment {item}</p>
                          <p className="text-sm text-dark-secondary">Due: Next week • {Math.floor(Math.random() * 30) + 10} submissions</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Active
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-dark-primary">Enrolled Students</h3>
                <div className="grid gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="bg-dark-hover border-dark-color p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-primary">Student Name {item}</p>
                          <p className="text-sm text-dark-secondary">Roll: CS202100{item} • CGPA: {(8.0 + Math.random()).toFixed(1)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {85 + Math.floor(Math.random() * 15)}%
                          </Badge>
                          <Button size="sm" className="dark-button-secondary">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-primary mb-2">Attendance Trends</h3>
                    <div className="h-32 bg-dark-bg rounded flex items-center justify-center">
                      <p className="text-dark-secondary">Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-primary mb-2">Grade Distribution</h3>
                    <div className="h-32 bg-dark-bg rounded flex items-center justify-center">
                      <p className="text-dark-secondary">Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Course Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">
              Course Settings: {selectedCourse?.name}
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Configure course preferences and settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courseName" className="text-dark-primary">Course Name</Label>
                <Input
                  id="courseName"
                  defaultValue={selectedCourse?.name}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              <div>
                <Label htmlFor="courseCode" className="text-dark-primary">Course Code</Label>
                <Input
                  id="courseCode"
                  defaultValue={selectedCourse?.code}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="credits" className="text-dark-primary">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  defaultValue={selectedCourse?.credits}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              <div>
                <Label htmlFor="room" className="text-dark-primary">Room</Label>
                <Input
                  id="room"
                  defaultValue={selectedCourse?.room}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              <div>
                <Label htmlFor="semester" className="text-dark-primary">Semester</Label>
                <Select defaultValue={selectedCourse?.semester}>
                  <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-color">
                    <SelectItem value="6th Semester">6th Semester</SelectItem>
                    <SelectItem value="7th Semester">7th Semester</SelectItem>
                    <SelectItem value="8th Semester">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-dark-primary">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description..."
                className="bg-dark-bg border-dark-color text-dark-primary"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-dark-color">
              <Button className="dark-button-primary flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
              <Button 
                className="dark-button-secondary"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}