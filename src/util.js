export const GameStatus = {
    READY: "READY",
    START: "START",
    LOSE: "LOSE",
    WIN: "WIN",
  };
  
  export function isGameEnded(gameStatus) {
    return gameStatus !== GameStatus.START;
  }
  
  export function fetchWord() {
    return fetch("https://puzzle.mead.io/puzzle?wordCount=2")
      .then((r) => r.json())
      .then((data) => data.puzzle);
  }
  
  export function wordToMap(word) {
    return word
      .toUpperCase()
      .split("")
      .reduce((map, c, idx) => {
        if (!map[c]) map[c] = [];
        map[c].push(idx);
        return map;
      }, {});
  }
  
  export function generateGameMessage(gameStatus, chancesLeft) {
    if (gameStatus === GameStatus.START) {
      return `Chances left: ${chancesLeft}`;
    } else if (gameStatus === GameStatus.READY) {
      return `Please start the game.`;
    } else if (gameStatus === GameStatus.LOSE) {
      return `You lost the game. Please try again.`;
    } else if (gameStatus === GameStatus.WIN) {
      return `You guessed the word! Please try again.`;
    }
  
    return "";
  }
  
  