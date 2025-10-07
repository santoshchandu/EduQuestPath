import { useState } from "react";
import { Search, Filter, Download, Users, Mail, GraduationCap, Award, X, User, Phone, MapPin, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { STUDENTS_DATA, Student } from "../StudentData";

interface TeacherStudentsPageProps {
  user: any;
}

// Generate attendance percentage for each student
const generateAttendancePercentage = (rollNo: string) => {
  const seed = parseInt(rollNo.slice(-3));
  return Math.min(95, Math.max(75, 80 + (seed % 16)));
};

// Generate performance rating based on CGPA
const getPerformanceRating = (cgpa: number) => {
  if (cgpa >= 9.0) return "Outstanding";
  if (cgpa >= 8.5) return "Excellent";
  if (cgpa >= 8.0) return "Very Good";
  if (cgpa >= 7.5) return "Good";
  if (cgpa >= 7.0) return "Satisfactory";
  return "Needs Improvement";
};

export function TeacherStudentsPage({ user }: TeacherStudentsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const departments = Array.from(new Set(STUDENTS_DATA.map(student => student.department)));
  const semesters = Array.from(new Set(STUDENTS_DATA.map(student => student.semester))).sort();

  const filteredStudents = STUDENTS_DATA.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm);
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesSemester = selectedSemester === "all" || student.semester.toString() === selectedSemester;
    
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const totalStudents = STUDENTS_DATA.length;
  const highPerformers = STUDENTS_DATA.filter(student => student.cgpa >= 8.5).length;
  const averageCGPA = (STUDENTS_DATA.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(2);

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setShowProfile(true);
  };

  const handleSendMail = (student: Student) => {
    window.open(`mailto:${student.email}?subject=Regarding Academic Progress&body=Dear ${student.name},%0D%0A%0D%0ARegards,%0D%0A${user.name}`, '_blank');
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Student Management</h1>
            <p className="text-dark-secondary mt-2">Manage and track student performance</p>
          </div>
          <Button className="dark-button-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Students
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <p className="text-sm text-dark-secondary">High Performers (8.5+ CGPA)</p>
                  <p className="text-3xl font-bold text-dark-primary">{highPerformers}</p>
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
                  <p className="text-sm text-dark-secondary">Average CGPA</p>
                  <p className="text-3xl font-bold text-dark-primary">{averageCGPA}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Student Directory</CardTitle>
            <CardDescription className="text-dark-secondary">Search and filter students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
                <Input
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-dark-color">
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-dark-color">
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="dark-button-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="bg-dark-card border-dark-color">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-dark-color hover:bg-dark-hover">
                    <TableHead className="text-dark-secondary">Roll Number</TableHead>
                    <TableHead className="text-dark-secondary">Name</TableHead>
                    <TableHead className="text-dark-secondary">Department</TableHead>
                    <TableHead className="text-dark-secondary">Semester</TableHead>
                    <TableHead className="text-dark-secondary">CGPA</TableHead>
                    <TableHead className="text-dark-secondary">Performance</TableHead>
                    <TableHead className="text-dark-secondary">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.rollNo} className="border-dark-color hover:bg-dark-hover">
                      <TableCell className="text-dark-primary font-medium">{student.rollNo}</TableCell>
                      <TableCell className="text-dark-primary">{student.name}</TableCell>
                      <TableCell className="text-dark-secondary">{student.department}</TableCell>
                      <TableCell className="text-dark-secondary">{student.semester}</TableCell>
                      <TableCell className="text-dark-primary font-semibold">{student.cgpa}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            student.cgpa >= 9.0 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : student.cgpa >= 8.0
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : student.cgpa >= 7.0
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          {student.cgpa >= 9.0 ? 'Excellent' : 
                           student.cgpa >= 8.0 ? 'Good' : 
                           student.cgpa >= 7.0 ? 'Average' : 'Needs Attention'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            className="dark-button-secondary"
                            onClick={() => handleSendMail(student)}
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="dark-button-secondary"
                            onClick={() => handleViewProfile(student)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                <p className="text-dark-secondary">No students found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Student Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-dark-primary text-2xl">Student Profile</DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Detailed information about the student
                </DialogDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowProfile(false)}
                className="text-dark-secondary hover:text-dark-primary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Header */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-primary">{selectedStudent.name}</h3>
                  <p className="text-dark-secondary">Roll No: {selectedStudent.rollNo}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {selectedStudent.department}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Semester {selectedStudent.semester}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-dark-secondary">Current CGPA</p>
                        <p className="text-2xl font-bold text-dark-primary">{selectedStudent.cgpa}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-dark-secondary">Performance</p>
                        <p className="text-lg font-bold text-dark-primary">{getPerformanceRating(selectedStudent.cgpa)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-dark-secondary">Attendance</p>
                        <p className="text-lg font-bold text-dark-primary">{generateAttendancePercentage(selectedStudent.rollNo)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm text-dark-secondary">Email</p>
                        <p className="text-sm font-medium text-dark-primary">{selectedStudent.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-dark-color">
                <Button 
                  className="dark-button-primary flex-1"
                  onClick={() => handleSendMail(selectedStudent)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button className="dark-button-secondary flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Parent
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}