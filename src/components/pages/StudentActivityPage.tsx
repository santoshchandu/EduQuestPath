import { Zap, FileText, MessageSquare, Book, Clock, Calendar, CheckCircle, TrendingUp, Target, Award, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface StudentActivityPageProps {
  user: any;
}

// Function to generate personalized recent activities
function getPersonalizedActivities(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  
  const departmentActivities = {
    "Computer Science": [
      {
        type: "assignment",
        title: `Submitted Advanced DSA Assignment ${user.semester}`,
        description: "Binary Search Tree with AVL balancing",
        subject: "Data Structures & Algorithms",
        points: user.cgpa >= 9.0 ? 15 : user.cgpa >= 8.5 ? 12 : 10
      },
      {
        type: "discussion",
        title: "Posted in Database Systems Forum",
        description: "Query optimization techniques discussion",
        subject: "Database Management Systems",
        points: 5
      },
      {
        type: "quiz",
        title: "Completed Computer Networks Quiz",
        description: "OSI Model and TCP/IP protocols",
        subject: "Computer Networks",
        points: user.cgpa >= 8.5 ? 18 : 15
      },
      {
        type: "resource",
        title: "Downloaded Software Engineering Materials",
        description: "Design patterns and UML diagrams",
        subject: "Software Engineering",
        points: 3
      }
    ],
    "Electronics": [
      {
        type: "assignment",
        title: `Submitted DSP Lab Assignment ${user.semester}`,
        description: "Digital filter design using MATLAB",
        subject: "Digital Signal Processing",
        points: user.cgpa >= 9.0 ? 16 : user.cgpa >= 8.5 ? 13 : 11
      },
      {
        type: "discussion",
        title: "Posted in VLSI Design Forum",
        description: "CMOS technology scaling discussion",
        subject: "VLSI Design",
        points: 6
      },
      {
        type: "quiz",
        title: "Completed Communication Systems Quiz",
        description: "Modulation techniques and applications",
        subject: "Communication Systems",
        points: user.cgpa >= 8.5 ? 17 : 14
      },
      {
        type: "resource",
        title: "Downloaded Microprocessor Lab Manual",
        description: "8086 assembly programming guide",
        subject: "Microprocessors",
        points: 2
      }
    ],
    "Mechanical": [
      {
        type: "assignment",
        title: `Submitted Thermal Analysis Project ${user.semester}`,
        description: "Heat exchanger design calculations",
        subject: "Thermodynamics",
        points: user.cgpa >= 9.0 ? 14 : user.cgpa >= 8.5 ? 11 : 9
      },
      {
        type: "discussion",
        title: "Posted in Fluid Mechanics Forum",
        description: "Bernoulli's equation applications",
        subject: "Fluid Mechanics",
        points: 4
      },
      {
        type: "quiz",
        title: "Completed Machine Design Quiz",
        description: "Shaft design and stress analysis",
        subject: "Machine Design",
        points: user.cgpa >= 8.5 ? 16 : 13
      },
      {
        type: "resource",
        title: "Downloaded Manufacturing Processes Guide",
        description: "CNC machining and tooling",
        subject: "Manufacturing Processes",
        points: 3
      }
    ],
    "Information Technology": [
      {
        type: "assignment",
        title: `Submitted Web Development Project ${user.semester}`,
        description: "Full-stack e-commerce application",
        subject: "Web Development",
        points: user.cgpa >= 9.0 ? 18 : user.cgpa >= 8.5 ? 15 : 12
      },
      {
        type: "discussion",
        title: "Posted in Cybersecurity Forum",
        description: "Web application security vulnerabilities",
        subject: "Cybersecurity",
        points: 7
      },
      {
        type: "quiz",
        title: "Completed Cloud Computing Quiz",
        description: "AWS services and deployment models",
        subject: "Cloud Computing",
        points: user.cgpa >= 8.5 ? 19 : 16
      },
      {
        type: "resource",
        title: "Downloaded Database Systems Resources",
        description: "NoSQL databases and scalability",
        subject: "Database Systems",
        points: 4
      }
    ],
    "Civil": [
      {
        type: "assignment",
        title: `Submitted Structural Design Project ${user.semester}`,
        description: "Reinforced concrete beam analysis",
        subject: "Structural Engineering",
        points: user.cgpa >= 9.0 ? 15 : user.cgpa >= 8.5 ? 12 : 10
      },
      {
        type: "discussion",
        title: "Posted in Environmental Engineering Forum",
        description: "Wastewater treatment processes",
        subject: "Environmental Engineering",
        points: 5
      },
      {
        type: "quiz",
        title: "Completed Geotechnical Engineering Quiz",
        description: "Soil mechanics and foundation design",
        subject: "Geotechnical Engineering",
        points: user.cgpa >= 8.5 ? 17 : 14
      },
      {
        type: "resource",
        title: "Downloaded Construction Management Guide",
        description: "Project scheduling and cost estimation",
        subject: "Construction Management",
        points: 3
      }
    ]
  };

  const activities = departmentActivities[user.department] || [];
  
  return activities.map((activity, index) => {
    const daysAgo = Math.floor((rollNoSeed + index * 7) % 15 + 1); // 1-15 days ago
    const hoursAgo = Math.floor((rollNoSeed + index * 3) % 12 + 1); // 1-12 hours ago within that day
    
    return {
      id: rollNoSeed + index + 1,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      timestamp: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      subject: activity.subject,
      status: rollNoSeed % 3 === index % 3 ? "completed" : "active",
      points: activity.points
    };
  });
}

// Function to generate weekly activity data
function getWeeklyActivity(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseActivity = user.cgpa >= 9.0 ? 85 : user.cgpa >= 8.5 ? 75 : user.cgpa >= 8.0 ? 65 : 55;
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  return days.map((day, index) => {
    const variance = (rollNoSeed + index * 11) % 20 - 10; // -10 to +10 variance
    const activity = Math.max(20, Math.min(100, baseActivity + variance));
    
    return {
      day: day,
      activity: activity,
      assignments: Math.floor((rollNoSeed + index) % 4 + 1),
      discussions: Math.floor((rollNoSeed + index * 3) % 3 + 1),
      resources: Math.floor((rollNoSeed + index * 5) % 5 + 2)
    };
  });
}

// Function to generate engagement metrics
function getEngagementMetrics(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const performanceMultiplier = user.cgpa >= 9.0 ? 1.3 : user.cgpa >= 8.5 ? 1.15 : user.cgpa >= 8.0 ? 1.0 : 0.85;
  
  return [
    {
      title: "Study Sessions",
      value: Math.floor((45 + (rollNoSeed % 20)) * performanceMultiplier),
      change: `+${(Math.random() * 15 + 5).toFixed(1)}%`,
      icon: Book,
      iconColor: "text-blue-400",
      isPositive: true
    },
    {
      title: "Discussion Posts",
      value: Math.floor((12 + (rollNoSeed % 8)) * performanceMultiplier),
      change: `+${(Math.random() * 20 + 10).toFixed(1)}%`,
      icon: MessageSquare,
      iconColor: "text-green-400", 
      isPositive: true
    },
    {
      title: "Resources Downloaded",
      value: Math.floor((28 + (rollNoSeed % 15)) * performanceMultiplier),
      change: `+${(Math.random() * 12 + 8).toFixed(1)}%`,
      icon: Download,
      iconColor: "text-purple-400",
      isPositive: true
    },
    {
      title: "Activity Points",
      value: Math.floor((150 + (rollNoSeed % 50)) * performanceMultiplier),
      change: `+${(Math.random() * 18 + 12).toFixed(1)}%`,
      icon: Award,
      iconColor: "text-orange-400",
      isPositive: true
    }
  ];
}

export function StudentActivityPage({ user }: StudentActivityPageProps) {
  // Get personalized data for this student
  const recentActivities = getPersonalizedActivities(user);
  const weeklyActivity = getWeeklyActivity(user);
  const engagementMetrics = getEngagementMetrics(user);
  
  const totalPoints = recentActivities.reduce((sum, activity) => sum + activity.points, 0);
  const avgActivity = Math.round(weeklyActivity.reduce((sum, day) => sum + day.activity, 0) / weeklyActivity.length);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'discussion': return MessageSquare;
      case 'quiz': return CheckCircle;
      case 'resource': return Download;
      default: return Zap;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'discussion': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'quiz': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'resource': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Learning Activity</h1>
            <p className="text-dark-secondary mt-2">Track your engagement and learning progress - {user.department}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              {totalPoints} Points This Week
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              {avgActivity}% Avg Activity
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-dark-card border-dark-color">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-dark-secondary">{metric.title}</p>
                      <p className="text-3xl font-bold text-dark-primary">{metric.value}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`} />
                        <span className={`text-sm font-medium ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-dark-secondary">this month</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Weekly Activity Overview</CardTitle>
              <CardDescription className="text-dark-secondary">Your learning activity pattern this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px' 
                      }}
                      labelStyle={{ color: '#FFFFFF' }}
                    />
                    <Bar dataKey="activity" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Breakdown */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Activity Breakdown</CardTitle>
              <CardDescription className="text-dark-secondary">Distribution of your learning activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-dark-primary">Assignments</span>
                  </div>
                  <span className="text-dark-secondary">
                    {weeklyActivity.reduce((sum, day) => sum + day.assignments, 0)}
                  </span>
                </div>
                <Progress value={75} className="h-2 bg-dark-bg" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-dark-primary">Discussions</span>
                  </div>
                  <span className="text-dark-secondary">
                    {weeklyActivity.reduce((sum, day) => sum + day.discussions, 0)}
                  </span>
                </div>
                <Progress value={60} className="h-2 bg-dark-bg" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-dark-primary">Resources</span>
                  </div>
                  <span className="text-dark-secondary">
                    {weeklyActivity.reduce((sum, day) => sum + day.resources, 0)}
                  </span>
                </div>
                <Progress value={85} className="h-2 bg-dark-bg" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Recent Activities</CardTitle>
            <CardDescription className="text-dark-secondary">Your latest learning activities and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-dark-hover rounded-lg">
                    <div className="w-10 h-10 bg-dark-card rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-dark-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-dark-primary">{activity.title}</h4>
                          <p className="text-sm text-dark-secondary">{activity.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-dark-secondary">
                            <span>{activity.subject}</span>
                            <span>•</span>
                            <span>{activity.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <Badge className={getActivityColor(activity.type)}>
                            +{activity.points} pts
                          </Badge>
                          <Badge className={`${activity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                            {activity.status === 'completed' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {activity.status === 'completed' ? 'Completed' : 'Active'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Badge */}
        {user.cgpa >= 8.5 && (
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-primary">High Achiever!</h3>
                  <p className="text-dark-secondary mt-1">
                    Excellent engagement, {user.name.split(' ')[0]}! Your CGPA of {user.cgpa}/10.0 reflects your consistent effort and participation.
                  </p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                  Active Learner
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}