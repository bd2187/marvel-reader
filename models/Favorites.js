const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  comics: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      dateAdded: { type: Date, default: Date.now },
      published: { type: Date, required: true },
      description: { type: String, required: true }
    }
  ],
  characters: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      dateAdded: { type: Date, default: Date.now },
      thumbnail: { type: String }
    }
  ]
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
