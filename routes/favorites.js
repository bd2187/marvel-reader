const express = require("express");
const router = express.Router();
const passport = require("passport");

const Favorites = require("../models/Favorites");

/**
 * Route: /favorites/comic/all
 * Desc: Fetches all of the user's favorite comics
 * Private Route
 */
router.get(
  "/comic/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorites.findOne({ user: req.user.id }).then(favorites => {
      if (favorites) {
        return res.json({ comics: favorites.comics });
      } else {
        return res.json({
          status: "fail",
          msg: "cannot find favorite comic books"
        });
      }
    });
  }
);

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
    const { comicID, title, published, description } = req.body;

    const newComic = {
      comicID,
      title,
      published,
      description
    };

    Favorites.findOne({ user: usersID }).then(favorites => {
      if (favorites) {
        let query = { user: usersID };

        Favorites.findOneAndUpdate(
          query,
          {
            comics: [...favorites.comics, newComic]
          },
          { new: true }
        ).then(updatedFavorites => {
          return res.json(updatedFavorites);
        });
      } else {
        let favorites = new Favorites({
          user: usersID,
          comics: [newComic],
          characters: []
        });

        favorites.save().then(newFavorites => {
          return res.json(newFavorites);
        });
      }
    });
  }
);

/**
 * Route: /favorites/delete/comic
 * Desc: Delete comic from user's collection
 * Private Route
 */

router.delete(
  "/delete/comic",

  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const comicID = req.body.comicID;
    const userID = req.user.id;

    Favorites.findOne({ user: userID }).then(favorites => {
      if (!favorites) {
        res.json({ status: "fail", msg: "could not find favorites" });
      } else {
        const updatedFavoriteComics = favorites.comics.filter(
          comic => comic.comicID != comicID
        );

        Favorites.findOneAndUpdate(
          { user: userID },
          { comics: updatedFavoriteComics },
          { new: true }
        ).then(updatedComics => {
          return res.json({ status: "success", updatedComics });
        });
      }
    });
  }
);

module.exports = router;
