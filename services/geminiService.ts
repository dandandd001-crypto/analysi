import { GoogleGenAI } from "@google/genai";
import { SoccerTeamStats, AnalysisResult, Match } from '../types';
import { supabase } from './supabaseClient';

// 24 Hours in milliseconds
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const generateAnalysisPrompt = (match: Match): string => {
  return `
    You are a **proprietary high-frequency sports trading algorithm**. 
    Your job is NOT to follow public opinion, but to find the statistical truth using advanced metrics.
    
    **TASK:**
    Perform a **deep-dive real-time web search** to analyze the upcoming soccer match between **${match.homeTeam.name}** (Home) and **${match.awayTeam.name}** (Away).
    
    **CRITICAL: IGNORE REPUTATION. LOOK AT THE DATA.**
    If a big team (like Man City or Real Madrid) has key injuries or is in bad form, you MUST predict against them. Do not be afraid to predict a draw or an upset if the data supports it.

    **STEP 1: SEARCH INSTRUCTIONS (VERIFY EVERYTHING)**
    1.  **Injuries & Suspensions:** Find the LATEST official squad list. Who is out? If a top scorer is out, DOWNGRADE goal predictions.
    2.  **Motivation:** Is this a "dead rubber" (meaningless game)? Or a title decider?
    3.  **H2H History:** Does the away team have a "bogey team" record against the home team?
    4.  **Tactical Matchup:** Does the underdog play a low block? (Suggests Under 2.5 goals).
    5.  **Referee:** Is the ref card-happy? (Over 3.5 Cards).
    6.  **Advanced Metrics (CRITICAL):** Search for "Expected Goals (xG) last 5 games". If a team is overperforming their xG, predict regression (fewer goals). 
    7.  **Schedule Congestion:** Did they play in Europe (UCL/UEL) 3 days ago? Are they tired? Predict rotation/fatigue (Lower win % or Under goals).

    **STEP 2: CALCULATE PROBABILITIES (BE PRECISE)**
    - **Asian Handicap:** Calculate the probability of the favorite covering the line (e.g. -1.5).
    - **Corners:** High possession teams (Man City) vs Low block teams = High Corner Count (Over 9.5).
    - **Half-Time:** If both teams are defensive, predict Draw at HT.

    **OUTPUT FORMAT:**
    Return ONLY valid JSON inside a markdown code block.
    **IMPORTANT: All probabilities must be INTEGERS between 0 and 100 (e.g., 65, NOT 0.65).**
    
    \`\`\`json
    {
      "homeWin": number, // Percentage 0-100
      "awayWin": number, // Percentage 0-100
      "draw": number, // Percentage 0-100
      "over1_5": number,
      "over2_5": number,
      "over3_5": number,
      "over4_5": number,
      "under1_5": number,
      "under2_5": number,
      "under3_5": number,
      "bttsYes": number,
      "bttsNo": number,
      "dnbHome": number,
      "dnbAway": number,
      "homeScoreTwoInARow": number,
      "awayScoreTwoInARow": number,
      "predictedScore": "string (e.g. '1-1')",
      "over8_5Corners": number,
      "under8_5Corners": number,
      "over3_5Cards": number,
      "under3_5Cards": number,
      "asianHandicapHome": number, // Probability Home covers handicap
      "asianHandicapAway": number, // Probability Away covers handicap
      "htHome": number,
      "htDraw": number,
      "htAway": number,
      "over0_5FH": number,
      "homeOver1_5Goals": number,
      "awayOver1_5Goals": number
    }
    \`\`\`

    **Base Context (Use this as a baseline, but prioritize Search Results):**
    Home: ${match.homeTeam.name} (Form: ${match.homeTeam.stats.form}, Last: ${match.homeTeam.stats.lastMatchResult || 'N/A'})
    Away: ${match.awayTeam.name} (Form: ${match.awayTeam.stats.form}, Last: ${match.awayTeam.stats.lastMatchResult || 'N/A'})
    Known Injuries: ${JSON.stringify(match.homeTeam.stats.injuries || [])} vs ${JSON.stringify(match.awayTeam.stats.injuries || [])}
    H2H: ${JSON.stringify(match.headToHead || [])}
  `;
};

