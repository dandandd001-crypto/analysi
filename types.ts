
export interface SoccerTeamStats {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  stats: {
    // Overall performance
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    // Attacking stats
    goalsFor: number;
    avgGoalsScoredPerMatch: number;
    // Defensive stats
    goalsAgainst: number;
    avgGoalsConcededPerMatch: number;
    cleanSheets: number;
    // Recent form (last 5 games, W=Win, D=Draw, L=Loss)
    form: string;
    // New Enterprise Data
    lastMatchResult?: string; // e.g., "Won 3-1 vs Arsenal"
    injuries?: string[]; // List of key players missing
  };
}

export interface Match {
  id: string;
  league: string;
  leagueLogo?: string;
  homeTeam: SoccerTeamStats;
  awayTeam: SoccerTeamStats;
  kickOffTime: string; // ISO 8601 format
  headToHead?: string[]; // e.g. ["Man City 3 - 1 Liverpool", "Liverpool 1 - 1 Man City"]
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AnalysisResult {
  // Metadata for Caching
  timestamp?: number; // Unix timestamp of when analysis was generated

  // Main Outcomes
  homeWin: number;
  awayWin: number;
  draw: number;
  
  // Goals
  over1_5: number;
  over2_5: number;
  over3_5: number;
  over4_5: number;
  under1_5: number;
  under2_5: number;
  under3_5: number;
  
  // Both Teams
  bttsYes: number;
  bttsNo: number;
  
  // Specials
  dnbHome: number;
  dnbAway: number;
  homeScoreTwoInARow: number;
  awayScoreTwoInARow: number;

  // NEW: Pro Markets
  predictedScore: string; // e.g., "2-1"
  over8_5Corners: number;
  under8_5Corners: number;
  over3_5Cards: number; // High intensity game check
  under3_5Cards: number;

  // NEW: Rigorous Markets (Handicap & Halves)
  asianHandicapHome: number; // Probability Home covers -1.5 (if fav) or +1.5 (if dog)
  asianHandicapAway: number; 
  htHome: number; // Half Time Result
  htDraw: number;
  htAway: number;
  over0_5FH: number; // First Half Goal
  homeOver1_5Goals: number; // Team specific goals
  awayOver1_5Goals: number;

  groundingChunks?: GroundingChunk[]; // Added for Google Search sources
}
