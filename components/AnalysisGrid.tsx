
import React from 'react';
import { AnalysisResult, Match } from '../types';

interface AnalysisGridProps {
  match: Match;
  analysis: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        <div className="col-span-full h-24 bg-gray-700 rounded-lg mb-4"></div>
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded-lg"></div>
        ))}
    </div>
);

const MarketCell: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = 'bg-brand-primary' }) => (
    <div className="bg-dark-card p-3 rounded-lg border border-gray-700/50 relative overflow-hidden group hover:border-gray-600 transition-all">
        <div className="flex justify-between items-center mb-2 z-10 relative">
            <span className="text-xs md:text-sm font-medium text-dark-text-secondary">{label}</span>
            <span className="text-sm md:text-base font-bold text-dark-text-primary">{value ? value.toFixed(0) : 0}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className={`${color} h-1.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${value || 0}%` }}></div>
        </div>
    </div>
);

const ScorePredictionCard: React.FC<{ score: string }> = ({ score }) => (
    <div className="col-span-1 md:col-span-full bg-gradient-to-r from-gray-800 to-dark-card p-6 rounded-xl border border-gray-700 shadow-xl flex flex-col items-center justify-center mb-6">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-2">Projected Score</span>
        <span className="text-4xl md:text-6xl font-bold text-white tracking-tighter">{score}</span>
    </div>
);

const FormBadge: React.FC<{ result: string }> = ({ result }) => {
    let bgColor = 'bg-gray-600';
    let label = 'D';

    if (result === 'W') {
        bgColor = 'bg-green-500';
        label = 'W';
    } else if (result === 'L') {
        bgColor = 'bg-red-500';
        label = 'L';
    }

    return (
        <div className={`w-6 h-6 ${bgColor} rounded text-[10px] font-bold text-white flex items-center justify-center uppercase`}>
            {label}
        </div>
    );
};

const TeamForm: React.FC<{ name: string; form: string; align: 'left' | 'right' }> = ({ name, form, align }) => (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'} space-y-1`}>
        <span className="text-xs text-gray-400 uppercase tracking-wider">Form</span>
        <div className="flex space-x-1">
            {form.split('').map((char, i) => (
                <FormBadge key={i} result={char} />
            ))}
        </div>
    </div>
);

