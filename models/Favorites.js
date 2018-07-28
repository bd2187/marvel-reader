const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  comics: [
    {
      comicID: { type: String, required: true },
      title: { type: String, required: true },
      dateAdded: { type: Date, default: Date.now },
      published: { type: Date, required: true },
      description: { type: String, required: true }
    }
  ],
  characters: [
    {
      characterID: { type: String, required: true },
      name: { type: String, required: true },
      dateAdded: { type: Date, default: Date.now },
      thumbnail: { type: String }
    }
  ]
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
