

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
// FIX: Changed TeamStats to SoccerTeamStats to match the exported interface.
import { SoccerTeamStats } from '../types';

interface StatChartProps {
  // FIX: Changed TeamStats to SoccerTeamStats.
  team1: SoccerTeamStats;
  // FIX: Changed TeamStats to SoccerTeamStats.
  team2: SoccerTeamStats;
}

// FIX: Updated chart data keys to reflect relevant soccer stats instead of basketball stats.
const chartDataKeys = [
    { key: 'wins', name: 'Wins' },
    { key: 'goalsFor', name: 'Goals For' },
    { key: 'avgGoalsScoredPerMatch', name: 'Avg Goals / Match' },
    { key: 'goalsAgainst', name: 'Goals Against' },
    { key: 'avgGoalsConcededPerMatch', name: 'Avg Conceded / Match' },
    { key: 'cleanSheets', name: 'Clean Sheets' },
];


export const StatChart: React.FC<StatChartProps> = ({ team1, team2 }) => {
    const data = chartDataKeys.map(item => ({
        name: item.name,
        [team1.id]: team1.stats[item.key as keyof typeof team1.stats],
        [team2.id]: team2.stats[item.key as keyof typeof team2.stats],
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-dark-card p-4 border border-gray-600 rounded-lg shadow-lg">
                    <p className="label font-bold text-dark-text-primary">{`${label}`}</p>
                    <p style={{ color: team1.primaryColor }}>{`${team1.name} : ${payload[0].value}`}</p>
                    <p style={{ color: team2.primaryColor }}>{`${team2.name} : ${payload[1].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-80 md:h-96 bg-dark-card p-4 rounded-xl shadow-lg border border-gray-700/50">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
                    <XAxis dataKey="name" stroke="#B0B0B0" />
                    <YAxis stroke="#B0B0B0" />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100,100,100,0.1)' }}/>
                    <Legend />
                    <Bar dataKey={team1.id} name={team1.name} fill={team1.primaryColor} />
                    <Bar dataKey={team2.id} name={team2.name} fill={team2.primaryColor} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};