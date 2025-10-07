import { TrendingUp, Target, BookOpen, Award, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

interface StudentProgressPageProps {
  user: any;
}

// Function to generate personalized course progress based on student's department and CGPA
function getPersonalizedCourseProgress(user: any) {
  const performanceMultiplier = user.cgpa / 10; // Normalize CGPA to a 0-1 scale
  
  const departmentCourses = {
    "Computer Science": [
      { course: "Data Structures", completion: Math.min(100, Math.round(80 + (performanceMultiplier * 20))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+", credits: 4 },
      { course: "Database Systems", completion: Math.min(100, Math.round(85 + (performanceMultiplier * 15))), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", credits: 4 },
      { course: "Computer Networks", completion: Math.min(100, Math.round(75 + (performanceMultiplier * 25))), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", credits: 3 },
      { course: "Software Engineering", completion: Math.min(100, Math.round(88 + (performanceMultiplier * 12))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", credits: 3 }
    ],
    "Electronics": [
      { course: "Digital Signal Processing", completion: Math.min(100, Math.round(78 + (performanceMultiplier * 22))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+", credits: 4 },
      { course: "VLSI Design", completion: Math.min(100, Math.round(82 + (performanceMultiplier * 18))), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", credits: 4 },
      { course: "Communication Systems", completion: Math.min(100, Math.round(85 + (performanceMultiplier * 15))), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", credits: 3 },
      { course: "Microprocessors", completion: Math.min(100, Math.round(80 + (performanceMultiplier * 20))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", credits: 3 }
    ],
    "Mechanical": [
      { course: "Thermodynamics", completion: Math.min(100, Math.round(76 + (performanceMultiplier * 24))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+", credits: 4 },
      { course: "Fluid Mechanics", completion: Math.min(100, Math.round(79 + (performanceMultiplier * 21))), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", credits: 4 },
      { course: "Machine Design", completion: Math.min(100, Math.round(83 + (performanceMultiplier * 17))), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", credits: 3 },
      { course: "Manufacturing Processes", completion: Math.min(100, Math.round(81 + (performanceMultiplier * 19))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", credits: 3 }
    ],
    "Information Technology": [
      { course: "Web Development", completion: Math.min(100, Math.round(87 + (performanceMultiplier * 13))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+", credits: 4 },
      { course: "Database Systems", completion: Math.min(100, Math.round(84 + (performanceMultiplier * 16))), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", credits: 4 },
      { course: "Cybersecurity", completion: Math.min(100, Math.round(80 + (performanceMultiplier * 20))), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", credits: 3 },
      { course: "Cloud Computing", completion: Math.min(100, Math.round(86 + (performanceMultiplier * 14))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", credits: 3 }
    ],
    "Civil": [
      { course: "Structural Engineering", completion: Math.min(100, Math.round(77 + (performanceMultiplier * 23))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+", credits: 4 },
      { course: "Environmental Engineering", completion: Math.min(100, Math.round(74 + (performanceMultiplier * 26))), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", credits: 4 },
      { course: "Geotechnical Engineering", completion: Math.min(100, Math.round(82 + (performanceMultiplier * 18))), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", credits: 3 },
      { course: "Construction Management", completion: Math.min(100, Math.round(79 + (performanceMultiplier * 21))), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", credits: 3 }
    ]
  };
  
  return departmentCourses[user.department] || [];
}

// Function to generate personalized skill progress based on department and performance
function getPersonalizedSkillProgress(user: any) {
  const performanceBonus = Math.round((user.cgpa - 7.0) * 5); // Bonus based on CGPA above 7.0
  
  const departmentSkills = {
    "Computer Science": [
      { skill: "Programming", level: Math.min(100, 70 + performanceBonus + Math.random() * 10), category: "Technical" },
      { skill: "Algorithm Design", level: Math.min(100, 65 + performanceBonus + Math.random() * 12), category: "Technical" },
      { skill: "Problem Solving", level: Math.min(100, 72 + performanceBonus + Math.random() * 8), category: "Analytical" },
      { skill: "Database Design", level: Math.min(100, 68 + performanceBonus + Math.random() * 15), category: "Technical" },
      { skill: "Software Architecture", level: Math.min(100, 60 + performanceBonus + Math.random() * 18), category: "Technical" },
      { skill: "Communication", level: Math.min(100, 65 + Math.random() * 15), category: "Soft Skills" }
    ],
    "Electronics": [
      { skill: "Circuit Design", level: Math.min(100, 72 + performanceBonus + Math.random() * 10), category: "Technical" },
      { skill: "Signal Processing", level: Math.min(100, 68 + performanceBonus + Math.random() * 12), category: "Technical" },
      { skill: "System Analysis", level: Math.min(100, 70 + performanceBonus + Math.random() * 8), category: "Analytical" },
      { skill: "Hardware Design", level: Math.min(100, 66 + performanceBonus + Math.random() * 15), category: "Technical" },
      { skill: "Testing & Debugging", level: Math.min(100, 64 + performanceBonus + Math.random() * 16), category: "Technical" },
      { skill: "Teamwork", level: Math.min(100, 70 + Math.random() * 15), category: "Soft Skills" }
    ],
    "Mechanical": [
      { skill: "CAD Design", level: Math.min(100, 74 + performanceBonus + Math.random() * 10), category: "Technical" },
      { skill: "Thermal Analysis", level: Math.min(100, 69 + performanceBonus + Math.random() * 12), category: "Technical" },
      { skill: "Material Science", level: Math.min(100, 71 + performanceBonus + Math.random() * 8), category: "Analytical" },
      { skill: "Manufacturing", level: Math.min(100, 67 + performanceBonus + Math.random() * 15), category: "Technical" },
      { skill: "Project Management", level: Math.min(100, 63 + performanceBonus + Math.random() * 17), category: "Management" },
      { skill: "Problem Solving", level: Math.min(100, 72 + Math.random() * 13), category: "Analytical" }
    ],
    "Information Technology": [
      { skill: "Web Development", level: Math.min(100, 76 + performanceBonus + Math.random() * 10), category: "Technical" },
      { skill: "Database Management", level: Math.min(100, 73 + performanceBonus + Math.random() * 12), category: "Technical" },
      { skill: "Network Security", level: Math.min(100, 69 + performanceBonus + Math.random() * 8), category: "Technical" },
      { skill: "Cloud Technologies", level: Math.min(100, 71 + performanceBonus + Math.random() * 15), category: "Technical" },
      { skill: "System Administration", level: Math.min(100, 65 + performanceBonus + Math.random() * 16), category: "Technical" },
      { skill: "Communication", level: Math.min(100, 68 + Math.random() * 15), category: "Soft Skills" }
    ],
    "Civil": [
      { skill: "Structural Analysis", level: Math.min(100, 71 + performanceBonus + Math.random() * 10), category: "Technical" },
      { skill: "Construction Planning", level: Math.min(100, 68 + performanceBonus + Math.random() * 12), category: "Technical" },
      { skill: "Environmental Assessment", level: Math.min(100, 66 + performanceBonus + Math.random() * 8), category: "Analytical" },
      { skill: "Project Management", level: Math.min(100, 64 + performanceBonus + Math.random() * 15), category: "Management" },
      { skill: "Site Planning", level: Math.min(100, 69 + performanceBonus + Math.random() * 16), category: "Technical" },
      { skill: "Leadership", level: Math.min(100, 62 + Math.random() * 18), category: "Soft Skills" }
    ]
  };
  
  return departmentSkills[user.department] || [];
}

export function StudentProgressPage({ user }: StudentProgressPageProps) {
  // Get personalized data for this student
  const courseProgress = getPersonalizedCourseProgress(user);
  const skillProgress = getPersonalizedSkillProgress(user);
  
  // Generate realistic semester progression based on current CGPA
  const generateSemesterProgress = (currentCgpa: number, currentSem: number) => {
    const progress = [];
    const variation = 0.3; // CGPA can vary by ±0.3 points
    
    for (let i = 1; i <= Math.max(6, currentSem); i++) {
      if (i < currentSem) {
        // Past semesters - generate realistic progression leading to current CGPA
        const variance = (Math.random() - 0.5) * variation;
        const semCgpa = Math.max(7.0, Math.min(10.0, currentCgpa + variance));
        progress.push({
          semester: `Sem ${i}`,
          cgpa: Math.round(semCgpa * 10) / 10,
          completed: true
        });
      } else if (i === currentSem) {
        // Current semester
        progress.push({
          semester: `Sem ${i}`,
          cgpa: currentCgpa,
          completed: false
        });
      } else {
        // Future semesters (if showing projections)
        progress.push({
          semester: `Sem ${i}`,
          cgpa: 0,
          completed: false
        });
      }
    }
    return progress;
  };

  const semesterProgress = generateSemesterProgress(user.cgpa, user.semester);

  // Personalized learning goals based on student performance
  const learningGoals = [
    { 
      goal: user.cgpa >= 8.5 ? "Maintain CGPA above 9.0" : "Achieve CGPA above 8.5", 
      current: user.cgpa, 
      target: user.cgpa >= 8.5 ? 9.0 : 8.5, 
      progress: user.cgpa >= 8.5 ? (user.cgpa / 9.0) * 100 : (user.cgpa / 8.5) * 100 
    },
    { 
      goal: "Complete all assignments on time", 
      current: user.cgpa >= 9.0 ? 98 : user.cgpa >= 8.5 ? 95 : user.cgpa >= 8.0 ? 92 : 88, 
      target: 100, 
      progress: user.cgpa >= 9.0 ? 98 : user.cgpa >= 8.5 ? 95 : user.cgpa >= 8.0 ? 92 : 88 
    },
    { 
      goal: "Attend 90% of classes", 
      current: user.cgpa >= 9.0 ? 96 : user.cgpa >= 8.5 ? 94 : user.cgpa >= 8.0 ? 91 : 88, 
      target: 90, 
      progress: Math.min(100, (user.cgpa >= 9.0 ? 96 : user.cgpa >= 8.5 ? 94 : user.cgpa >= 8.0 ? 91 : 88) / 90 * 100)
    },
    { 
      goal: `Complete ${user.semester >= 4 ? 3 : 2} projects this semester`, 
      current: user.cgpa >= 8.5 ? (user.semester >= 4 ? 2 : 1) : (user.semester >= 4 ? 1 : 0), 
      target: user.semester >= 4 ? 3 : 2, 
      progress: user.cgpa >= 8.5 ? (user.semester >= 4 ? 67 : 50) : (user.semester >= 4 ? 33 : 0) 
    }
  ];

  const overallProgress = courseProgress.length > 0 ? Math.round(courseProgress.reduce((sum, course) => sum + course.completion, 0) / courseProgress.length) : 0;
  const totalCredits = courseProgress.reduce((sum, course) => sum + course.credits, 0);
  const completedCredits = courseProgress.filter(course => course.completion === 100).reduce((sum, course) => sum + course.credits, 0);

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Academic Progress</h1>
            <p className="text-dark-secondary mt-2">Track your learning journey and achievements</p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            {overallProgress}% Complete
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Current CGPA</p>
                  <p className="text-3xl font-bold text-dark-primary">{user.cgpa}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Credits Completed</p>
                  <p className="text-3xl font-bold text-dark-primary">{completedCredits}/{totalCredits}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Semester Progress</p>
                  <p className="text-3xl font-bold text-dark-primary">{overallProgress}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Current Semester</p>
                  <p className="text-3xl font-bold text-dark-primary">{user.semester}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CGPA Trend */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">CGPA Progression</CardTitle>
              <CardDescription className="text-dark-secondary">Your academic performance over semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={semesterProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="semester" stroke="#94A3B8" />
                  <YAxis domain={[7, 10]} stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Line type="monotone" dataKey="cgpa" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Current Course Progress */}
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Current Courses</CardTitle>
              <CardDescription className="text-dark-secondary">Progress in ongoing courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-dark-primary">{course.course}</span>
                      <Badge className={`text-xs ${
                        course.grade.startsWith('A') ? 'bg-green-500/20 text-green-400' :
                        course.grade.startsWith('B') ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {course.grade}
                      </Badge>
                    </div>
                    <span className="text-sm text-dark-secondary">{course.completion}%</span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-dark-secondary">
                    <span>{course.credits} credits</span>
                    <span className={course.completion === 100 ? "text-green-400" : "text-orange-400"}>
                      {course.completion === 100 ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Learning Goals */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Learning Goals Progress
            </CardTitle>
            <CardDescription className="text-dark-secondary">Track your academic objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningGoals.map((goal, index) => (
                <div key={index} className="p-4 bg-dark-hover rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-dark-primary">{goal.goal}</h4>
                    <Badge className={`${
                      goal.progress >= 100 ? 'bg-green-500/20 text-green-400' :
                      goal.progress >= 75 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {Math.round(goal.progress)}%
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-dark-secondary">
                    <span>Current: {goal.current}</span>
                    <span>Target: {goal.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Development */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Skills Development
            </CardTitle>
            <CardDescription className="text-dark-secondary">Your skill progression across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillProgress.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dark-primary">{skill.skill}</p>
                      <p className="text-xs text-dark-secondary">{skill.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-dark-primary">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                  <div className="text-xs text-dark-secondary">
                    {skill.level >= 85 ? "Expert" : skill.level >= 70 ? "Proficient" : skill.level >= 50 ? "Intermediate" : "Beginner"}
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