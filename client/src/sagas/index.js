import { watchGetGames, watchDeleteGame, watchPostGame } from './games';
import { watchUploadPicture } from './filestack';

export default function* rootSaga () {
  // start all sagas in parallel
  yield [
    watchGetGames(),
    watchDeleteGame(),
    watchPostGame(),
    watchUploadPicture(),
  ];
}
