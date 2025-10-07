import { TrendingUp, Users, Target, BookOpen, Calendar, Award, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface TeacherProgressPageProps {
  user: any;
}

// Department-specific data generation functions
function getDepartmentClassData(department: string) {
  const departmentData = {
    "Computer Science": [
      { class: "Data Structures & Algorithms", students: 25, avgProgress: 82, completed: 20, struggling: 3 },
      { class: "Database Management Systems", students: 22, avgProgress: 88, completed: 19, struggling: 1 },
      { class: "Computer Networks", students: 20, avgProgress: 75, completed: 15, struggling: 4 },
      { class: "Software Engineering", students: 24, avgProgress: 85, completed: 18, struggling: 2 }
    ],
    "Electronics": [
      { class: "Digital Signal Processing", students: 18, avgProgress: 79, completed: 14, struggling: 3 },
      { class: "VLSI Design", students: 16, avgProgress: 84, completed: 13, struggling: 2 },
      { class: "Communication Systems", students: 20, avgProgress: 77, completed: 15, struggling: 4 },
      { class: "Microprocessors", students: 19, avgProgress: 81, completed: 15, struggling: 2 }
    ],
    "Mechanical": [
      { class: "Thermodynamics", students: 24, avgProgress: 80, completed: 18, struggling: 4 },
      { class: "Fluid Mechanics", students: 22, avgProgress: 76, completed: 16, struggling: 5 },
      { class: "Machine Design", students: 18, avgProgress: 83, completed: 14, struggling: 2 },
      { class: "Manufacturing Processes", students: 20, avgProgress: 78, completed: 15, struggling: 3 }
    ],
    "Information Technology": [
      { class: "Web Development", students: 20, avgProgress: 86, completed: 17, struggling: 2 },
      { class: "Database Systems", students: 18, avgProgress: 84, completed: 15, struggling: 1 },
      { class: "Cybersecurity", students: 16, avgProgress: 79, completed: 12, struggling: 3 },
      { class: "Cloud Computing", students: 19, avgProgress: 82, completed: 15, struggling: 2 }
    ],
    "Civil": [
      { class: "Structural Engineering", students: 22, avgProgress: 81, completed: 17, struggling: 3 },
      { class: "Environmental Engineering", students: 20, avgProgress: 77, completed: 15, struggling: 4 },
      { class: "Geotechnical Engineering", students: 18, avgProgress: 75, completed: 13, struggling: 4 },
      { class: "Construction Management", students: 21, avgProgress: 83, completed: 16, struggling: 2 }
    ]
  };
  return departmentData[department] || [];
}

function getDepartmentWeeklyTrend(department: string) {
  const baseData = {
    "Computer Science": [
      { week: "Week 1", avgProgress: 70, assignments: 88, attendance: 94 },
      { week: "Week 2", avgProgress: 75, assignments: 91, attendance: 92 },
      { week: "Week 3", avgProgress: 80, assignments: 85, attendance: 93 },
      { week: "Week 4", avgProgress: 82, assignments: 93, attendance: 89 }
    ],
    "Electronics": [
      { week: "Week 1", avgProgress: 68, assignments: 85, attendance: 91 },
      { week: "Week 2", avgProgress: 72, assignments: 87, attendance: 89 },
      { week: "Week 3", avgProgress: 77, assignments: 83, attendance: 92 },
      { week: "Week 4", avgProgress: 79, assignments: 90, attendance: 87 }
    ],
    "Mechanical": [
      { week: "Week 1", avgProgress: 65, assignments: 82, attendance: 89 },
      { week: "Week 2", avgProgress: 69, assignments: 85, attendance: 87 },
      { week: "Week 3", avgProgress: 74, assignments: 79, attendance: 90 },
      { week: "Week 4", avgProgress: 78, assignments: 87, attendance: 85 }
    ],
    "Information Technology": [
      { week: "Week 1", avgProgress: 72, assignments: 90, attendance: 95 },
      { week: "Week 2", avgProgress: 77, assignments: 93, attendance: 93 },
      { week: "Week 3", avgProgress: 82, assignments: 87, attendance: 94 },
      { week: "Week 4", avgProgress: 86, assignments: 95, attendance: 91 }
    ],
    "Civil": [
      { week: "Week 1", avgProgress: 67, assignments: 84, attendance: 90 },
      { week: "Week 2", avgProgress: 71, assignments: 86, attendance: 88 },
      { week: "Week 3", avgProgress: 76, assignments: 81, attendance: 91 },
      { week: "Week 4", avgProgress: 81, assignments: 89, attendance: 86 }
    ]
  };
  return baseData[department] || [];
}

function getDepartmentPerformanceDistribution(department: string) {
  const distributions = {
    "Computer Science": [
      { name: "Excellent (90-100%)", value: 28, color: "#10B981" },
      { name: "Good (80-89%)", value: 38, color: "#3B82F6" },
      { name: "Average (70-79%)", value: 24, color: "#F59E0B" },
      { name: "Below Average (<70%)", value: 10, color: "#EF4444" }
    ],
    "Electronics": [
      { name: "Excellent (90-100%)", value: 22, color: "#10B981" },
      { name: "Good (80-89%)", value: 35, color: "#3B82F6" },
      { name: "Average (70-79%)", value: 30, color: "#F59E0B" },
      { name: "Below Average (<70%)", value: 13, color: "#EF4444" }
    ],
    "Mechanical": [
      { name: "Excellent (90-100%)", value: 20, color: "#10B981" },
      { name: "Good (80-89%)", value: 32, color: "#3B82F6" },
      { name: "Average (70-79%)", value: 33, color: "#F59E0B" },
      { name: "Below Average (<70%)", value: 15, color: "#EF4444" }
    ],
    "Information Technology": [
      { name: "Excellent (90-100%)", value: 30, color: "#10B981" },
      { name: "Good (80-89%)", value: 40, color: "#3B82F6" },
      { name: "Average (70-79%)", value: 22, color: "#F59E0B" },
      { name: "Below Average (<70%)", value: 8, color: "#EF4444" }
    ],
    "Civil": [
      { name: "Excellent (90-100%)", value: 18, color: "#10B981" },
      { name: "Good (80-89%)", value: 30, color: "#3B82F6" },
      { name: "Average (70-79%)", value: 35, color: "#F59E0B" },
      { name: "Below Average (<70%)", value: 17, color: "#EF4444" }
    ]
  };
  return distributions[department] || [];
}

function getDepartmentStrugglingStudents(department: string) {
  const strugglingData = {
    "Computer Science": [
      { name: "Rahul Singh", rollNo: "1000030021", subject: "Computer Networks", currentGrade: "C", issues: ["Low Attendance", "Missing Assignments"] },
      { name: "Sanjay Malhotra", rollNo: "1000030031", subject: "Data Structures", currentGrade: "D", issues: ["Struggling with Concepts", "Needs Extra Help"] }
    ],
    "Electronics": [
      { name: "Vikram Rao", rollNo: "1000030013", subject: "Digital Signal Processing", currentGrade: "C-", issues: ["Lab Performance", "Theory Gaps"] },
      { name: "Deepak Chatterjee", rollNo: "1000030027", subject: "VLSI Design", currentGrade: "D+", issues: ["Project Delays", "Technical Issues"] }
    ],
    "Mechanical": [
      { name: "Kiran Das", rollNo: "1000030009", subject: "Thermodynamics", currentGrade: "C", issues: ["Mathematical Foundation", "Problem Solving"] },
      { name: "Krishna Reddy", rollNo: "1000030039", subject: "Fluid Mechanics", currentGrade: "C-", issues: ["Late Submissions", "Quality Issues"] }
    ],
    "Information Technology": [
      { name: "Siddharth Menon", rollNo: "1000030015", subject: "Web Development", currentGrade: "C+", issues: ["Programming Skills", "Project Management"] },
      { name: "Prakash Naik", rollNo: "1000030035", subject: "Database Systems", currentGrade: "C", issues: ["SQL Concepts", "Design Principles"] }
    ],
    "Civil": [
      { name: "Arjun Verma", rollNo: "1000030005", subject: "Structural Engineering", currentGrade: "C", issues: ["Design Calculations", "Software Usage"] },
      { name: "Harsh Agarwal", rollNo: "1000030017", subject: "Construction Management", currentGrade: "C-", issues: ["Project Planning", "Cost Estimation"] }
    ]
  };
  return strugglingData[department] || [];
}

function getDepartmentTopPerformers(department: string) {
  const topPerformersData = {
    "Computer Science": [
      { name: "Ishita Ghosh", rollNo: "1000030016", avgScore: 96, streak: 8 },
      { name: "Sneha Patel", rollNo: "1000030004", avgScore: 94, streak: 7 },
      { name: "Ananya Singh", rollNo: "1000030012", avgScore: 93, streak: 6 },
      { name: "Lakshmi Narayan", rollNo: "1000030026", avgScore: 92, streak: 5 }
    ],
    "Electronics": [
      { name: "Priya Reddy", rollNo: "1000030002", avgScore: 95, streak: 9 },
      { name: "Ritika Jha", rollNo: "1000030022", avgScore: 92, streak: 6 },
      { name: "Divya Bansal", rollNo: "1000030018", avgScore: 90, streak: 5 },
      { name: "Simran Kaur", rollNo: "1000030032", avgScore: 89, streak: 4 }
    ],
    "Mechanical": [
      { name: "Pooja Mishra", rollNo: "1000030014", avgScore: 91, streak: 7 },
      { name: "Shreya Pillai", rollNo: "1000030024", avgScore: 89, streak: 5 },
      { name: "Anjali Deshmukh", rollNo: "1000030034", avgScore: 88, streak: 4 },
      { name: "Karthik R", rollNo: "1000030029", avgScore: 87, streak: 3 }
    ],
    "Information Technology": [
      { name: "Kavya Iyer", rollNo: "1000030006", avgScore: 97, streak: 10 },
      { name: "Tanvi Kulkarni", rollNo: "1000030020", avgScore: 94, streak: 8 },
      { name: "Bhavna Kaur", rollNo: "1000030030", avgScore: 92, streak: 6 },
      { name: "Monika Paul", rollNo: "1000030040", avgScore: 90, streak: 5 }
    ],
    "Civil": [
      { name: "Aishwarya Roy", rollNo: "1000030028", avgScore: 90, streak: 6 },
      { name: "Rahul Mehta", rollNo: "1000030011", avgScore: 88, streak: 4 },
      { name: "Jyoti Dubey", rollNo: "1000030038", avgScore: 87, streak: 3 },
      { name: "Abhinav Saxena", rollNo: "1000030023", avgScore: 85, streak: 2 }
    ]
  };
  return topPerformersData[department] || [];
}

function getDepartmentCourseModules(department: string) {
  const modulesData = {
    "Computer Science": [
      { 
        course: "Data Structures & Algorithms", 
        modules: [
          { name: "Arrays & Linked Lists", completion: 95, students: 23 },
          { name: "Stacks & Queues", completion: 88, students: 20 },
          { name: "Trees & Graphs", completion: 72, students: 16 },
          { name: "Dynamic Programming", completion: 45, students: 10 }
        ]
      },
      { 
        course: "Database Management Systems", 
        modules: [
          { name: "SQL Fundamentals", completion: 100, students: 22 },
          { name: "Database Design", completion: 85, students: 19 },
          { name: "Normalization", completion: 78, students: 17 },
          { name: "Advanced Queries", completion: 60, students: 13 }
        ]
      }
    ],
    "Electronics": [
      { 
        course: "Digital Signal Processing", 
        modules: [
          { name: "Signal Analysis", completion: 92, students: 16 },
          { name: "Filter Design", completion: 84, students: 15 },
          { name: "FFT & Transforms", completion: 68, students: 12 },
          { name: "Digital Filters", completion: 52, students: 9 }
        ]
      },
      { 
        course: "VLSI Design", 
        modules: [
          { name: "Logic Design", completion: 88, students: 14 },
          { name: "Layout Design", completion: 75, students: 12 },
          { name: "Verification", completion: 62, students: 10 },
          { name: "Physical Design", completion: 48, students: 8 }
        ]
      }
    ],
    "Mechanical": [
      { 
        course: "Thermodynamics", 
        modules: [
          { name: "Basic Laws", completion: 94, students: 22 },
          { name: "Heat Engines", completion: 81, students: 19 },
          { name: "Refrigeration", completion: 70, students: 16 },
          { name: "Gas Turbines", completion: 55, students: 13 }
        ]
      },
      { 
        course: "Fluid Mechanics", 
        modules: [
          { name: "Fluid Properties", completion: 90, students: 20 },
          { name: "Flow Analysis", completion: 76, students: 17 },
          { name: "Pipe Flow", completion: 65, students: 14 },
          { name: "Turbulent Flow", completion: 42, students: 9 }
        ]
      }
    ],
    "Information Technology": [
      { 
        course: "Web Development", 
        modules: [
          { name: "HTML/CSS", completion: 100, students: 20 },
          { name: "JavaScript", completion: 90, students: 18 },
          { name: "React Framework", completion: 75, students: 15 },
          { name: "Backend APIs", completion: 60, students: 12 }
        ]
      },
      { 
        course: "Cybersecurity", 
        modules: [
          { name: "Security Fundamentals", completion: 95, students: 15 },
          { name: "Network Security", completion: 82, students: 13 },
          { name: "Cryptography", completion: 68, students: 11 },
          { name: "Ethical Hacking", completion: 50, students: 8 }
        ]
      }
    ],
    "Civil": [
      { 
        course: "Structural Engineering", 
        modules: [
          { name: "Structural Analysis", completion: 89, students: 19 },
          { name: "Concrete Design", completion: 78, students: 17 },
          { name: "Steel Design", completion: 66, students: 14 },
          { name: "Seismic Design", completion: 48, students: 10 }
        ]
      },
      { 
        course: "Environmental Engineering", 
        modules: [
          { name: "Water Treatment", completion: 92, students: 18 },
          { name: "Air Pollution", completion: 80, students: 16 },
          { name: "Waste Management", completion: 72, students: 14 },
          { name: "Environmental Impact", completion: 58, students: 12 }
        ]
      }
    ]
  };
  return modulesData[department] || [];
}

export function TeacherProgressPage({ user }: TeacherProgressPageProps) {
  // Get department-specific data
  const classProgressData = getDepartmentClassData(user.department);
  const weeklyProgressTrend = getDepartmentWeeklyTrend(user.department);
  const studentPerformanceDistribution = getDepartmentPerformanceDistribution(user.department);
  const strugglingStudents = getDepartmentStrugglingStudents(user.department);
  const topPerformers = getDepartmentTopPerformers(user.department);
  const courseModules = getDepartmentCourseModules(user.department);

  const totalStudents = classProgressData.reduce((sum, cls) => sum + cls.students, 0);
  const avgClassProgress = classProgressData.length > 0 ? Math.round(classProgressData.reduce((sum, cls) => sum + cls.avgProgress, 0) / classProgressData.length) : 0;
  const totalCompleted = classProgressData.reduce((sum, cls) => sum + cls.completed, 0);
  const totalStruggling = classProgressData.reduce((sum, cls) => sum + cls.struggling, 0);

  const handleScheduleMeeting = (studentName: string, studentRollNo: string) => {
    // This would typically integrate with a calendar system
    alert(`Meeting scheduled with ${studentName} (${studentRollNo}). You will receive a calendar invitation shortly.`);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Student Progress Tracking</h1>
            <p className="text-dark-secondary mt-2">Monitor class performance and individual student progress</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            {avgClassProgress}% Avg Progress
          </Badge>
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
                  <p className="text-sm text-dark-secondary">Average Progress</p>
                  <p className="text-3xl font-bold text-dark-primary">{avgClassProgress}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Completed Courses</p>
                  <p className="text-3xl font-bold text-dark-primary">{totalCompleted}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Need Attention</p>
                  <p className="text-3xl font-bold text-dark-primary">{totalStruggling}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class Progress Overview */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Class Progress Overview</CardTitle>
              <CardDescription className="text-dark-secondary">Progress across all your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="class" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Bar dataKey="avgProgress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Student Performance Distribution */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Performance Distribution</CardTitle>
              <CardDescription className="text-dark-secondary">Overall student performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentPerformanceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentPerformanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Trend */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Weekly Progress Trends</CardTitle>
            <CardDescription className="text-dark-secondary">Track progress, assignments, and attendance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={weeklyProgressTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
                <Line type="monotone" dataKey="avgProgress" stroke="#3B82F6" strokeWidth={3} name="Average Progress" />
                <Line type="monotone" dataKey="assignments" stroke="#10B981" strokeWidth={3} name="Assignment Completion" />
                <Line type="monotone" dataKey="attendance" stroke="#F59E0B" strokeWidth={3} name="Attendance Rate" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Students Needing Attention */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Students Needing Attention
              </CardTitle>
              <CardDescription className="text-dark-secondary">Students who may need extra support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strugglingStudents.map((student, index) => (
                  <div key={index} className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-dark-primary">{student.name}</h4>
                        <p className="text-sm text-dark-secondary">{student.rollNo} • {student.subject}</p>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        Grade: {student.currentGrade}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {student.issues.map((issue, issueIndex) => (
                        <Badge key={issueIndex} className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="dark-button-primary">
                          <Calendar className="w-3 h-3 mr-1" />
                          Schedule Meeting
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-dark-card border-dark-color">
                        <DialogHeader>
                          <DialogTitle className="text-dark-primary">Schedule Meeting with {student.name}</DialogTitle>
                          <DialogDescription className="text-dark-secondary">
                            Schedule a one-on-one meeting to discuss academic progress
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="date" className="text-dark-primary">Meeting Date</Label>
                              <Input
                                id="date"
                                type="date"
                                className="bg-dark-bg border-dark-color text-dark-primary"
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div>
                              <Label htmlFor="time" className="text-dark-primary">Meeting Time</Label>
                              <Select>
                                <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent className="bg-dark-card border-dark-color">
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">10:00 AM</SelectItem>
                                  <SelectItem value="11:00">11:00 AM</SelectItem>
                                  <SelectItem value="14:00">2:00 PM</SelectItem>
                                  <SelectItem value="15:00">3:00 PM</SelectItem>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="duration" className="text-dark-primary">Duration</Label>
                            <Select>
                              <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-card border-dark-color">
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="agenda" className="text-dark-primary">Meeting Agenda</Label>
                            <Textarea
                              id="agenda"
                              placeholder="Discuss academic performance, address concerns, set improvement goals..."
                              className="bg-dark-bg border-dark-color text-dark-primary"
                              rows={3}
                            />
                          </div>
                          <div className="flex space-x-3">
                            <Button 
                              className="dark-button-primary flex-1"
                              onClick={() => handleScheduleMeeting(student.name, student.rollNo)}
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Schedule Meeting
                            </Button>
                            <Button className="dark-button-secondary flex-1">
                              Send Email First
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Top Performers
              </CardTitle>
              <CardDescription className="text-dark-secondary">Students excelling in their studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400 font-semibold text-sm">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-primary">{student.name}</h4>
                        <p className="text-sm text-dark-secondary">{student.rollNo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-dark-primary">{student.avgScore}%</p>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        {student.streak} week streak
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Module Progress */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Course Module Progress</CardTitle>
            <CardDescription className="text-dark-secondary">Detailed breakdown of module completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courseModules.map((course, courseIndex) => (
                <div key={courseIndex} className="space-y-4">
                  <h3 className="font-semibold text-dark-primary text-lg">{course.course}</h3>
                  <div className="grid gap-4">
                    {course.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="p-4 bg-dark-hover rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-dark-primary">{module.name}</span>
                          <span className="text-sm text-dark-secondary">{module.students} students completed</span>
                        </div>
                        <Progress value={module.completion} className="h-2 mb-2" />
                        <div className="flex items-center justify-between text-sm text-dark-secondary">
                          <span>{module.completion}% completion rate</span>
                          <Badge className={`${
                            module.completion >= 90 ? 'bg-green-500/20 text-green-400' :
                            module.completion >= 70 ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {module.completion >= 90 ? 'Excellent' : module.completion >= 70 ? 'Good' : 'Needs Focus'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}