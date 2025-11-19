
import React from 'react';
import { Match } from '../types';
import { CountdownTimer } from './CountdownTimer';

interface MatchCardProps {
  match: Match;
  onAnalyze: (match: Match) => void;
  isLoading: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onAnalyze, isLoading }) => {
  const kickOff = new Date(match.kickOffTime);
  const formattedTime = kickOff.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
        className="bg-dark-card rounded-xl p-4 border border-gray-800 hover:border-brand-primary/30 transition-all duration-200 active:scale-[0.99]"
    >
        {/* Mobile / Desktop Hybrid Layout */}
        <div className="flex items-center justify-between">
            
            {/* Home Team */}
            <div className="flex flex-col items-center w-1/3 space-y-2">
                <div className="w-12 h-12 md:w-14 md:h-14 p-2 bg-gray-800/50 rounded-full flex items-center justify-center">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs md:text-sm font-bold text-center text-gray-200 leading-tight">{match.homeTeam.name}</span>
            </div>

            {/* Center Info */}
            <div className="flex flex-col items-center justify-center w-1/3 space-y-2">
                <span className="text-[10px] font-bold tracking-wider text-brand-primary uppercase bg-brand-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
                    {match.league}
                </span>
                <CountdownTimer targetDate={match.kickOffTime} />
                <span className="text-xs text-gray-500">{formattedTime}</span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center w-1/3 space-y-2">
                <div className="w-12 h-12 md:w-14 md:h-14 p-2 bg-gray-800/50 rounded-full flex items-center justify-center">
                     <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs md:text-sm font-bold text-center text-gray-200 leading-tight">{match.awayTeam.name}</span>
            </div>
        </div>

        {/* Action Button - Full width on mobile, easy to tap */}
        <div className="mt-4">
            <button
                onClick={() => onAnalyze(match)}
                disabled={isLoading}
                className="w-full bg-brand-primary hover:bg-blue-500 text-white font-semibold text-sm py-3 rounded-lg shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Data...
                    </>
                ) : (
                    'Analyze Matchup'
                )}
            </button>
        </div>
    </div>
  );
};