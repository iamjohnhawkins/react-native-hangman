// Fallback word list for offline use
const FALLBACK_WORDS = [
  'APPLE', 'BANANA', 'CHERRY', 'DRAGON', 'ELEPHANT', 'FOREST', 'GUITAR', 'RAINBOW',
  'PIZZA', 'SUNSET', 'COMPUTER', 'MOUNTAIN', 'OCEAN', 'BUTTERFLY', 'SANDWICH',
  'BICYCLE', 'PENGUIN', 'CASTLE', 'LIBRARY', 'WIZARD', 'SOCCER', 'FLOWER',
  'ROCKET', 'BRIDGE', 'DOLPHIN', 'JUNGLE', 'THUNDER', 'CRYSTAL', 'VOLCANO',
  'TREASURE', 'PLANET', 'WARRIOR', 'GARDEN', 'MYSTERY', 'ADVENTURE', 'KEYBOARD',
  'LIGHTHOUSE', 'TORNADO', 'DIAMOND', 'FIREWORKS', 'CAROUSEL', 'HELICOPTER',
  'SUBMARINE', 'TELESCOPE', 'BASKETBALL', 'CHOCOLATE', 'MAGAZINE', 'TELEPHONE'
];

// Function to get a random word from WordsAPI or fallback list
export const getRandomWord = async (): Promise<string> => {
  try {
    // Try WordsAPI first - it's free with rate limits
    const response = await fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=12&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');

    if (response.ok) {
      const data = await response.json();
      const word = data.word?.toUpperCase();

      // Validate the word contains only letters
      if (word && /^[A-Z]+$/.test(word)) {
        return word;
      }
    }
  } catch (error) {
    console.log('API failed, using fallback word list');
  }

  // Fallback to local word list
  const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
  return FALLBACK_WORDS[randomIndex];
};