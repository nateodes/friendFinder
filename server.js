var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + 'app/public/style.css'));



var friends = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



app.post("/api/friends", function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  console.log(newFriend);
  friends.push(newFriend);
  res.json(newFriend);
  
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});



app.listen(PORT, function() {
  console.log("Server is listening on port: " + PORT);
});

