const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lang_api");
const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Languages = require("./schema");

app.post("/", async (req, res) => {
  const native_translation = await Languages.findOne({
    english_spelling: `${req.body.capitalized}`,
  });
  res.json(native_translation.native_spelling);
  console.log(native_translation.native_spelling);
});

// app.get("/", async (req, res) => {
//   const language = await new Languages({
//     english_spelling: "Arabic",
//     native_spelling: "عربى",
//   });
//   await language.save();
// });

app.listen(8080 || process.env.PORT, () => {
  console.log("listening");
});
