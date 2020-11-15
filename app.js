const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const app = express();
const axios = require('axios');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c6b6d533d07c483a83720e48f51fe903');
app.use(express.static("public"));
app.set('view engine', 'ejs');


// const sources = 'abc-news, abc-news-au, aftenposten, al-jazeera-english, ansa, argaam, ars-technica, ary-news ';
// const domains = 'abcnews.go.com, abc.net.au, aftenposten.no, aljazeera.com, ansa.it, www.argaam.com, arstechnica.com ';

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("news.ejs");
});

// app.post("/news", function(req, res) {
//
//   const query = req.body.topic;
//
//   newsapi.v2.everything({
//     q: query,
//     language: 'en'
//   }).then(response => {
//     console.log(response);
//       {
//         status: "ok"
//         console.log(response.articles.length);
//       }
//   });
//   const url = 'https://newsapi.org/v2/everything?q='+query+'&apiKey=c6b6d533d07c483a83720e48f51fe903';
//   https.get(url, (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);
//
//     res.on('data', (d) => {
//       const newsData = d;
//       // JSON.parse(JSON.stringify(d));
//       process.stdout.write(newsData.articles);
//     });
//
//   }).on('error', (e) => {
//     console.error(e);
//   });
//
// });

app.post("/news", async function(req, res) {

  const query = req.body.topic;

  const url = 'https://newsapi.org/v2/everything?q='+query+'&apiKey=c6b6d533d07c483a83720e48f51fe903';

  const response = await axios.get(url);
  // console.log(response.data.articles);
  const newsData = response.data.articles;
  res.render("allnews", {
    newsData: newsData
  });

});

app.post("/headlines", function(req, res) {
  res.render("headlines");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server is runnning on port 3000");
});
