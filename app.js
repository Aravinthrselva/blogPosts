const express = require("express");
const ejs = require("ejs");
const lodash = require("lodash");
const port = 3000;
const homeStartingContent = "If you live in harmony with nature you will never be poor, if you live according what others think, you will never be rich. Enjoy present pleasures in such a way as not to injure future ones. It is not the man who has too little that is poor, but the one who hankers after more. pellentesque adipiscing.";
const aboutContent = "If you really want to escape the things that harass you, what you’re needing is not to be in a different place but to be a different person..";
const contactContent = "There is no enjoying the possession of anything valuable unless one has someone to share it with";

const Compose = require("./models/composeSchema");
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



app.get('/', (req, res) => {

  Compose.find({}, function(err, foundPosts) {

      res.render('home', {content : homeStartingContent, posts : foundPosts});
  })
})

app.get('/about', (req, res) => {
  res.render('about', {content: aboutContent});
})

app.get('/contact', (req, res) => {
  res.render('contact', {content : contactContent});
})

app.get('/compose', (req, res) => {
  res.render('compose');
})

app.post('/compose', (req, res) => {

  const compose = new Compose ({
    title : req.body.postTitle,
    body : req.body.postBody
  });

  compose.save(function(err){
    if(!err){
      res.redirect('/');
    }
  });
})


app.get('/posts/:id', (req, res) => {
  const reqId = req.params.id;
  console.log("reqID is :", reqId);
  Compose.findOne({_id: reqId}, function (err, post) {
    if(!err) {
      return res.render('post', {content : post});
    } else {
      res.send("<h1> Sorry, No post found 😤</h1> ")
    }
  });
})


app.listen(port, function() {
  console.log("Listening on port: ", port);
});
