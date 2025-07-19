import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Wrench, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const GenericToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  
  const formatToolName = (id: string) => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to Tools Directory */}
      <Link 
        to="/tools" 
        className="inline-flex items-center px-4 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tools Directory
      </Link>

      {/* Tool Page Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            {toolId ? formatToolName(toolId) : 'Security Tool'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tool Implementation Coming Soon
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              This security tool is part of our comprehensive cybersecurity toolkit. 
              The full implementation is currently in development.
            </p>
            <div className="space-y-3">
              <Button variant="outline" asChild>
                <Link to="/tools">
                  Return to Tools Directory
                </Link>
              </Button>
              <div className="text-sm text-gray-500">
                Tool ID: {toolId}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericToolPage;