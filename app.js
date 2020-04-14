const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {
  const artist = req.body.artist;
  const song = req.body.song;
  console.log(artist,song);
  const url = "https://api.lyrics.ovh/v1/"+artist+"/"+song;

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const lyrics = JSON.parse(data);
      res.render("result",{
        songTitle:song,
        artist:artist,
        lyrics:lyrics.lyrics
      });
    });
  });
});

app.listen(process.env.PORT || 3000,()=>{
  console.log("server running at port 3000");
});
