import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { authenticateTeacher } from "./TeacherData";

interface TeacherLoginProps {
  onLogin: (teacher: any) => void;
  onBack: () => void;
}

export function TeacherLogin({ onLogin, onBack }: TeacherLoginProps) {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const teacher = authenticateTeacher(teacherId, password);
      if (teacher) {
        onLogin(teacher);
      } else {
        setError("Invalid teacher ID or password. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-dark-secondary hover:text-dark-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Button>

        {/* Login Card */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-dark-primary">Teacher Portal</CardTitle>
              <CardDescription className="text-dark-secondary mt-2">
                Enter your credentials to access the teacher dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Teacher ID */}
              <div className="space-y-2">
                <Label htmlFor="teacherId" className="text-dark-primary">Teacher ID</Label>
                <Input
                  id="teacherId"
                  type="text"
                  placeholder="Enter your teacher ID (e.g., 2001)"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="bg-dark-bg border-dark-color text-dark-primary placeholder:text-dark-secondary focus:border-dark-cta"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-dark-primary">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-dark-bg border-dark-color text-dark-primary placeholder:text-dark-secondary focus:border-dark-cta pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-dark-secondary" />
                    ) : (
                      <Eye className="h-4 w-4 text-dark-secondary" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}



              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full dark-button-primary"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Help Text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-dark-secondary">
                Need access? Contact{" "}
                <a href="mailto:admin@eduquest.edu" className="text-dark-cta hover:underline">
                  Administrator
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}