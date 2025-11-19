
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MatchCard } from './components/MatchCard';
import { AnalysisGrid } from './components/AnalysisGrid';
import { generateAnalysis } from './services/geminiService';
import { upcomingMatches } from './data/mockData';
import type { Match, AnalysisResult } from './types';

const App: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string>('All');

  // Get unique leagues for the filter
  const leagues = useMemo(() => {
    const allLeagues = upcomingMatches.map(m => m.league);
    return ['All', ...Array.from(new Set(allLeagues))];
  }, []);

  // Filter Matches by League
  const filteredMatches = useMemo(() => {
    if (selectedLeague === 'All') return upcomingMatches;
    return upcomingMatches.filter(m => m.league === selectedLeague);
  }, [selectedLeague]);

  // Group Matches by Date (Today, Tomorrow, Future Dates)
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: Match[] } = {};
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    filteredMatches.forEach(match => {
        const matchDate = new Date(match.kickOffTime);
        let dateKey = '';

        if (matchDate.toDateString() === today.toDateString()) {
            dateKey = 'Today';
        } else if (matchDate.toDateString() === tomorrow.toDateString()) {
            dateKey = 'Tomorrow';
        } else {
            dateKey = matchDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        }

        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(match);
    });

    return groups;
  }, [filteredMatches]);

  const handleAnalyze = async (match: Match) => {
    if (isLoading && selectedMatch?.id === match.id) return;
    
    setSelectedMatch(match);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const element = document.getElementById('analysis-section');
    if (element) {
        const offset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    try {
      // Pass the full match object so the AI can search specifically for this game
      const result = await generateAnalysis(match.homeTeam, match.awayTeam, match);
      setAnalysis(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-text-primary font-sans">
      <Header />
      
      <main className="flex-grow px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Upcoming Matches Container */}
          <div className="bg-dark-surface rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
            
            {/* Header & League Filter */}
            <div className="p-4 md:p-6 border-b border-gray-800">
                <h2 className="text-xl md:text-2xl font-bold mb-4 pl-1">Upcoming Fixtures</h2>
                
                {/* Mobile Scrollable League Filter */}
                <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar -mx-2 px-2 md:mx-0 md:px-0">
                    {leagues.map(league => (
                        <button
                            key={league}
                            onClick={() => setSelectedLeague(league)}
                            className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                                selectedLeague === league 
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' 
                                : 'bg-dark-card text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
                            }`}
                        >
                            {league === 'All' ? null : (
                                <span className="w-4 h-4 rounded-full bg-gray-200/20 flex items-center justify-center text-[8px]">
                                    {league.substring(0,1)}
                                </span>
                            )}
                            <span>{league}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Match List Grouped by Date */}
            <div className="p-4 md:p-6 space-y-8 bg-[#161616]">
                {Object.entries(groupedMatches).length > 0 ? (
                    Object.entries(groupedMatches).map(([dateGroup, matches]: [string, Match[]]) => (
                        <div key={dateGroup}>
                            <h3 className="text-brand-primary font-bold uppercase tracking-wider text-xs mb-3 ml-1 sticky top-0 bg-[#161616] py-2 z-10">
                                {dateGroup}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {matches.map((match) => (
                                    <MatchCard 
                                        key={match.id} 
                                        match={match} 
                                        onAnalyze={handleAnalyze}
                                        isLoading={isLoading && selectedMatch?.id === match.id}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No matches found for this league.
                    </div>
                )}
            </div>
          </div>
          
          {/* Analysis Section - Appears when selected */}
          {selectedMatch && (
             <div id="analysis-section" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <AnalysisGrid 
                    match={selectedMatch}
                    analysis={analysis} 
                    isLoading={isLoading} 
                    error={error}
                 />
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;