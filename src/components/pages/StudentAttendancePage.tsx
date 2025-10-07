import { Calendar, BarChart3, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface StudentAttendancPageProps {
  user: any;
}

// Function to generate personalized attendance data based on student information
function getPersonalizedAttendanceData(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseAttendance = user.cgpa >= 9.0 ? 95 : user.cgpa >= 8.5 ? 90 : user.cgpa >= 8.0 ? 85 : 80;
  
  const departmentSubjects = {
    "Computer Science": [
      "Data Structures & Algorithms",
      "Database Management Systems", 
      "Computer Networks",
      "Software Engineering"
    ],
    "Electronics": [
      "Digital Signal Processing",
      "VLSI Design",
      "Communication Systems", 
      "Microprocessors"
    ],
    "Mechanical": [
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      "Manufacturing Processes"
    ],
    "Information Technology": [
      "Web Development",
      "Database Systems",
      "Cybersecurity",
      "Cloud Computing"
    ],
    "Civil": [
      "Structural Engineering",
      "Environmental Engineering",
      "Geotechnical Engineering",
      "Construction Management"
    ]
  };
  
  const subjects = departmentSubjects[user.department] || [];
  
  return subjects.map((subject, index) => {
    const variance = (rollNoSeed + index * 13) % 8 - 4; // -4 to +4 variance
    const attendance = Math.max(75, Math.min(100, baseAttendance + variance));
    const totalClasses = 28 + (rollNoSeed + index) % 5; // 28-32 total classes
    const attendedClasses = Math.round((attendance / 100) * totalClasses);
    
    return {
      subject: subject,
      attended: attendedClasses,
      total: totalClasses,
      percentage: parseFloat(((attendedClasses / totalClasses) * 100).toFixed(1))
    };
  });
}

// Function to generate monthly attendance trend
function getMonthlyTrend(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseAttendance = user.cgpa >= 9.0 ? 93 : user.cgpa >= 8.5 ? 89 : user.cgpa >= 8.0 ? 85 : 82;
  
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan"];
  
  return months.map((month, index) => {
    const variance = (rollNoSeed + index * 7) % 6 - 3; // -3 to +3 variance
    const attendance = Math.max(75, Math.min(98, baseAttendance + variance));
    
    return {
      month: month,
      attendance: attendance
    };
  });
}

// Function to generate recent attendance records
function getRecentAttendance(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  const subjects = {
    "Computer Science": ["Data Structures", "Database Systems", "Computer Networks", "Software Engineering"],
    "Electronics": ["DSP", "VLSI Design", "Communication Systems", "Microprocessors"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing"],
    "Information Technology": ["Web Development", "Database Systems", "Cybersecurity", "Cloud Computing"],
    "Civil": ["Structural Engineering", "Environmental Eng", "Geotechnical", "Construction Mgmt"]
  }[user.department] || [];
  
  const records = [];
  
  for (let i = 0; i < 8; i++) {
    const daysAgo = i + 1;
    const subject = subjects[i % subjects.length];
    const attendanceChance = user.cgpa >= 9.0 ? 0.95 : user.cgpa >= 8.5 ? 0.90 : user.cgpa >= 8.0 ? 0.85 : 0.80;
    const isPresent = ((rollNoSeed + i * 11) % 100) < (attendanceChance * 100);
    const timeSlots = ["10:00 AM - 11:30 AM", "2:00 PM - 3:30 PM", "11:00 AM - 12:30 PM", "3:00 PM - 4:30 PM"];
    
    records.push({
      date: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subject: subject,
      status: isPresent ? "Present" : "Absent",
      time: timeSlots[i % timeSlots.length]
    });
  }
  
  return records;
}

export function StudentAttendancePage({ user }: StudentAttendancPageProps) {
  // Get personalized data for this student
  const attendanceData = getPersonalizedAttendanceData(user);
  const monthlyTrend = getMonthlyTrend(user);
  const recentAttendance = getRecentAttendance(user);
  
  const overallAttendance = Math.round(
    attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length
  );

  const totalClasses = attendanceData.reduce((sum, item) => sum + item.total, 0);
  const attendedClasses = attendanceData.reduce((sum, item) => sum + item.attended, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Attendance Tracking</h1>
            <p className="text-dark-secondary mt-2">Monitor your class attendance and patterns - {user.department}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Overall: {overallAttendance}%
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {attendedClasses}/{totalClasses} Classes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Attendance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-dark-secondary">Overall Attendance</p>
                  <p className="text-3xl font-bold text-dark-primary">{overallAttendance}%</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${overallAttendance >= 85 ? 'text-dark-positive' : 'text-dark-negative'}`} />
                    <span className={`text-sm font-medium ${overallAttendance >= 85 ? 'text-dark-positive' : 'text-dark-negative'}`}>
                      {overallAttendance >= user.cgpa * 10 ? '+2.3%' : '-1.2%'}
                    </span>
                    <span className="text-sm text-dark-secondary">vs target</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-dark-secondary">Classes Attended</p>
                  <p className="text-3xl font-bold text-dark-primary">{attendedClasses}</p>
                  <p className="text-sm text-dark-secondary">out of {totalClasses} classes</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-dark-secondary">This Month</p>
                  <p className="text-3xl font-bold text-dark-primary">{monthlyTrend[monthlyTrend.length - 1]?.attendance}%</p>
                  <p className="text-sm text-dark-secondary">Current month attendance</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-dark-secondary">Attendance Status</p>
                  <p className="text-3xl font-bold text-dark-primary">
                    {overallAttendance >= 85 ? "Good" : overallAttendance >= 75 ? "Fair" : "Low"}
                  </p>
                  <p className="text-sm text-dark-secondary">
                    {overallAttendance >= 85 ? "Above requirement" : "Needs improvement"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                  {overallAttendance >= 85 ? 
                    <CheckCircle className="w-6 h-6 text-green-400" /> :
                    <XCircle className="w-6 h-6 text-red-400" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject-wise Attendance */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Subject-wise Attendance</CardTitle>
              <CardDescription className="text-dark-secondary">Your attendance breakdown by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-dark-primary">{item.subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-dark-secondary">{item.attended}/{item.total}</span>
                        <Badge className={`${item.percentage >= 85 ? 'bg-green-500/20 text-green-400 border-green-500/30' : item.percentage >= 75 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={item.percentage} 
                      className="h-2 bg-dark-bg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Monthly Attendance Trend</CardTitle>
              <CardDescription className="text-dark-secondary">Your attendance pattern over months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" domain={[70, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px' 
                      }}
                      labelStyle={{ color: '#FFFFFF' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attendance Records */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Recent Attendance Records</CardTitle>
            <CardDescription className="text-dark-secondary">Your latest class attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div>
                      <p className="font-medium text-dark-primary">{record.subject}</p>
                      <p className="text-sm text-dark-secondary">{formatDate(record.date)} • {record.time}</p>
                    </div>
                  </div>
                  <Badge className={`${record.status === 'Present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {record.status === 'Present' ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Goals */}
        {overallAttendance < 85 && (
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-primary">Attendance Alert</h3>
                  <p className="text-dark-secondary mt-1">
                    Your attendance is {overallAttendance}%. You need {85 - overallAttendance}% more to reach the minimum requirement of 85%.
                  </p>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">
                  Action Required
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}