export const AnalysisGrid: React.FC<AnalysisGridProps> = ({ match, analysis, isLoading, error }) => {
    
    const renderContent = () => {
        if (isLoading) {
            return <LoadingSkeleton />;
        }
        if (error) {
            return (
                <div className="text-center py-8">
                    <h3 className="text-xl font-semibold text-brand-secondary mb-2">Analysis Failed</h3>
                    <p className="text-dark-text-secondary max-w-md mx-auto">{error}</p>
                </div>
            );
        }
        if (analysis) {
            return (
                <>
                    {/* Stats & H2H Context */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-dark-card/50 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                             <TeamForm name={match.homeTeam.name} form={match.homeTeam.stats.form} align="left" />
                             <div className="text-center px-2">
                                <span className="text-xs text-gray-500 font-mono">VS</span>
                             </div>
                             <TeamForm name={match.awayTeam.name} form={match.awayTeam.stats.form} align="right" />
                        </div>
                        
                        <div className="bg-dark-card/50 p-4 rounded-xl border border-gray-800">
                             <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Last Meetings</h4>
                             <div className="space-y-1">
                                {match.headToHead ? match.headToHead.slice(0,3).map((h2h, i) => (
                                    <div key={i} className="text-xs text-dark-text-primary bg-gray-700/30 px-2 py-1 rounded">
                                        {h2h}
                                    </div>
                                )) : (
                                    <span className="text-xs text-gray-600 italic">Loading history...</span>
                                )}
                             </div>
                        </div>
                    </div>

                    {/* PREDICTED SCORE CARD */}
                    {analysis.predictedScore && (
                        <ScorePredictionCard score={analysis.predictedScore} />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* COLUMN 1: Main Outcomes & Handicap */}
                        <div className="col-span-full md:col-span-1 lg:col-span-1">
                             <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 mt-2">Match Winner (1x2)</h4>
                             <div className="space-y-3 mb-6">
                                <MarketCell label="Home Win" value={analysis.homeWin} />
                                <MarketCell label="Draw" value={analysis.draw} />
                                <MarketCell label="Away Win" value={analysis.awayWin} />
                                <MarketCell label="DNB - Home" value={analysis.dnbHome} />
                                <MarketCell label="DNB - Away" value={analysis.dnbAway} />
                             </div>

                             <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Asian Handicap</h4>
                             <div className="space-y-3">
                                <MarketCell label={`Handicap ${match.homeTeam.name}`} value={analysis.asianHandicapHome || 0} color="bg-purple-500" />
                                <MarketCell label={`Handicap ${match.awayTeam.name}`} value={analysis.asianHandicapAway || 0} color="bg-purple-500" />
                             </div>
                        </div>

                        {/* COLUMN 2: Goals & Team Props */}
                        <div className="col-span-full md:col-span-1 lg:col-span-1">
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 mt-2">Goals Market</h4>
                            <div className="space-y-3 mb-6">
                                <MarketCell label="Over 2.5 Goals" value={analysis.over2_5} />
                                <MarketCell label="Under 2.5 Goals" value={analysis.under2_5} />
                                <MarketCell label="BTTS - Yes" value={analysis.bttsYes} />
                                <MarketCell label="BTTS - No" value={analysis.bttsNo} />
                            </div>

                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Team Goals</h4>
                            <div className="space-y-3">
                                <MarketCell label={`${match.homeTeam.name} Over 1.5`} value={analysis.homeOver1_5Goals || 0} color="bg-green-600" />
                                <MarketCell label={`${match.awayTeam.name} Over 1.5`} value={analysis.awayOver1_5Goals || 0} color="bg-green-600" />
                            </div>
                        </div>

                        {/* COLUMN 3: Props & Half Time */}
                        <div className="col-span-full md:col-span-1 lg:col-span-1">
                             <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 mt-2">Match Props</h4>
                             <div className="space-y-3 mb-6">
                                <MarketCell label="Over 8.5 Corners" value={analysis.over8_5Corners || 0} color="bg-blue-500" />
                                <MarketCell label="Under 8.5 Corners" value={analysis.under8_5Corners || 0} color="bg-blue-500" />
                                <MarketCell label="Over 3.5 Cards" value={analysis.over3_5Cards || 0} color="bg-yellow-500" />
                                <MarketCell label="Under 3.5 Cards" value={analysis.under3_5Cards || 0} color="bg-yellow-500" />
                             </div>

                             <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Half-Time Markets</h4>
                             <div className="space-y-3">
                                <MarketCell label="HT Home Win" value={analysis.htHome || 0} color="bg-indigo-500" />
                                <MarketCell label="HT Draw" value={analysis.htDraw || 0} color="bg-indigo-500" />
                                <MarketCell label="Over 0.5 FH Goals" value={analysis.over0_5FH || 0} color="bg-indigo-500" />
                             </div>
                        </div>
                    </div>
                </>
            );
        }
        return null; 
    };
    
    return (
        <div className="bg-dark-surface p-6 md:p-8 rounded-xl shadow-2xl border border-gray-800 relative">
            <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-6">
                <div className="flex items-center space-x-3">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 md:w-12 md:h-12 object-contain"/>
                    <span className="font-bold text-lg md:text-xl">{match.homeTeam.name}</span>
                </div>
                <span className="text-2xl font-light text-dark-text-secondary">vs</span>
                <div className="flex items-center space-x-3">
                    <span className="font-bold text-lg md:text-xl">{match.awayTeam.name}</span>
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 md:w-12 md:h-12 object-contain"/>
                </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-brand-primary">Premium Pro-Model Analysis</h3>
            <div className="text-center mb-6">
                 <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1 w-fit mx-auto">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Live Data Feed Active
                 </span>
            </div>
            {renderContent()}
        </div>
    );
};