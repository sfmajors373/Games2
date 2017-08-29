const mongoose = require('mongoose');

const Game = require('../models/model');

const STATUS_USER_ERROR = 422;
// error handling
const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
    return;
  } else {
    res.json({ error: err });
    return;
  }
};

// list all the games
const listGames = (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      sendUserError(err);
    }
    const gamesList = [];
    games.forEach((game) => {
      const gameObj = {};
      gameObj.title = game.title;
      gameObj._id = game._id;
      games.push(gameObj);
    });
    res.json(games);
  });
};

// create a game
const createGame = (req, res) => {
  const { title, console, altTitle, Code, designerProgrammer, publisher, year, genre, notes, picture } = req.body;
  const newGame = new Game({ title, console, altTitle, Code, designerProgrammer, publisher, year, genre, notes, picture });
    newGame.save()
      .then((newGame) => {
        res.json(newGame);
      })
      .catch((err) => {
        res.status(STATUS_USER_ERROR);
        res.json(err);
      });
//   newGame.save(newGame, (err, post) => {
//     if (err) {
//       sendUserError(err);
//     }
//     res.json(post);
//   });
};

const findGame = (req, res) => {
  const { id } = req.params;
  Game.findById(id)
    .exec((err, post) => {
      if (err) {
        res.status(STATUS_USER_ERROR);
        res.json(err);
        return;
      }
      res.json(post);
    });
//     .exec()
//     .then((game) => {
//       res.json(post);
//     })
//     .catch((err) => {
//       res.status(STATUS_USER_ERROR);
//       res.json(err);
//     });
};

// const deleteGame = (req, res) => {};
// const deleteGame= (req, res) => {
//   const { id } = req.params;
//   Game.findByIdAndRemove(id)
// //    .exec((err, post) => {
// //      if (err) {
// //        res.status(STATUS_USER_ERROR);
// //        res.json(err);
// //        return;
// //      }
// //      res.json(post);
// //    });
//     .exec()
//     .then((game) => {
//       res.json(post);
//     })
//     .catch((err) => {
//       res.status(STATUS_USER_ERROR);
//       res.json(err);
//     });
// };

module.exports = {
  createGame,
  listGames,
  findGame,
//   deleteGame,
};
