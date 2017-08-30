import { takeLatest } from 'redux-saga'; // saga helper
import { put, call } from 'redux-saga/effects'; // saga effects to interact with saga middleware
import { GET_GAMES, DELETE_GAME, POST_GAME } from '../constants/games';
import {
  getGamesSuccess,
  getGamesFailure,
  deleteGameSuccess,
  deleteGameFailure,
  postGameSuccess,
  postGameFailure
} from '../actions/games';

const selectedGames = (state) => {
  return state.getIn(['games', 'list']).toJS();
}

const selectedPicture = (state) => {
  return state.getIn(['filestack', 'url'], '');
}

const fetchGames = () => {
  return fetch('http://localhost:8080/games', {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json())
};

const deleteServerGame = (id) => {
  return fetch(`http://localhost:8080/games${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'DELETE',
  })
  .then(response => response.json())
}

const postServerGame = (game) => {
  return fetch('http://localhost:8080/games', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(game)
  })
  .then(response => response.json());
}

function* getGames () {
  try {
    const games = yield call(fetchGames);
    yield put(getGamesSuccess(games));
  } catch (err) {
    yield put(getGamesFailure());
  }
}

function* deleteGame (action) {
  const { id } = action;
  const games = yield select(selectedGAmes);
  try {
    yield call(deleteServerGame, id);
    // the new state will contain the games except for deleted one
    yield put(deleteGameSuccess(games.filter(game => game._id !== id)));
  } catch (e) {
    yield put(deleteGameFailure());
  }
}

const getGameForm = (state) => {
  return state.getIn(['form', 'game']).toJS();
}

function* postGame () {
  // access state to get new game info
  const picture = yield select(selectedPicture);
  const game = yield select(getGameForm);
  // crete newGame obj to be sent to server
  const newGame = Object.assign({}, { picture }, game.values);
  try {
    // yield call postServerGame to post to the server
    yield call(postServerGame, newGame);
    yield put(postGameSuccess());
  } catch (e) {
    yield put(postGameFailure());
  }
}

// watcher saga waits for dispatched GET_GAMES actions
function* watchGetGames () {
  yield takeLatest(GET_GAMES, getGames);
}

function* watchDeleteGame () {
  yield takeLatest(DELETE_GAME, deleteGame);
}

function* watchPostGame () {
  yield takeLatest(POST_GAME, postGame);
}

// Export the watcher to be run in parallel in sagas/index.js
export {
  watchGetGames,
  watchDeleteGame,
  watchPostGame,
};
