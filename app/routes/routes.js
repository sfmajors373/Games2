module.exports = (app) => {
  const controllerMethods = require('../controllers/controllers');

  // GET /games ---> get all the games
  // POST /games --> create a game
  app.route('/games')
    .get(controllerMethods.listGames)
    .post(controllerMethods.createGame);
//   app.route('/games')
  // GET /games/:id ---> get a single game
  app.route('/games/:id')
    .get(controllerMethods.findGame);
//  // DELETE /games/:id ---> delete a game
//  server.route('/games/:id')
//    .delete(controllerMethods.deleteGame);
};




// Possible extras, add to have it list, add to want it list, maybe find it
