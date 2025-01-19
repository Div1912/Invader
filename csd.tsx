import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Target, Trophy, UserCircle, ChevronRight, BarChart, Brain, Code, PenTool, Users } from 'lucide-react';

const CareerGuidancePlatform = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [currentStep, setCurrentStep] = useState('assessment');
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skillScores, setSkillScores] = useState({
    technical: 0,
    communication: 0,
    problemSolving: 0,
    leadership: 0,
    creativity: 0,
    analytical: 0
  });

  // Comprehensive skill assessment questions
  const assessmentQuestions = [
    {
      category: 'technical',
      question: 'How comfortable are you with using computer programming languages?',
      options: [
        { value: '1', label: 'No experience' },
        { value: '2', label: 'Basic understanding' },
        { value: '3', label: 'Intermediate level' },
        { value: '4', label: 'Advanced proficiency' }
      ]
    },
    {
      category: 'communication',
      question: 'How would you rate your ability to explain complex ideas to others?',
      options: [
        { value: '1', label: 'Need significant improvement' },
        { value: '2', label: 'Can manage basic communication' },
        { value: '3', label: 'Good at explaining most concepts' },
        { value: '4', label: 'Excellent communicator' }
      ]
    },
    {
      category: 'problemSolving',
      question: 'When faced with a complex problem, how do you typically approach it?',
      options: [
        { value: '1', label: 'Often feel overwhelmed' },
        { value: '2', label: 'Can solve with guidance' },
        { value: '3', label: 'Methodically break it down' },
        { value: '4', label: 'Effectively solve most problems' }
      ]
    },
    // Add more questions for comprehensive assessment
  ];

  const courseRecommendations = [
    {
      id: 1,
      title: "Python Programming Fundamentals",
      category: "technical",
      difficulty: "beginner",
      duration: "8 weeks",
      matchScore: 95,
      skills: ["Python", "Basic Algorithms", "Data Structures"],
      description: "Perfect for beginners looking to start their programming journey",
      modules: [
        "Introduction to Python",
        "Variables and Data Types",
        "Control Structures",
        "Functions and Modules"
      ]
    },
    {
      id: 2,
      title: "Business Communication Mastery",
      category: "communication",
      difficulty: "intermediate",
      duration: "6 weeks",
      matchScore: 88,
      skills: ["Public Speaking", "Written Communication", "Presentation Skills"],
      description: "Enhance your professional communication abilities",
      modules: [
        "Effective Presentations",
        "Business Writing",
        "Public Speaking",
        "Meeting Management"
      ]
    }
    // More course recommendations based on assessment
  ];

  const careerPaths = [
    {
      title: "Software Developer",
      demand: "High",
      growthRate: "15% annually",
      salary: "₹5-12 LPA",
      requiredSkills: ["Programming", "Problem Solving", "System Design"],
      recommendation: 92,
      jobOpportunities: ["Full Stack Developer", "Mobile App Developer", "Backend Engineer"]
    },
    {
      title: "Data Analyst",
      demand: "Growing",
      growthRate: "12% annually",
      salary: "₹4-10 LPA",
      requiredSkills: ["SQL", "Data Visualization", "Statistical Analysis"],
      recommendation: 85,
      jobOpportunities: ["Business Analyst", "Data Scientist", "Market Research Analyst"]
    }
    // More career paths
  ];

  const calculateSkillScores = () => {
    // Algorithm to calculate skill scores based on answers
    const scores = { ...skillScores };
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions[questionId];
      scores[question.category] += parseInt(answer) * 25; // Scale to 100
    });
    setSkillScores(scores);
  };

  const getRecommendedCourses = () => {
    // Algorithm to match courses based on skill gaps
    return courseRecommendations.filter(course => {
      const relevantSkillScore = skillScores[course.category];
      return relevantSkillScore < 70; // Recommend courses for skills below 70%
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const SkillAssessment = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Skill Assessment Test</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-lg font-medium">
            {assessmentQuestions[currentQuestionIndex].question}
          </h3>
          <RadioGroup
            onValueChange={(value) => {
              setAnswers({
                ...answers,
                [currentQuestionIndex]: value
              });
            }}
            value={answers[currentQuestionIndex]}
          >
            {assessmentQuestions[currentQuestionIndex].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentQuestionIndex < assessmentQuestions.length - 1) {
                  setCurrentQuestionIndex(prev => prev + 1);
                } else {
                  calculateSkillScores();
                  setAssessmentComplete(true);
                  setCurrentStep('dashboard');
                }
              }}
            >
              {currentQuestionIndex === assessmentQuestions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Brain className="h-4 w-4" />
            <CardTitle className="text-lg">Skill Assessment Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(skillScores).map(([skill, score]) => (
                <div key={skill} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{skill}</span>
                    <span>{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {getRecommendedCourses().map((course) => (
          <Card key={course.id} className="relative">
            <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
              {course.matchScore}% Match
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.duration} • {course.difficulty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">{course.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full">
                  Start Course
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {careerPaths.map((career, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{career.title}</h3>
                    <p className="text-sm text-gray-500">
                      Demand: {career.demand} • Growth: {career.growthRate}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {career.recommendation}% Match
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Job Opportunities:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {career.jobOpportunities.map((job, idx) => (
                        <li key={idx}>{job}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Explore Career Path
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {!isLoggedIn ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Career Guidance Platform</CardTitle>
            <CardDescription>Sign in to start your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <div className="space-y-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                  <Button 
                    className="w-full" 
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Login
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="space-y-4">
                  <Input placeholder="Full Name" />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                  <Input type="password" placeholder="Confirm Password" />
                  <Button 
                    className="w-full"
                    onClick={() => setActiveTab('login')}
                  >
                    Sign Up
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        currentStep === 'assessment' ? <SkillAssessment /> : <Dashboard />
      )}
    </div>
  );
};

export default CareerGuidancePlatform;
