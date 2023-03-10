//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Hello and Welcome to my BlogPage!!!\nMy name is Alok Kumar and I am a Web Developer.\nI’m so excited to share my thoughts, stories, and daily experiences with you through my blog.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let post = [];

app.get("/", (req, res) => {
    res.render(__dirname + "/views/home.ejs", { startingContent: homeStartingContent, post: post, })
});
app.get("/about", function(req, res) {
    res.render(__dirname + "/views/about.ejs", { About: aboutContent })
})

app.get("/contact", function(req, res) {
    res.render(__dirname + "/views/contact.ejs", { Contact: contactContent })
})

app.get("/compose", function(req, res) {
    res.render(__dirname + "/views/compose.ejs")
})

app.post("/compose", function(req, res) {
    let composition = {
        title: req.body.postTitle,
        body: req.body.postBody
    };
    post.push(composition);
    res.redirect("/");
});
app.get("/post/:topic", function(req, res) {
    post.forEach(compose => {
        let title = compose.title;
        let body = compose.body;
        if ((_.lowerCase(req.params.topic)) == _.lowerCase((title))) {
            res.render(__dirname + "/views/post.ejs", { title: title, body: body });
        } else {
            console.log("Not found!!!");
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});