// Helper to check Supabase Cache
const getAnalysisFromCache = async (matchId: string): Promise<AnalysisResult | null> => {
  try {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('match_analysis')
        .select('data')
        .eq('id', matchId)
        .single();

    if (error || !data) {
        return null;
    }

    const parsed = data.data as AnalysisResult;
    const now = Date.now();

    // Check if cache is older than 24 hours
    if (parsed.timestamp && (now - parsed.timestamp > CACHE_DURATION)) {
      console.log(`Cache expired for match ${matchId}`);
      return null;
    }

    console.log(`Serving analysis for ${matchId} from Supabase DB.`);
    return parsed;
  } catch (e) {
    console.error("Database read error", e);
    return null;
  }
};

// Helper to save to Supabase
const saveAnalysisToCache = async (matchId: string, data: AnalysisResult) => {
  try {
    if (!supabase) return;
    
    const cacheObject = { ...data, timestamp: Date.now() };
    
    const { error } = await supabase
        .from('match_analysis')
        .upsert({
            id: matchId,
            data: cacheObject
        });

    if (error) console.error("Supabase upsert error:", error);
    
  } catch (e) {
    console.error("Database write error", e);
  }
};

export const generateAnalysis = async (homeTeam: SoccerTeamStats, awayTeam: SoccerTeamStats, matchContext?: Match): Promise<AnalysisResult> => {
  
  // 1. Check Cache First (Async now)
  const matchId = matchContext?.id || 'temp';
  const cachedResult = await getAnalysisFromCache(matchId);
  
  if (cachedResult) {
    return cachedResult;
  }

  // 2. If no cache, perform API Call
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const matchToAnalyze = matchContext || {
        id: 'temp',
        league: 'Unknown',
        kickOffTime: new Date().toISOString(),
        homeTeam,
        awayTeam
    } as Match;

    const prompt = generateAnalysisPrompt(matchToAnalyze);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.4, // Low temperature = More factual, less creative/hallucinations.
      }
    });

    const text = response.text || "";
    
    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    
    let jsonString = "";
    if (jsonMatch && jsonMatch[1]) {
        jsonString = jsonMatch[1];
    } else {
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            jsonString = text.substring(firstBrace, lastBrace + 1);
        } else {
             throw new Error("Algorithmic model failed to generate structured output.");
        }
    }

    const parsedData = JSON.parse(jsonString);
    
    // SANITIZATION: Fix probabilities if they are in decimal format (0-1) instead of percentage (0-100)
    for (const key in parsedData) {
        // We check if the value is a number, is defined, and is <= 1 (e.g., 0.85)
        // We exclude 'predictedScore' (string) and 0/1 exactly if they mean 0% or 1%.
        // But generally, if ALL values are <= 1, it's definitely decimals.
        // To be safe, if value is float between 0 and 1, multiply by 100.
        if (typeof parsedData[key] === 'number') {
            if (parsedData[key] > 0 && parsedData[key] <= 1) {
                parsedData[key] = Math.round(parsedData[key] * 100);
            }
            // Clamp to 100 just in case
            if (parsedData[key] > 100) parsedData[key] = 100;
        }
    }
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const finalResult: AnalysisResult = {
        ...parsedData,
        groundingChunks,
        timestamp: Date.now() // Add timestamp when generated
    };

    // 3. Save to Cache (Async)
    await saveAnalysisToCache(matchId, finalResult);

    return finalResult;

  } catch (error) {
    console.error("Error generating analysis:", error);
    if (error instanceof Error) {
        throw new Error(`Model Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred during processing.");
  }
};