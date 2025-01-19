import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ChevronRight,
  BookOpen,
  Target,
  Briefcase,
  Code,
  Users,
  PenTool,
  BarChart,
  Lock
} from 'lucide-react';

const CareerGuidancePlatform = () => {
  const [currentStep, setCurrentStep] = useState('login');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skillScores, setSkillScores] = useState({
    technical: 0,
    communication: 0,
    problemSolving: 0,
    leadership: 0,
    creativity: 0,
    analytical: 0,
  });

  const handleAuth = () => {
    if (isSignup) {
      console.log(`Sign up with Email: ${email}`);
    } else {
      console.log(`Log in with Email: ${email}`);
    }
    setUser({ email });
    setCurrentStep('assessment');
  };

  const assessmentQuestions = [
    {
      category: 'technical',
      question: 'How comfortable are you with computer programming?',
      options: [
        { value: '1', label: 'No experience' },
        { value: '2', label: 'Basic understanding' },
        { value: '3', label: 'Intermediate level' },
        { value: '4', label: 'Advanced proficiency' },
      ],
    },
    {
      category: 'technical',
      question: 'What is your experience with databases?',
      options: [
        { value: '1', label: 'Never used any' },
        { value: '2', label: 'Basic SQL queries' },
        { value: '3', label: 'Complex queries and optimization' },
        { value: '4', label: 'Advanced database design' },
      ],
    },
    {
      category: 'problemSolving',
      question: 'How do you approach debugging complex issues?',
      options: [
        { value: '1', label: 'Need significant guidance' },
        { value: '2', label: 'Can solve with help' },
        { value: '3', label: 'Independent problem solver' },
        { value: '4', label: 'Expert troubleshooter' },
      ],
    },
    {
      category: 'communication',
      question: 'How comfortable are you with technical presentations?',
      options: [
        { value: '1', label: 'Very uncomfortable' },
        { value: '2', label: 'Somewhat comfortable' },
        { value: '3', label: 'Generally confident' },
        { value: '4', label: 'Very confident' },
      ],
    },
    {
      category: 'leadership',
      question: 'How experienced are you in leading technical teams?',
      options: [
        { value: '1', label: 'No leadership experience' },
        { value: '2', label: 'Led small projects' },
        { value: '3', label: 'Regular team leadership' },
        { value: '4', label: 'Extensive leadership experience' },
      ],
    },
  ];

  const calculateSkillScores = () => {
    const scores = { ...skillScores };
    const categoryQuestions = {};

    assessmentQuestions.forEach((q) => {
      categoryQuestions[q.category] = (categoryQuestions[q.category] || 0) + 1;
    });

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions[questionId];
      const weight = 1 / categoryQuestions[question.category];
      scores[question.category] = Math.min(100, scores[question.category] + parseInt(answer) * 25 * weight);
    });

    setSkillScores(scores);
  };

  const getRecommendedCourses = () => {
    const courses = [
      {
        id: 1,
        title: "Full Stack Development",
        category: "technical",
        difficulty: "Intermediate",
        duration: "12 weeks",
        matchScore: skillScores.technical,
        description: "Master modern web development",
        skills: ["React", "Node.js", "SQL", "APIs"],
        icon: <Code className="h-6 w-6" />,
      },
      {
        id: 2,
        title: "Technical Leadership",
        category: "leadership",
        difficulty: "Advanced",
        duration: "8 weeks",
        matchScore: skillScores.leadership,
        description: "Lead technical teams effectively",
        skills: ["Team Management", "Project Planning", "Communication"],
        icon: <Users className="h-6 w-6" />,
      },
      {
        id: 3,
        title: "System Design",
        category: "technical",
        difficulty: "Advanced",
        duration: "10 weeks",
        matchScore: skillScores.technical,
        description: "Design scalable systems",
        skills: ["Architecture", "Scalability", "Performance"],
        icon: <PenTool className="h-6 w-6" />,
      },
    ];

    return courses.sort((a, b) => b.matchScore - a.matchScore);
  };

  const AuthForm = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-500" />
          <CardTitle>{isSignup ? 'Create Account' : 'Log In'}</CardTitle>
        </div>
        <CardDescription>
          {isSignup ? 'Sign up to access personalized course recommendations.' : 'Log in to continue.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleAuth} className="w-full">
          {isSignup ? 'Sign Up' : 'Log In'}
        </Button>
        <div className="text-center text-sm text-gray-500">
          {isSignup ? (
            <span>
              Already have an account?{' '}
              <button className="text-blue-500" onClick={() => setIsSignup(false)}>
                Log In
              </button>
            </span>
          ) : (
            <span>
              Don’t have an account?{' '}
              <button className="text-blue-500" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const SkillAssessment = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          <CardTitle>Skill Assessment</CardTitle>
        </div>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            {assessmentQuestions[currentQuestionIndex].question}
          </h3>
          <RadioGroup
            onValueChange={(value) => {
              setAnswers({
                ...answers,
                [currentQuestionIndex]: value,
              });
            }}
            value={answers[currentQuestionIndex]}
            className="space-y-3"
          >
            {assessmentQuestions[currentQuestionIndex].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentQuestionIndex < assessmentQuestions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
              } else {
                calculateSkillScores();
                setCurrentStep('results');
              }
            }}
            disabled={!answers[currentQuestionIndex]}
          >
            {currentQuestionIndex === assessmentQuestions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const Results = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Your Skill Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(skillScores).map(([skill, score]) => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between">
                <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span>{Math.round(score)}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recommended Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRecommendedCourses().map((course) => (
              <Card key={course.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {course.icon}
                    <Badge variant="secondary">{course.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{course.title}</CardTitle>
                  <CardDescription>{course.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">{course.description}</p>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full">
                        Start Learning
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {currentStep === 'login' ? (
        <AuthForm />
      ) : currentStep === 'assessment' ? (
        <SkillAssessment />
      ) : (
        <Results />
      )}
    </div>
  );
};

export default CareerGuidancePlatform;
