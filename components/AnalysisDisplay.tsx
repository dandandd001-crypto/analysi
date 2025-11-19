
import React from 'react';

interface AnalysisDisplayProps {
  analysis: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded"></div>
        <div className="h-4 bg-gray-600 rounded"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2 mt-6"></div>
        <div className="h-4 bg-gray-600 rounded"></div>
        <div className="h-4 bg-gray-600 rounded w-4/5"></div>
    </div>
);

const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3v18h18"></path>
        <path d="M18.7 8a6 6 0 0 0-6-6"></path>
        <path d="M12.7 14a6 6 0 0 0-6-6"></path>
        <path d="M6.7 20a6 6 0 0 0-6-6"></path>
    </svg>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">Generating AI Analysis...</h3>
            <LoadingSkeleton />
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center">
             <h3 className="text-xl font-semibold text-brand-secondary mb-2">Analysis Failed</h3>
             <p className="text-dark-text-secondary">{error}</p>
        </div>
      );
    }
    if (analysis) {
        return (
            <div>
                <h3 className="text-2xl font-bold mb-4 text-brand-primary">AI Matchup Analysis</h3>
                <div className="prose prose-invert prose-p:text-dark-text-primary prose-strong:text-dark-text-primary space-y-4 whitespace-pre-wrap">
                    {analysis.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        );
    }
    return (
      <div className="text-center py-16">
        <ChartIcon className="mx-auto h-12 w-12 text-gray-500" />
        <h3 className="mt-2 text-xl font-semibold text-dark-text-primary">Ready to Analyze</h3>
        <p className="mt-1 text-base text-dark-text-secondary">Select two teams and click "Analyze Matchup" to see the AI-powered breakdown.</p>
      </div>
    );
  };

  return (
    <div className="w-full bg-dark-card p-6 md:p-8 rounded-xl shadow-lg border border-gray-700/50 min-h-[300px] flex flex-col justify-center">
      {renderContent()}
    </div>
  );
};
