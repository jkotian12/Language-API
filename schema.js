const mongoose = require("mongoose");
const schema = mongoose.Schema;
const language_schema = new schema({
  english_spelling: String,
  native_spelling: String,
});

module.exports = mongoose.model("Language", language_schema);
