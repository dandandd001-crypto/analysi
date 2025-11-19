
import { SoccerTeamStats, Match } from '../types';

export const soccerTeams: { [key: string]: SoccerTeamStats } = {
  // Premier League
  MAN_CITY: {
    id: 'MAN_CITY',
    name: 'Man City',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    primaryColor: '#6CABDD',
    stats: { gamesPlayed: 38, wins: 28, draws: 7, losses: 3, goalsFor: 96, goalsAgainst: 34, avgGoalsScoredPerMatch: 2.53, avgGoalsConcededPerMatch: 0.89, cleanSheets: 13, form: 'WWWWW', lastMatchResult: 'Won 5-1 vs Wolves', injuries: ['Ederson (Eye - Out)', 'De Bruyne (Hamstring - Late Test)'] },
  },
  LIVERPOOL: {
    id: 'LIVERPOOL',
    name: 'Liverpool',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    primaryColor: '#C8102E',
    stats: { gamesPlayed: 38, wins: 24, draws: 10, losses: 4, goalsFor: 86, goalsAgainst: 41, avgGoalsScoredPerMatch: 2.26, avgGoalsConcededPerMatch: 1.08, cleanSheets: 10, form: 'WLDWW', lastMatchResult: 'Drew 2-2 vs West Ham', injuries: ['Diogo Jota (Hip - Doubtful)', 'Alisson (Hamstring - Out)'] },
  },
  ARSENAL: {
    id: 'ARSENAL',
    name: 'Arsenal',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    primaryColor: '#EF0107',
    stats: { gamesPlayed: 38, wins: 28, draws: 5, losses: 5, goalsFor: 91, goalsAgainst: 29, avgGoalsScoredPerMatch: 2.39, avgGoalsConcededPerMatch: 0.76, cleanSheets: 18, form: 'WWWWW', lastMatchResult: 'Won 3-0 vs Bournemouth' },
  },
  CHELSEA: {
    id: 'CHELSEA',
    name: 'Chelsea',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    primaryColor: '#034694',
    stats: { gamesPlayed: 38, wins: 18, draws: 9, losses: 11, goalsFor: 77, goalsAgainst: 63, avgGoalsScoredPerMatch: 2.03, avgGoalsConcededPerMatch: 1.66, cleanSheets: 8, form: 'WWWWW', lastMatchResult: 'Won 2-1 vs Brighton', injuries: ['Reece James (Suspended)'] },
  },
  
  // La Liga
  REAL_MADRID: {
    id: 'REAL_MADRID',
    name: 'Real Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    primaryColor: '#FEBE10',
    stats: { gamesPlayed: 38, wins: 29, draws: 6, losses: 3, goalsFor: 87, goalsAgainst: 26, avgGoalsScoredPerMatch: 2.29, avgGoalsConcededPerMatch: 0.68, cleanSheets: 21, form: 'WWDWW', lastMatchResult: 'Won 3-0 vs Cadiz', injuries: ['Alaba (ACL - Out)', 'Tchouameni (Foot - Out)'] },
  },
  BARCELONA: {
    id: 'BARCELONA',
    name: 'Barcelona',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    primaryColor: '#A50044',
    stats: { gamesPlayed: 38, wins: 26, draws: 7, losses: 5, goalsFor: 79, goalsAgainst: 44, avgGoalsScoredPerMatch: 2.08, avgGoalsConcededPerMatch: 1.16, cleanSheets: 17, form: 'WWWLW', lastMatchResult: 'Lost 2-4 vs Girona', injuries: ['Gavi (ACL - Out)', 'Balde (Hamstring - Out)', 'De Jong (Ankle - Out)'] },
  },
  ATLETICO: {
    id: 'ATLETICO',
    name: 'Atlético Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
    primaryColor: '#CB3524',
    stats: { gamesPlayed: 38, wins: 24, draws: 4, losses: 10, goalsFor: 70, goalsAgainst: 43, avgGoalsScoredPerMatch: 1.84, avgGoalsConcededPerMatch: 1.13, cleanSheets: 12, form: 'WWLWW', lastMatchResult: 'Won 1-0 vs Mallorca' },
  },

  // Bundesliga
  BAYERN: {
    id: 'BAYERN',
    name: 'Bayern Munich',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    primaryColor: '#DC052D',
    stats: { gamesPlayed: 34, wins: 23, draws: 3, losses: 8, goalsFor: 94, goalsAgainst: 45, avgGoalsScoredPerMatch: 2.76, avgGoalsConcededPerMatch: 1.32, cleanSheets: 9, form: 'WLWWL', lastMatchResult: 'Lost 1-3 vs Stuttgart', injuries: ['Kane (Back - Doubtful)', 'Gnabry (Hamstring - Out)'] },
  },
  LEVERKUSEN: {
    id: 'LEVERKUSEN',
    name: 'Bayer Leverkusen',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
    primaryColor: '#E32219',
    stats: { gamesPlayed: 34, wins: 28, draws: 6, losses: 0, goalsFor: 89, goalsAgainst: 24, avgGoalsScoredPerMatch: 2.61, avgGoalsConcededPerMatch: 0.70, cleanSheets: 16, form: 'WDWWW', lastMatchResult: 'Won 5-1 vs Frankfurt' },
  },
  DORTMUND: {
    id: 'DORTMUND',
    name: 'Dortmund',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    primaryColor: '#FDE100',
    stats: { gamesPlayed: 34, wins: 18, draws: 9, losses: 7, goalsFor: 68, goalsAgainst: 43, avgGoalsScoredPerMatch: 2.0, avgGoalsConcededPerMatch: 1.26, cleanSheets: 10, form: 'WWLDW', lastMatchResult: 'Won 3-0 vs Augsburg' },
  },

  // Serie A
  JUVENTUS: {
    id: 'JUVENTUS',
    name: 'Juventus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg',
    primaryColor: '#000000',
    stats: { gamesPlayed: 38, wins: 19, draws: 14, losses: 5, goalsFor: 54, goalsAgainst: 31, avgGoalsScoredPerMatch: 1.42, avgGoalsConcededPerMatch: 0.81, cleanSheets: 15, form: 'DDDDD', lastMatchResult: 'Drew 1-1 vs Roma' },
  },
  MILAN: {
    id: 'MILAN',
    name: 'AC Milan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    primaryColor: '#FB090B',
    stats: { gamesPlayed: 38, wins: 22, draws: 9, losses: 7, goalsFor: 76, goalsAgainst: 49, avgGoalsScoredPerMatch: 2.0, avgGoalsConcededPerMatch: 1.28, cleanSheets: 11, form: 'DLWLD', lastMatchResult: 'Drew 3-3 vs Genoa' },
  },
  INTER: {
    id: 'INTER',
    name: 'Inter Milan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    primaryColor: '#010E80',
    stats: { gamesPlayed: 38, wins: 29, draws: 7, losses: 2, goalsFor: 89, goalsAgainst: 22, avgGoalsScoredPerMatch: 2.34, avgGoalsConcededPerMatch: 0.58, cleanSheets: 21, form: 'LWWWD', lastMatchResult: 'Lost 0-1 vs Sassuolo' },
  },
  
  // Ligue 1
  PSG: {
    id: 'PSG',
    name: 'PSG',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    primaryColor: '#004170',
    stats: { gamesPlayed: 34, wins: 22, draws: 10, losses: 2, goalsFor: 81, goalsAgainst: 33, avgGoalsScoredPerMatch: 2.38, avgGoalsConcededPerMatch: 0.97, cleanSheets: 13, form: 'WWWLW', lastMatchResult: 'Drew 3-3 vs Le Havre', injuries: ['Hernandez (ACL - Out)'] },
  },

  // Eredivisie
  AJAX: {
    id: 'AJAX',
    name: 'Ajax',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg',
    primaryColor: '#D2122E',
    stats: { gamesPlayed: 30, wins: 14, draws: 10, losses: 6, goalsFor: 65, goalsAgainst: 55, avgGoalsScoredPerMatch: 2.16, avgGoalsConcededPerMatch: 1.83, cleanSheets: 5, form: 'WDDWL', lastMatchResult: 'Won 4-1 vs Volendam' },
  },
  PSV: {
    id: 'PSV',
    name: 'PSV Eindhoven',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg',
    primaryColor: '#FF0000',
    stats: { gamesPlayed: 30, wins: 27, draws: 3, losses: 0, goalsFor: 95, goalsAgainst: 17, avgGoalsScoredPerMatch: 3.16, avgGoalsConcededPerMatch: 0.56, cleanSheets: 18, form: 'WWWWW', lastMatchResult: 'Won 8-0 vs Heerenveen' },
  },

  // Primeira Liga
  BENFICA: {
    id: 'BENFICA',
    name: 'Benfica',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg',
    primaryColor: '#EF3340',
    stats: { gamesPlayed: 30, wins: 23, draws: 4, losses: 3, goalsFor: 71, goalsAgainst: 25, avgGoalsScoredPerMatch: 2.36, avgGoalsConcededPerMatch: 0.83, cleanSheets: 14, form: 'WLWWW', lastMatchResult: 'Won 3-1 vs Braga' },
  },
  SPORTING: {
    id: 'SPORTING',
    name: 'Sporting CP',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg',
    primaryColor: '#008057',
    stats: { gamesPlayed: 30, wins: 25, draws: 3, losses: 2, goalsFor: 87, goalsAgainst: 27, avgGoalsScoredPerMatch: 2.90, avgGoalsConcededPerMatch: 0.90, cleanSheets: 12, form: 'WWDWW', lastMatchResult: 'Drew 2-2 vs Porto' },
  }
};

