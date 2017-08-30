import {
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE
} from '../constants/games';

// getGames will be dispatched within GamesContainer
function getGames () {
  return {
    type: GET_GAMES
  };
}

// After fetching from the server this action is intercepted by the reducer and games is added to state
function getGamesSuccess (games) {
  return {
    type: GET_GAMES_SUCCESS,
    games
  };
}

// Error catching
function getGamesFailure () {
  return {
    type: GET_GAMES_FAILURE
  };
}

export {
  getGames,
  getGamesSuccess,
  getGamesFailure
};
