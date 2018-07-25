const express = require("express");
const router = express.Router();
const passport = require("passport");

const Favorites = require("../models/Favorites");
const User = require("../models/User");

/**
 * Route: /favorites/add/comic
 * Desc: Add comic to user's collection
 * Private Route
 */
router.post(
  "/add/comic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const usersID = req.user.id;
    const { id: comicID, title, published, description } = req.body;
    const newComic = {
      id: comicID,
      title,
      published,
      description
    };

    let findUsersFavorites = Favorites.findOne({ user: usersID }).exec();

    User.findById(usersID)
      .then(user => {
        if (user) {
          // return res.json(user);
          return findUsersFavorites;
        }
      })
      .then(favorites => {
        if (favorites) {
          // favorites.update({
          //   comics: [...favorites.comics, newComic]
          // });

          // return res.json({
          //   status: "success",
          //   msg: "new comic saved",
          //   newComic
          // });

          // Tank.update({ _id: id }, { $set: { size: "large" } }, callback);
          favorites.update({ comics: [...favorites.comics, newComic] });

          return res.json({
            msg: "shit",
            comics: [...favorites.comics, newComic]
          });
        }

        var comics = [newComic];
        let newFavoritesCollection = new Favorites({
          user: usersID,
          comics,
          characters: []
        });

        return newFavoritesCollection.save();
      })
      .then(() => {
        return res.json({
          status: "success",
          msg: "new comic saved",
          newComic
        });
      })
      .catch(err => {
        res.json({ err });
      });

    // res.json({
    //   success: true,
    //   data: req.body
    // });
  }
);

module.exports = router;
