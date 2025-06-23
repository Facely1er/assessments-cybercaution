import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { useGuide } from '../../context/GuideContext';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface GuideProgressProps {
  guideId: string;
  currentSection: string;
  sections: {
    id: string;
    title: string;
    items: string[];
  }[];
  onComplete: () => void;
}

export const GuideProgress: React.FC<GuideProgressProps> = ({
  guideId,
  currentSection,
  sections = [],
  onComplete
}) => {
  const { getGuideProgress, markSectionComplete, getSectionProgress } = useGuide();
  const progress = getGuideProgress(guideId);

  const handleComplete = () => {
    markSectionComplete(guideId, currentSection);
    onComplete();
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-electric-blue mr-2" />
            <span className="font-medium">Progress</span>
          </div>
          <span className="text-2xl font-bold">{progress}%</span>
        </div>

        <div className="w-full bg-muted h-2 rounded-full mb-6">
          <div 
            className="h-2 rounded-full bg-electric-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-6 mb-6">
          {sections?.map((section) => (
            <div key={section.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">{section.title}</h3>
                {getSectionProgress(guideId, section.id) ? (
                  <CheckCircle className="h-4 w-4 text-secure-green" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                )}
              </div>
              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item}</span>
                    <input 
                      type="checkbox"
                      checked={getSectionProgress(guideId, section.id)}
                      readOnly
                      className="h-4 w-4 rounded border-muted-foreground text-electric-blue focus:ring-electric-blue"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={handleComplete}
          disabled={getSectionProgress(guideId, currentSection)}
        >
          {getSectionProgress(guideId, currentSection) ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </>
          ) : (
            <>
              Complete Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};