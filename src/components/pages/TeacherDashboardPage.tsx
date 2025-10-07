import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Users, BookOpen, TrendingUp, Award, Download, Calendar, GraduationCap } from "lucide-react";
import { STUDENTS_DATA } from "../StudentData";

interface TeacherDashboardPageProps {
  user: any;
}

// Get department-specific metrics - function to be used inside component
function getDepartmentMetrics(user: any, totalStudents: number, averageCGPA: string, highPerformers: number) {
  // Department-specific active courses
  const departmentCourses = {
    "Computer Science": ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Computer Networks"],
    "Electronics": ["Digital Signal Processing", "VLSI Design", "Communication Systems", "Microprocessors", "Control Systems"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Heat Transfer", "Machine Design", "Manufacturing"],
    "Information Technology": ["Database Systems", "Web Development", "Cybersecurity", "Network Administration", "Cloud Computing"],
    "Civil": ["Structural Engineering", "Environmental Engineering", "Geotechnical", "Transportation", "Construction Management"]
  };
  
  const activeCourses = departmentCourses[user.department]?.length || 3;
  
  return [
    {
      title: "Department Students",
      value: totalStudents.toString(),
      change: "+5",
      icon: Users,
      iconColor: "text-blue-400",
      isPositive: true
    },
    {
      title: "Active Courses", 
      value: activeCourses.toString(),
      change: "+1",
      icon: BookOpen,
      iconColor: "text-green-400",
      isPositive: true
    },
    {
      title: "Dept. Avg Performance",
      value: averageCGPA,
      change: "+0.2",
      icon: TrendingUp,
      iconColor: "text-orange-400",
      isPositive: true
    },
    {
      title: "High Performers",
      value: highPerformers.toString(),
      change: "+3",
      icon: Award,
      iconColor: "text-purple-400",
      isPositive: true
    },
  ];
}

// Department-specific activities function
function getDepartmentActivities(user: any) {
  const departmentActivities = {
    "Computer Science": [
      { title: "Assignment submitted by Aarav Sharma", subject: "Data Structures", time: "1 hour ago", type: "submission" },
      { title: "New project proposal from Sneha Patel", subject: "Software Engineering", time: "3 hours ago", type: "discussion" },
      { title: "Grade updated for Neha Gupta", subject: "Database Systems", time: "5 hours ago", type: "grade" },
      { title: "Lab session scheduled", subject: "Computer Networks", time: "1 day ago", type: "schedule" },
    ],
    "Electronics": [
      { title: "Circuit design submitted by Priya Reddy", subject: "VLSI Design", time: "2 hours ago", type: "submission" },
      { title: "Lab report from Aditya Nair", subject: "Digital Signal Processing", time: "4 hours ago", type: "discussion" },
      { title: "Quiz results updated", subject: "Communication Systems", time: "6 hours ago", type: "grade" },
      { title: "Workshop scheduled", subject: "Microprocessors", time: "1 day ago", type: "schedule" },
    ],
    "Mechanical": [
      { title: "CAD model submitted by Rohan Kumar", subject: "Machine Design", time: "1 hour ago", type: "submission" },
      { title: "Thermodynamics query from Kiran Das", subject: "Thermal Engineering", time: "3 hours ago", type: "discussion" },
      { title: "Practical marks updated", subject: "Fluid Mechanics", time: "4 hours ago", type: "grade" },
      { title: "Industry visit planned", subject: "Manufacturing", time: "2 days ago", type: "schedule" },
    ],
    "Information Technology": [
      { title: "Web project deployed by Kavya Iyer", subject: "Web Development", time: "30 mins ago", type: "submission" },
      { title: "Security discussion by Meera Joshi", subject: "Cybersecurity", time: "2 hours ago", type: "discussion" },
      { title: "Database assignment graded", subject: "Database Systems", time: "3 hours ago", type: "grade" },
      { title: "Cloud workshop scheduled", subject: "Cloud Computing", time: "1 day ago", type: "schedule" },
    ],
    "Civil": [
      { title: "Structural design by Arjun Verma", subject: "Structural Engineering", time: "2 hours ago", type: "submission" },
      { title: "Environmental impact study", subject: "Environmental Engineering", time: "4 hours ago", type: "discussion" },
      { title: "Survey results updated", subject: "Geotechnical Engineering", time: "5 hours ago", type: "grade" },
      { title: "Site visit planned", subject: "Construction Management", time: "1 day ago", type: "schedule" },
    ]
  };
  
  return departmentActivities[user.department] || [];
}

// Department-specific classes function
function getDepartmentClasses(user: any) {
  const departmentClasses = {
    "Computer Science": [
      { course: "Data Structures & Algorithms", time: "10:00 AM - 11:30 AM", room: "Lab 204", students: 25 },
      { course: "Database Management Systems", time: "2:00 PM - 3:30 PM", room: "Room 301", students: 22 },
      { course: "Software Engineering", time: "4:00 PM - 5:30 PM", room: "Room 205", students: 20 },
    ],
    "Electronics": [
      { course: "Digital Signal Processing", time: "9:00 AM - 10:30 AM", room: "Lab 301", students: 18 },
      { course: "VLSI Design", time: "11:00 AM - 12:30 PM", room: "Lab 302", students: 16 },
      { course: "Communication Systems", time: "3:00 PM - 4:30 PM", room: "Room 401", students: 20 },
    ],
    "Mechanical": [
      { course: "Thermodynamics", time: "10:00 AM - 11:30 AM", room: "Room 501", students: 24 },
      { course: "Fluid Mechanics", time: "1:00 PM - 2:30 PM", room: "Lab 504", students: 22 },
      { course: "Machine Design", time: "3:30 PM - 5:00 PM", room: "Room 502", students: 18 },
    ],
    "Information Technology": [
      { course: "Web Development", time: "9:30 AM - 11:00 AM", room: "Lab 601", students: 20 },
      { course: "Database Systems", time: "2:00 PM - 3:30 PM", room: "Lab 602", students: 18 },
      { course: "Cybersecurity", time: "4:00 PM - 5:30 PM", room: "Room 603", students: 16 },
    ],
    "Civil": [
      { course: "Structural Engineering", time: "8:00 AM - 9:30 AM", room: "Room 701", students: 22 },
      { course: "Environmental Engineering", time: "11:00 AM - 12:30 PM", room: "Lab 702", students: 20 },
      { course: "Construction Management", time: "2:30 PM - 4:00 PM", room: "Room 703", students: 18 },
    ]
  };
  
  return departmentClasses[user.department] || [];
}

export function TeacherDashboardPage({ user }: TeacherDashboardPageProps) {
  // Get students from the teacher's department only
  const departmentStudents = STUDENTS_DATA.filter(student => student.department === user.department);
  const totalStudents = departmentStudents.length;
  const averageCGPA = totalStudents > 0 ? (departmentStudents.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(1) : "N/A";
  const highPerformers = departmentStudents.filter(student => student.cgpa >= 8.5).length;
  
  // Get department-specific data
  const teacherMetrics = getDepartmentMetrics(user, totalStudents, averageCGPA, highPerformers);
  const recentActivities = getDepartmentActivities(user);
  const upcomingClasses = getDepartmentClasses(user);

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Welcome back, {user.name.split(' ')[1]} {user.name.split(' ')[2]}</h1>
            <p className="text-dark-secondary mt-2">Here's your teaching dashboard overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              {user.department} Department
            </Badge>
            <Button className="dark-button-primary">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teacherMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const displayValue = metric.value;

            return (
              <Card key={index} className="bg-dark-card border-dark-color">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-dark-secondary">{metric.title}</p>
                      <p className="text-3xl font-bold text-dark-primary">{displayValue}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`} />
                        <span className={`text-sm font-medium ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-dark-secondary">this month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Today's Schedule
              </CardTitle>
              <CardDescription className="text-dark-secondary">Your classes for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((class_info, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-dark-primary">{class_info.course}</h4>
                    <p className="text-sm text-dark-secondary mt-1">{class_info.time}</p>
                    <p className="text-sm text-dark-secondary">{class_info.room}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {class_info.students} students
                    </Badge>
                  </div>
                </div>
              ))}
              <Button className="w-full dark-button-secondary mt-4">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Recent Activities</CardTitle>
              <CardDescription className="text-dark-secondary">Latest updates from your classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-dark-hover rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'submission' ? 'bg-green-400' :
                    activity.type === 'discussion' ? 'bg-blue-400' :
                    activity.type === 'grade' ? 'bg-orange-400' : 'bg-purple-400'
                  }`} />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-dark-primary">{activity.title}</h4>
                    <p className="text-xs text-dark-secondary mt-1">{activity.subject}</p>
                    <p className="text-xs text-dark-secondary">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full dark-button-secondary mt-4">
                View All Activities
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance Summary */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-dark-primary">Excellent Department Performance!</h3>
                <p className="text-dark-secondary mt-1">
                  Your {user.department} department maintains an average CGPA of {averageCGPA} with {highPerformers} high-performing students.
                </p>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                Top Department
              </Badge>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}