const now = new Date();

// Helper to create dates relative to now
const addHours = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();
const addDays = (d: number, h: number = 15) => {
    const date = new Date(now);
    date.setDate(date.getDate() + d);
    date.setHours(h, 0, 0, 0);
    return date.toISOString();
}

export const upcomingMatches: Match[] = [
  // TODAY
  {
    id: 'M_TODAY_1',
    league: 'Premier League',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    homeTeam: soccerTeams.MAN_CITY,
    awayTeam: soccerTeams.LIVERPOOL,
    kickOffTime: addHours(2), 
    headToHead: ['Liverpool 1-1 Man City', 'Man City 1-1 Liverpool', 'Man City 4-1 Liverpool', 'Man City 3-2 Liverpool', 'Liverpool 1-0 Man City']
  },
  {
    id: 'M_TODAY_2',
    league: 'La Liga',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/LaLiga_Santander.svg',
    homeTeam: soccerTeams.REAL_MADRID,
    awayTeam: soccerTeams.BARCELONA,
    kickOffTime: addHours(4),
    headToHead: ['Real Madrid 3-2 Barcelona', 'Real Madrid 4-1 Barcelona', 'Barcelona 1-2 Real Madrid', 'Barcelona 2-1 Real Madrid', 'Real Madrid 0-1 Barcelona']
  },
  {
    id: 'M_TODAY_3',
    league: 'Premier League',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    homeTeam: soccerTeams.CHELSEA,
    awayTeam: soccerTeams.ARSENAL,
    kickOffTime: addHours(5),
    headToHead: ['Arsenal 5-0 Chelsea', 'Chelsea 2-2 Arsenal', 'Arsenal 3-1 Chelsea', 'Chelsea 0-1 Arsenal', 'Chelsea 2-4 Arsenal']
  },
  {
    id: 'M_TODAY_4',
    league: 'Eredivisie',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eredivisie_new_logo_2017-.svg',
    homeTeam: soccerTeams.PSV,
    awayTeam: soccerTeams.AJAX,
    kickOffTime: addHours(6),
    headToHead: ['Ajax 1-1 PSV', 'PSV 5-2 Ajax', 'Ajax 1-2 PSV', 'PSV 3-0 Ajax']
  },

  // TOMORROW
  {
    id: 'M_TOMORROW_1',
    league: 'Bundesliga',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg',
    homeTeam: soccerTeams.BAYERN,
    awayTeam: soccerTeams.LEVERKUSEN,
    kickOffTime: addDays(1, 18), 
    headToHead: ['Leverkusen 3-0 Bayern', 'Bayern 2-2 Leverkusen', 'Leverkusen 2-1 Bayern', 'Bayern 4-0 Leverkusen']
  },
  {
    id: 'M_TOMORROW_2',
    league: 'Serie A',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg',
    homeTeam: soccerTeams.MILAN,
    awayTeam: soccerTeams.INTER,
    kickOffTime: addDays(1, 20),
    headToHead: ['Milan 1-2 Inter', 'Inter 5-1 Milan', 'Inter 1-0 Milan', 'Milan 0-2 Inter', 'Inter 1-0 Milan']
  },

  // FUTURE
  {
    id: 'M_FUTURE_1',
    league: 'Premier League',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    homeTeam: soccerTeams.ARSENAL,
    awayTeam: soccerTeams.MAN_CITY,
    kickOffTime: addDays(3, 16), 
  },
  {
    id: 'M_FUTURE_2',
    league: 'Champions League',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg',
    homeTeam: soccerTeams.PSG,
    awayTeam: soccerTeams.DORTMUND,
    kickOffTime: addDays(5, 20), 
  },
  {
    id: 'M_FUTURE_3',
    league: 'La Liga',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/LaLiga_Santander.svg',
    homeTeam: soccerTeams.ATLETICO,
    awayTeam: soccerTeams.REAL_MADRID,
    kickOffTime: addDays(7, 20), 
  },
  {
    id: 'M_FUTURE_4',
    league: 'Primeira Liga',
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Liga_Portugal_bwin_Logo.svg',
    homeTeam: soccerTeams.BENFICA,
    awayTeam: soccerTeams.SPORTING,
    kickOffTime: addDays(4, 19),
    headToHead: ['Sporting 2-1 Benfica', 'Benfica 2-2 Sporting', 'Sporting 2-2 Benfica', 'Benfica 4-3 Sporting']
  },
];
