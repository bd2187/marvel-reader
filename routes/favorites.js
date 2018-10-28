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
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorites.findOne({ user: req.user.id }).then(favorites => {
      if (favorites) {
        return res.json(favorites);
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
    const query = { user: usersID };
    const { comicID, title, published, description, thumbnail } = req.body;

    // TODO: ERROR HANDLING / MISSING FIELDS

    const newComic = {
      comicID,
      title,
      published,
      description,
      thumbnail
    };

    Favorites.findOne(query).then(favorites => {
      // TODO: CHECK IF COMIC ALREADY EXISTS IN COLLECTION

      if (favorites) {
        Favorites.findOneAndUpdate(
          query,
          {
            comics: [...favorites.comics, newComic]
          },
          { new: true }
        ).then(updatedFavorites => {
          return res.json({ comics: updatedFavorites.comics });
        });
      } else {
        let favorites = new Favorites({
          user: usersID,
          comics: [newComic],
          characters: []
        });

        favorites.save().then(newFavorites => {
          return res.json({ comics: newFavorites.comics });
        });
      }
    });
  }
);

/**
 * Route: /favorites/add/character
 * Desc: Add Character to user's collection
 * Private Route
 */
router.post(
  "/add/character",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const usersID = req.user.id;
    const query = { user: usersID };
    const { characterID, name, thumbnail } = req.body;

    // TODO: ERROR HANDLING / MISSING FIELDS

    const newCharacter = { characterID, name, thumbnail };

    Favorites.findOne(query).then(favorites => {
      // TODO: CHECK IF COMIC ALREADY EXISTS IN COLLECTION

      if (favorites) {
        Favorites.findOneAndUpdate(
          query,
          { characters: [...favorites.characters, newCharacter] },
          { new: true }
        ).then(updatedFavorites => {
          return res.json({ characters: updatedFavorites.characters });
        });
      } else {
        let favorites = new Favorites({
          user: usersID,
          comics: [],
          characters: [newCharacter]
        });

        favorites.save().then(newFavorites => {
          return res.json({ characters: newFavorites.characters });
        });
      }
    });
  }
);

/**
 * Route: /favorites/delete/character
 * Desc: Delete character from user's collection
 * Private Route
 */
router.delete(
  "/delete/character",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const usersID = req.user.id;
    const query = { user: usersID };
    const { characterID } = req.body;

    Favorites.findOne(query).then(favorites => {
      if (!favorites) {
        return res.json({ status: "fail", msg: "could not find favorites" });
      } else {
        const updatedFavoriteCharacters = favorites.characters.filter(
          character => character.characterID != characterID
        );
        Favorites.findOneAndUpdate(
          query,
          { characters: updatedFavoriteCharacters },
          { new: true }
        ).then(updatedCharacters => {
          return res.json({
            status: "success",
            characters: updatedCharacters.characters
          });
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
    const usersID = req.user.id;
    const query = { user: usersID };
    const comicID = req.body.comicID;

    Favorites.findOne(query).then(favorites => {
      if (!favorites) {
        res.json({ status: "fail", msg: "could not find favorites" });
      } else {
        const updatedFavoriteComics = favorites.comics.filter(
          comic => comic.comicID != comicID
        );

        Favorites.findOneAndUpdate(
          query,
          { comics: updatedFavoriteComics },
          { new: true }
        ).then(updatedComics => {
          return res.json({ status: "success", comics: updatedComics.comics });
        });
      }
    });
  }
);

module.exports = router;
