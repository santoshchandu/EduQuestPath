import { useState } from "react";
import { HelpCircle, Search, Phone, Mail, MessageCircle, Book, Settings, User, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface StudentHelpCenterPageProps {
  user: any;
}

const faqCategories = [
  {
    category: "Academic",
    questions: [
      {
        question: "How do I check my current CGPA?",
        answer: "You can view your current CGPA on the main dashboard or in the Progress section. It's also displayed in your profile."
      },
      {
        question: "Where can I find my course schedules?",
        answer: "Course schedules are available in the Courses section. You can also see upcoming classes on your dashboard."
      },
      {
        question: "How do I submit assignments?",
        answer: "Go to the Upcoming Assignments section, find your assignment, and click 'Submit Work' to upload your files."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        question: "I can't log in to my account",
        answer: "Make sure you're using your correct roll number and password format (Student@last3digits). Contact IT support if issues persist."
      },
      {
        question: "The system is running slowly",
        answer: "Try clearing your browser cache or using a different browser. Report persistent issues to technical support."
      },
      {
        question: "I can't download course materials",
        answer: "Check your internet connection and ensure you have sufficient storage space. Some files may require specific software to open."
      }
    ]
  },
  {
    category: "Account",
    questions: [
      {
        question: "How do I update my profile information?",
        answer: "Go to My Account section and click on 'Edit Profile' to update your personal information."
      },
      {
        question: "Can I change my password?",
        answer: "Yes, you can change your password in the My Account section under Security Settings."
      },
      {
        question: "How do I reset my password?",
        answer: "Use the 'Forgot Password' link on the login page or contact the IT helpdesk for assistance."
      }
    ]
  }
];

const contactOptions = [
  {
    type: "Academic Support",
    icon: Book,
    contact: "academic.support@eduquest.edu",
    phone: "+91 80 1234 5678",
    hours: "Mon-Fri, 9:00 AM - 5:00 PM",
    description: "For questions about courses, grades, and academic policies"
  },
  {
    type: "Technical Support",
    icon: Settings,
    contact: "tech.support@eduquest.edu",
    phone: "+91 80 1234 5679",
    hours: "24/7 Support Available",
    description: "For login issues, system problems, and technical difficulties"
  },
  {
    type: "Student Services",
    icon: User,
    contact: "student.services@eduquest.edu",
    phone: "+91 80 1234 5680",
    hours: "Mon-Fri, 8:00 AM - 6:00 PM",
    description: "For general inquiries and student welfare matters"
  }
];

const quickActions = [
  { title: "Report a Bug", icon: Settings, description: "Report technical issues or bugs" },
  { title: "Request Feature", icon: MessageCircle, description: "Suggest new features or improvements" },
  { title: "Academic Query", icon: Book, description: "Get help with academic matters" },
  { title: "Live Chat", icon: MessageCircle, description: "Chat with support team" }
];

export function StudentHelpCenterPage({ user }: StudentHelpCenterPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleQuestion = (question: string) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Help Center</h1>
            <p className="text-dark-secondary mt-2">Get support and find answers to your questions</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
            <HelpCircle className="w-4 h-4 mr-2" />
            Support Available
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Search */}
        <Card className="bg-dark-card border-dark-color">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold text-dark-primary">How can we help you?</h2>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-5 h-5" />
                <Input
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-dark-bg border-dark-color text-dark-primary text-center"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-dark-primary mb-2">{action.title}</h3>
                  <p className="text-sm text-dark-secondary">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-dark-secondary">Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqCategories.map((category) => (
              <div key={category.category} className="border border-dark-color rounded-lg">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-dark-hover transition-colors"
                >
                  <h3 className="font-semibold text-dark-primary">{category.category} Questions</h3>
                  {expandedCategory === category.category ? (
                    <ChevronDown className="w-5 h-5 text-dark-secondary" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-dark-secondary" />
                  )}
                </button>
                
                {expandedCategory === category.category && (
                  <div className="border-t border-dark-color">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-dark-color last:border-b-0">
                        <button
                          onClick={() => toggleQuestion(`${category.category}-${index}`)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-dark-hover transition-colors"
                        >
                          <span className="text-dark-primary">{faq.question}</span>
                          {expandedQuestion === `${category.category}-${index}` ? (
                            <ChevronDown className="w-4 h-4 text-dark-secondary" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-dark-secondary" />
                          )}
                        </button>
                        
                        {expandedQuestion === `${category.category}-${index}` && (
                          <div className="px-4 pb-4">
                            <p className="text-dark-secondary">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-dark-card border-dark-color">
          <CardHeader>
            <CardTitle className="text-dark-primary">Contact Support</CardTitle>
            <CardDescription className="text-dark-secondary">Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {contactOptions.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-dark-hover rounded-lg">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-primary mb-2">{contact.type}</h3>
                      <p className="text-sm text-dark-secondary mb-3">{contact.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-dark-secondary" />
                          <span className="text-dark-secondary">{contact.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-dark-secondary" />
                          <span className="text-dark-secondary">{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-dark-secondary">{contact.hours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button className="dark-button-secondary">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button className="dark-button-primary">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-dark-primary">Still need help?</h3>
              <p className="text-dark-secondary">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button className="dark-button-primary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button className="dark-button-secondary">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}