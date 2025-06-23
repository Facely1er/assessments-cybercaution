import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { PieChart, CheckCircle, AlertTriangle, Download, FileOutput, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionScore {
  title: string;
  percentage: number;
  completed: boolean;
}

interface ResultData {
  overallScore: number;
  sectionScores: SectionScore[];
  assessmentType: 'ransomware' | 'supplychain' | 'cui' | 'privacy';
  frameworkName: string;
  completedDate: string;
}

interface AssessmentResultsProps {
  data: ResultData;
  onExport: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ data, onExport }) => {
  // Helper functions
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-secure-green';
    if (score >= 60) return 'text-electric-blue';
    if (score >= 40) return 'text-warning-amber';
    return 'text-critical-red';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-secure-green/10';
    if (score >= 60) return 'bg-electric-blue/10';
    if (score >= 40) return 'bg-warning-amber/10';
    return 'bg-critical-red/10';
  };

  const getSeverityText = (score: number) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 60) return 'Moderate Risk';
    if (score >= 40) return 'High Risk';
    return 'Critical Risk';
  };

  const frameworkLogos = {
    'ransomware': <AlertTriangle className="h-12 w-12 text-critical-red" />,
    'supplychain': <CheckCircle className="h-12 w-12 text-electric-blue" />,
    'cui': <FileOutput className="h-12 w-12 text-secondary" />,
    'privacy': <Info className="h-12 w-12 text-accent" />
  };

  return (
    <div>
      <Card className="mb-6 border dark:border-muted">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {frameworkLogos[data.assessmentType]}
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Assessment Results</CardTitle>
                <p className="text-muted-foreground">{data.frameworkName} • {data.completedDate}</p>
              </div>
            </div>
            <Button onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export to PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pale-blue dark:bg-dark-surface rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className={`text-6xl font-bold ${getScoreColor(data.overallScore)}`}>{data.overallScore}%</div>
                  <div className={`text-sm font-medium mt-1 ${getScoreColor(data.overallScore)}`}>{getSeverityText(data.overallScore)}</div>
                  
                  {/* Circular progress indicator */}
                  <svg className="absolute -top-4 -left-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      className="fill-none stroke-muted stroke-[5%]"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      className={`fill-none ${getScoreColor(data.overallScore)} stroke-[5%]`}
                      strokeDasharray={`${data.overallScore} 100`}
                    />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-foreground">Overall Compliance Score</div>
                </div>
                
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${getScoreBackground(data.overallScore)}`} 
                    style={{ width: `${data.overallScore}%` }}>
                  </div>
                </div>
              </div>

              {data.overallScore < 70 && (
                <div className="mt-4 p-3 bg-warning-amber/10 dark:bg-warning-amber/20 rounded-lg flex items-center text-sm">
                  <AlertTriangle className="h-4 w-4 text-warning-amber mr-2" />
                  <div>
                    <span className="font-medium">Action required.</span> Your assessment indicates gaps that should be addressed.
                  </div>
                </div>
              )}

              <div className="mt-4">
                <Link to={`/${data.assessmentType}-recommendations`}>
                  <Button className="w-full">
                    View Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Section Scores</h3>
              <div className="space-y-4">
                {data.sectionScores.map((section, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium text-foreground">{section.title}</div>
                      <div className={`text-sm font-medium ${getScoreColor(section.percentage)}`}>{section.percentage}%</div>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${getScoreBackground(section.percentage)}`} 
                        style={{ width: `${section.percentage}%` }}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border dark:border-muted">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-secure-green" />
                <div className="text-lg font-bold text-secure-green">Strengths</div>
                <div className="text-sm text-muted-foreground">Areas of good compliance</div>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-muted">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-warning-amber" />
                <div className="text-lg font-bold text-warning-amber">Improvement Areas</div>
                <div className="text-sm text-muted-foreground">Areas requiring attention</div>
              </CardContent>
            </Card>
            
            <Card className="border dark:border-muted">
              <CardContent className="p-4 text-center">
                <FileOutput className="h-8 w-8 mx-auto mb-2 text-electric-blue" />
                <div className="text-lg font-bold text-electric-blue">Documentation</div>
                <div className="text-sm text-muted-foreground">Evidence requirements</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export { AssessmentResults }