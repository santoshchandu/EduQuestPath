import { GraduationCap, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface PortalSelectionProps {
  onPortalSelect: (portal: "student" | "teacher") => void;
}

export function PortalSelection({ onPortalSelect }: PortalSelectionProps) {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-500 rounded-3xl flex items-center justify-center dark-shadow-lg relative overflow-hidden">
              <span className="text-white font-bold text-4xl relative z-10">EQ</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-dark-primary mb-4">EduQuest Path</h1>
          <p className="text-xl text-dark-secondary">Learning Management Platform</p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Student Portal */}
          <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-all duration-300 cursor-pointer group" onClick={() => onPortalSelect("student")}>
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-dark-primary">Student Portal</CardTitle>
              <CardDescription className="text-dark-secondary mt-2">
                Access your courses, assignments, grades, and connect with classmates
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full dark-button-primary">
                Continue as Student
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Portal */}
          <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-all duration-300 cursor-pointer group" onClick={() => onPortalSelect("teacher")}>
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-dark-primary">Teacher Portal</CardTitle>
              <CardDescription className="text-dark-secondary mt-2">
                Manage students, track progress, create assignments, and view analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full dark-button-primary">
                Continue as Teacher
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-dark-secondary">
            Need help? Contact support at{" "}
            <a href="mailto:support@eduquestpath.com" className="text-dark-cta hover:underline">
              support@eduquestpath.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}