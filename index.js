const express = require("express");
const app = express();
const port = 8080;
const path = require("path"); // require path module to join paths

app.use(express.urlencoded({ extended: true })); // to parse data which are got through post req

app.set("view engine", "ejs"); // set view engine to views
app.set("views", path.join(__dirname, "views")); // join main dir to views

app.use(express.static(path.join(__dirname, "public"))); // join main dir to public

// Create database to show all posts:
let posts = [
  // If we make it const, then we won't be able to delete in future
  {
    id: "1a", // for the searching post by it's id
    username: "Jayy",
    content: "I love tech",
  },
  {
    id: "2b",
    username: "Yash",
    content: "I love Chemistry",
  },
  {
    id: "3c",
    username: "Vedant",
    content: "I love game",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  // It will give a form
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  // It will send post request to /posts
  let { username, content } = req.body;
  posts.push({ username, content }); // will create new post
  // console.log(req.body);
  // res.send("Done!");
  res.redirect("/posts"); // When we will press submit button, it will redirect us to /posts path back
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id); // finding post from the posts based on id
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("show.ejs", { post });
});

app.listen(port, () => {
  console.log("Server is running");
});
