import { BarChart3, TrendingUp, PieChart, Calendar, Clock, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

interface StudentAnalyticsPageProps {
  user: any;
}

// Function to generate personalized study time data based on department and performance
function getPersonalizedStudyTimeData(user: any) {
  const performanceMultiplier = user.cgpa / 10;
  
  const departmentSubjects = {
    "Computer Science": [
      { subject: "Data Structures", hours: Math.round(40 + performanceMultiplier * 15), target: 50, percentage: Math.round((40 + performanceMultiplier * 15) / 50 * 100) },
      { subject: "Database Systems", hours: Math.round(35 + performanceMultiplier * 12), target: 40, percentage: Math.round((35 + performanceMultiplier * 12) / 40 * 100) },
      { subject: "Computer Networks", hours: Math.round(30 + performanceMultiplier * 18), target: 45, percentage: Math.round((30 + performanceMultiplier * 18) / 45 * 100) },
      { subject: "Software Engineering", hours: Math.round(38 + performanceMultiplier * 10), target: 42, percentage: Math.round((38 + performanceMultiplier * 10) / 42 * 100) }
    ],
    "Electronics": [
      { subject: "Digital Signal Processing", hours: Math.round(42 + performanceMultiplier * 12), target: 48, percentage: Math.round((42 + performanceMultiplier * 12) / 48 * 100) },
      { subject: "VLSI Design", hours: Math.round(36 + performanceMultiplier * 15), target: 45, percentage: Math.round((36 + performanceMultiplier * 15) / 45 * 100) },
      { subject: "Communication Systems", hours: Math.round(33 + performanceMultiplier * 14), target: 40, percentage: Math.round((33 + performanceMultiplier * 14) / 40 * 100) },
      { subject: "Microprocessors", hours: Math.round(39 + performanceMultiplier * 11), target: 44, percentage: Math.round((39 + performanceMultiplier * 11) / 44 * 100) }
    ],
    "Mechanical": [
      { subject: "Thermodynamics", hours: Math.round(38 + performanceMultiplier * 16), target: 46, percentage: Math.round((38 + performanceMultiplier * 16) / 46 * 100) },
      { subject: "Fluid Mechanics", hours: Math.round(34 + performanceMultiplier * 14), target: 42, percentage: Math.round((34 + performanceMultiplier * 14) / 42 * 100) },
      { subject: "Machine Design", hours: Math.round(41 + performanceMultiplier * 12), target: 48, percentage: Math.round((41 + performanceMultiplier * 12) / 48 * 100) },
      { subject: "Manufacturing Processes", hours: Math.round(36 + performanceMultiplier * 13), target: 44, percentage: Math.round((36 + performanceMultiplier * 13) / 44 * 100) }
    ],
    "Information Technology": [
      { subject: "Web Development", hours: Math.round(43 + performanceMultiplier * 12), target: 50, percentage: Math.round((43 + performanceMultiplier * 12) / 50 * 100) },
      { subject: "Database Systems", hours: Math.round(37 + performanceMultiplier * 11), target: 42, percentage: Math.round((37 + performanceMultiplier * 11) / 42 * 100) },
      { subject: "Cybersecurity", hours: Math.round(35 + performanceMultiplier * 15), target: 45, percentage: Math.round((35 + performanceMultiplier * 15) / 45 * 100) },
      { subject: "Cloud Computing", hours: Math.round(40 + performanceMultiplier * 10), target: 46, percentage: Math.round((40 + performanceMultiplier * 10) / 46 * 100) }
    ],
    "Civil": [
      { subject: "Structural Engineering", hours: Math.round(39 + performanceMultiplier * 14), target: 47, percentage: Math.round((39 + performanceMultiplier * 14) / 47 * 100) },
      { subject: "Environmental Engineering", hours: Math.round(32 + performanceMultiplier * 16), target: 43, percentage: Math.round((32 + performanceMultiplier * 16) / 43 * 100) },
      { subject: "Geotechnical Engineering", hours: Math.round(37 + performanceMultiplier * 13), target: 45, percentage: Math.round((37 + performanceMultiplier * 13) / 45 * 100) },
      { subject: "Construction Management", hours: Math.round(35 + performanceMultiplier * 12), target: 41, percentage: Math.round((35 + performanceMultiplier * 12) / 41 * 100) }
    ]
  };
  
  return departmentSubjects[user.department] || [];
}

// Function to generate personalized weekly progress
function getPersonalizedWeeklyProgress(user: any) {
  const basePerformance = Math.round(user.cgpa * 10);
  const variation = 8; // Weekly variation
  
  return [
    { week: "Week 1", completed: Math.max(60, Math.min(100, basePerformance - variation + Math.random() * 5)) },
    { week: "Week 2", completed: Math.max(60, Math.min(100, basePerformance + Math.random() * 8)) },
    { week: "Week 3", completed: Math.max(60, Math.min(100, basePerformance - variation/2 + Math.random() * 6)) },
    { week: "Week 4", completed: Math.max(60, Math.min(100, basePerformance + variation + Math.random() * 4)) }
  ];
}

// Function to generate personalized performance metrics
function getPersonalizedPerformanceMetrics(user: any) {
  const performanceLevel = user.cgpa >= 9.0 ? 'excellent' : user.cgpa >= 8.5 ? 'very_good' : user.cgpa >= 8.0 ? 'good' : 'average';
  
  const baseMetrics = {
    excellent: { completion: 97, studyHours: 7.2, quiz: 94, participation: 28 },
    very_good: { completion: 93, studyHours: 6.8, quiz: 89, participation: 24 },
    good: { completion: 88, studyHours: 6.2, quiz: 84, participation: 20 },
    average: { completion: 82, studyHours: 5.6, quiz: 78, participation: 16 }
  };
  
  const metrics = baseMetrics[performanceLevel];
  
  return [
    { label: "Assignment Completion Rate", value: `${metrics.completion}%`, trend: `+${(Math.random() * 4 + 1).toFixed(1)}%`, color: "green" },
    { label: "Average Study Hours/Day", value: metrics.studyHours.toString(), trend: `+${(Math.random() * 1.2 + 0.3).toFixed(1)}`, color: "blue" },
    { label: "Quiz Performance", value: `${metrics.quiz}%`, trend: `+${(Math.random() * 6 + 2).toFixed(1)}%`, color: "purple" },
    { label: "Discussion Participation", value: metrics.participation.toString(), trend: `+${Math.round(Math.random() * 8 + 3)}`, color: "orange" }
  ];
}

export function StudentAnalyticsPage({ user }: StudentAnalyticsPageProps) {
  // Get personalized data for this student
  const studyTimeData = getPersonalizedStudyTimeData(user);
  const weeklyProgress = getPersonalizedWeeklyProgress(user);
  const performanceMetrics = getPersonalizedPerformanceMetrics(user);
  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Learning Analytics</h1>
            <p className="text-dark-secondary mt-2">Detailed insights into your academic performance</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="bg-dark-card border-dark-color">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-8 h-8 rounded-lg bg-${metric.color}-500/20 flex items-center justify-center`}>
                    <TrendingUp className={`w-4 h-4 text-${metric.color}-400`} />
                  </div>
                  <span className="text-sm text-green-400 font-medium">{metric.trend}</span>
                </div>
                <p className="text-2xl font-bold text-dark-primary mb-1">{metric.value}</p>
                <p className="text-sm text-dark-secondary">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Time Analysis */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Study Time Analysis
              </CardTitle>
              <CardDescription className="text-dark-secondary">Hours spent per subject this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyTimeData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-dark-primary">{item.subject}</span>
                    <span className="text-sm text-dark-secondary">{item.hours}h / {item.target}h</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-dark-secondary">
                    <span>{item.percentage}% of target</span>
                    <span className={item.percentage >= 90 ? "text-green-400" : item.percentage >= 70 ? "text-orange-400" : "text-red-400"}>
                      {item.percentage >= 90 ? "Excellent" : item.percentage >= 70 ? "Good" : "Needs Improvement"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Progress Trend */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Weekly Progress Trend
              </CardTitle>
              <CardDescription className="text-dark-secondary">Your consistency over the past month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-dark-primary">{week.week}</p>
                      <p className="text-sm text-dark-secondary">Completion Rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-dark-primary">{week.completed}%</p>
                    <Badge className={`${week.completed >= 90 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {week.completed >= 90 ? 'Excellent' : 'Good'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-dark-primary flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-dark-primary">Strengths</h4>
                <ul className="space-y-2 text-sm text-dark-secondary">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Consistent assignment submission</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>High engagement in Database Systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Excellent CGPA maintenance</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-dark-primary">Areas for Improvement</h4>
                <ul className="space-y-2 text-sm text-dark-secondary">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Increase study time for Computer Networks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Participate more in group discussions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Complete practice problems regularly</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}