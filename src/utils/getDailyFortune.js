import { fortunes } from '../data/fortunes';

const DAILY_KEY = 'catOracleDailyFortune';

function getTodayDateString() {
  return new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
}

function getRandomDailyFortune() {
  const allFortunes = Object.values(fortunes).flat();
  const random = allFortunes[Math.floor(Math.random() * allFortunes.length)];
  return random;
}

export function getDailyFortune() {
  const today = getTodayDateString();
  const stored = JSON.parse(localStorage.getItem(DAILY_KEY));

  if (stored && stored.date === today) {
    return stored.fortune;
  }

  const newFortune = getRandomDailyFortune();
  const toStore = { fortune: newFortune, date: today };
  localStorage.setItem(DAILY_KEY, JSON.stringify(toStore));

  return newFortune;
}
