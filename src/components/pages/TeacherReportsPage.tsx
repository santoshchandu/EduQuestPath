import { useState } from "react";
import { FileText, BarChart3, Download, Calendar, Users, TrendingUp, Filter, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface TeacherReportsPageProps {
  user: any;
}

const classPerformanceData = [
  { class: "Data Structures", avgScore: 87, totalStudents: 45, passRate: 96 },
  { class: "Database Systems", avgScore: 92, totalStudents: 42, passRate: 100 },
  { class: "Computer Networks", avgScore: 78, totalStudents: 38, passRate: 89 },
  { class: "Software Engineering", avgScore: 85, totalStudents: 40, passRate: 95 }
];

const attendanceData = [
  { month: "Sep", attendance: 92 },
  { month: "Oct", attendance: 89 },
  { month: "Nov", attendance: 94 },
  { month: "Dec", attendance: 91 },
  { month: "Jan", attendance: 88 }
];

const recentReports = [
  {
    id: 1,
    title: "Mid-Semester Performance Report",
    type: "Academic Performance",
    generatedDate: "2024-01-10",
    status: "Ready",
    fileSize: "2.4 MB"
  },
  {
    id: 2,
    title: "Attendance Summary - December 2023",
    type: "Attendance",
    generatedDate: "2024-01-05",
    status: "Ready",
    fileSize: "1.8 MB"
  },
  {
    id: 3,
    title: "Assignment Submission Analysis",
    type: "Academic Performance",
    generatedDate: "2024-01-03",
    status: "Ready",
    fileSize: "3.2 MB"
  },
  {
    id: 4,
    title: "Course Completion Statistics",
    type: "Course Progress",
    generatedDate: "2023-12-28",
    status: "Ready",
    fileSize: "1.5 MB"
  }
];

const reportTemplates = [
  {
    name: "Student Performance Report",
    description: "Comprehensive analysis of student academic performance",
    dataPoints: ["Grades", "Assignments", "Quizzes", "Participation"],
    estimatedTime: "5 minutes"
  },
  {
    name: "Class Attendance Report",
    description: "Detailed attendance tracking and analysis",
    dataPoints: ["Daily Attendance", "Trends", "Absenteeism Patterns"],
    estimatedTime: "3 minutes"
  },
  {
    name: "Course Progress Report",
    description: "Track course completion and module progress",
    dataPoints: ["Module Completion", "Timeline Analysis", "Learning Outcomes"],
    estimatedTime: "4 minutes"
  },
  {
    name: "Assignment Analysis Report",
    description: "Analyze assignment submission patterns and scores",
    dataPoints: ["Submission Rates", "Score Distribution", "Late Submissions"],
    estimatedTime: "6 minutes"
  }
];

export function TeacherReportsPage({ user }: TeacherReportsPageProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  const totalStudents = classPerformanceData.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const avgClassScore = Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.avgScore, 0) / classPerformanceData.length);
  const overallPassRate = Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.passRate, 0) / classPerformanceData.length);

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Academic Reports</h1>
            <p className="text-dark-secondary mt-2">Generate and analyze comprehensive academic reports</p>
          </div>
          <Button className="dark-button-primary">
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-dark-card border border-dark-color">
            <TabsTrigger value="overview" className="data-[state=active]:bg-dark-hover">
              Overview
            </TabsTrigger>
            <TabsTrigger value="generate" className="data-[state=active]:bg-dark-hover">
              Generate Reports
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-dark-hover">
              Report History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
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
                      <p className="text-sm text-dark-secondary">Average Score</p>
                      <p className="text-3xl font-bold text-dark-primary">{avgClassScore}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-color">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-dark-secondary">Pass Rate</p>
                      <p className="text-3xl font-bold text-dark-primary">{overallPassRate}%</p>
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
                      <p className="text-sm text-dark-secondary">Reports Generated</p>
                      <p className="text-3xl font-bold text-dark-primary">{recentReports.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Class Performance */}
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Class Performance Overview</CardTitle>
                  <CardDescription className="text-dark-secondary">Performance metrics across your classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={classPerformanceData}>
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
                      <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Attendance Trend */}
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Attendance Trend</CardTitle>
                  <CardDescription className="text-dark-secondary">Monthly attendance patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }} 
                      />
                      <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports Summary */}
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Recent Reports</CardTitle>
                <CardDescription className="text-dark-secondary">Latest generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-dark-primary">{report.title}</p>
                          <p className="text-sm text-dark-secondary">{report.generatedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {report.status}
                        </Badge>
                        <Button size="sm" className="dark-button-secondary">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate Reports Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Report Templates</CardTitle>
                <CardDescription className="text-dark-secondary">Choose from pre-configured report templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {reportTemplates.map((template, index) => (
                    <div key={index} className="p-6 bg-dark-hover rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark-primary mb-2">{template.name}</h3>
                          <p className="text-sm text-dark-secondary mb-3">{template.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {template.dataPoints.map((point, pointIndex) => (
                              <Badge key={pointIndex} className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-dark-secondary">Estimated generation time: {template.estimatedTime}</p>
                        </div>
                        <Button className="dark-button-primary">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-dark-primary">Generated Reports</CardTitle>
                    <CardDescription className="text-dark-secondary">View and download your previously generated reports</CardDescription>
                  </div>
                  <Button className="dark-button-secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-dark-primary">{report.title}</h4>
                          <p className="text-sm text-dark-secondary">Generated on {report.generatedDate} • {report.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {report.type}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {report.status}
                        </Badge>
                        <Button size="sm" className="dark-button-secondary">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="dark-button-primary">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}