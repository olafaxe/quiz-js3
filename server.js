const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

client.connect(function(err) {
  if (err) throw err;
  db = client.db("js3");
});

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/quiz", (req, res) => {
  const quizCollection = db.collection("quiz");
  quizCollection.find({}).toArray(function(err, todo) {
    res.send(todo);
  });
});

app.post("/quiz", (req, res) => {
  const filter = req.body;
  const filterCollection = db.collection("quiz");
  filterCollection.insertMany([filter]).then(() => res.send(filter));
});

app.delete("/quiz/:id", (req, res) => {
  const quizCollection = db.collection("quiz");
  quizCollection
    .deleteMany({ _id: mongo.ObjectID(req.params.id) })
    .then(() => res.send(mongo.ObjectID(req.params.id)));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
