

import React from 'react';
// FIX: Changed TeamStats to SoccerTeamStats to match the exported interface.
import { SoccerTeamStats } from '../types';

interface TeamSelectorProps {
  label: string;
  // FIX: Changed TeamStats to SoccerTeamStats.
  teams: SoccerTeamStats[];
  selectedTeamId: string | null;
  otherSelectedTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  label,
  teams,
  selectedTeamId,
  otherSelectedTeamId,
  onSelectTeam,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={label} className="block text-sm font-medium text-dark-text-secondary mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={label}
          value={selectedTeamId || ''}
          onChange={(e) => onSelectTeam(e.target.value)}
          className="w-full appearance-none bg-dark-card border border-gray-600 rounded-md py-3 px-4 pr-10 text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
        >
          <option value="" disabled>Select a team</option>
          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
              disabled={team.id === otherSelectedTeamId}
            >
              {team.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};