const moonPhases = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent"
  ];
  
  export function getMoonPhase() {
    const now = new Date();
    const synodicMonth = 29.53058867; 
  
    const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
    const daysSince = (now.getTime() - knownNewMoon)
    const currentPhase = daysSince % synodicMonth;
  
    const index = Math.floor((currentPhase / synodicMonth) * 8);
    return moonPhases[index];
  }
  