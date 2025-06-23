import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  GraduationCap, 
  Play, 
  Users, 
  Clock, 
  CheckCircle, 
  FileText,
  AlertTriangle,
  Search,
  Star,
  BookOpen,
  ArrowRight,
  UserCheck,
  Activity,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const trainingCategories = [
    { id: 'all', name: 'All Courses' },
    { id: 'awareness', name: 'Security Awareness' },
    { id: 'ransomware', name: 'Ransomware Protection' },
    { id: 'incident', name: 'Incident Response' },
    { id: 'compliance', name: 'Compliance' },
  ];

  const courses = [
    {
      id: 'course-1',
      title: 'Ransomware Defense Fundamentals',
      description: 'Learn the basics of ransomware defense for your organization',
      category: 'ransomware',
      duration: '2 hours',
      level: 'Beginner',
      modules: 5,
      completed: 0,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
      popular: true
    },
    {
      id: 'course-2',
      title: 'Phishing Awareness Training',
      description: 'Learn to identify and avoid phishing attempts that lead to ransomware',
      category: 'awareness',
      duration: '1.5 hours',
      level: 'Beginner',
      modules: 4,
      completed: 2,
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
      popular: true
    },
    {
      id: 'course-3',
      title: 'Ransomware Incident Response',
      description: 'Advanced training on responding to ransomware incidents',
      category: 'incident',
      duration: '3 hours',
      level: 'Advanced',
      modules: 6,
      completed: 0,
      image: 'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg',
      popular: false
    },
    {
      id: 'course-4',
      title: 'NIST CSF Implementation',
      description: 'Align your organization with NIST Cybersecurity Framework',
      category: 'compliance',
      duration: '4 hours',
      level: 'Intermediate',
      modules: 8,
      completed: 0,
      image: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg',
      popular: false
    },
    {
      id: 'course-5',
      title: 'Secure Remote Work Practices',
      description: 'Security best practices for remote and hybrid workers',
      category: 'awareness',
      duration: '2 hours',
      level: 'Beginner',
      modules: 5,
      completed: 5,
      image: 'https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg',
      popular: false
    },
    {
      id: 'course-6',
      title: 'Data Backup and Recovery',
      description: 'Best practices for ransomware-resistant backup strategies',
      category: 'ransomware',
      duration: '2.5 hours',
      level: 'Intermediate',
      modules: 6,
      completed: 0,
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      popular: true
    },
  ];

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage === 0) return 'bg-muted';
    if (percentage === 100) return 'bg-secure-green';
    return 'bg-electric-blue';
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Security Training</h1>
          <p className="text-muted-foreground">Build organizational resilience with comprehensive training</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Enroll Team
          </Button>
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Training Reports
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="md:col-span-2 overflow-x-auto">
              <div className="flex space-x-2">
                {trainingCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-electric-blue/10 text-electric-blue mr-3">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-muted-foreground">Available Courses</div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-electric-blue/10 text-electric-blue mr-3">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-secure-green/10 text-secure-green mr-3">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-warning-amber/10 text-warning-amber mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.filter(course => course.popular).map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.completed > 0 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {course.completed === course.modules ? 'Completed' : `${Math.round((course.completed / course.modules) * 100)}% Complete`}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <h3 className="font-medium mb-1">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{course.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs text-muted-foreground">{course.modules} modules</div>
                  <div className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {course.level}
                  </div>
                </div>
                
                <div className="w-full bg-muted h-1.5 rounded-full mb-3">
                  <div 
                    className={`h-1.5 rounded-full ${getProgressColor(course.completed, course.modules)}`} 
                    style={{ width: `${(course.completed / course.modules) * 100}%` }}
                  ></div>
                </div>
                
                <Button className="w-full">
                  {course.completed > 0 && course.completed < course.modules ? 'Continue Course' : 'Start Course'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-40 h-32 flex-shrink-0">
                      <img 
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-2">
                          {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                        </span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          {course.level}
                        </span>
                        {course.popular && (
                          <span className="ml-2 text-xs bg-warning-amber/10 text-warning-amber px-2 py-0.5 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                      
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{course.duration}</span>
                        <span className="mx-2">•</span>
                        <BookOpen className="h-3.5 w-3.5 mr-1" />
                        <span>{course.modules} modules</span>
                      </div>
                      
                      <div className="w-full bg-muted h-1.5 rounded-full mb-3">
                        <div 
                          className={`h-1.5 rounded-full ${getProgressColor(course.completed, course.modules)}`} 
                          style={{ width: `${(course.completed / course.modules) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-end gap-2">
                      <Button>
                        {course.completed > 0 && course.completed < course.modules ? 'Continue' : 'Start'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline">Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Training Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <GraduationCap className="h-6 w-6 text-primary mr-2" />
                <h3 className="font-medium">Security Awareness Program</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive security awareness program for your entire organization.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <FileText className="h-6 w-6 text-primary mr-2" />
                <h3 className="font-medium">Training Materials</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Download training materials for offline use and presentations.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Download Materials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Play className="h-6 w-6 text-primary mr-2" />
                <h3 className="font-medium">Video Library</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Access our library of security training videos.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Browse Videos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingPage;