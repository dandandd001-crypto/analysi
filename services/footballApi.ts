
// Service to interact with API-Football (RapidAPI)
const API_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

interface ApiHeaders {
    'x-rapidapi-host': string;
    'x-rapidapi-key': string;
}

const headers: ApiHeaders = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': API_KEY || ''
};

export const getNextPremierLeagueMatches = async () => {
    if (!API_KEY) {
        console.warn("Football API Key is missing.");
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}/fixtures?league=39&next=10`, {
            method: 'GET',
            headers: headers as any
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Failed to fetch matches from API-Football", error);
        return [];
    }
};
