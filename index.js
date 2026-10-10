const express = require("express");
const app = express();
const port = 8080;
const path = require("path"); // require path module to join paths
const { v4: uuidv4 } = require("uuid"); // required uuid from express module
const methodOverride = require("method-override"); // requires method-override

// uuidv4(); // ⇨ 'b18794e8-5d0d-417c-b361-ba38e78411b4'

app.use(express.urlencoded({ extended: true })); // to parse data which are got through post req
app.use(methodOverride('_method'));
// override with POST having ?_method=DELETE/POST

app.set("view engine", "ejs"); // set view engine to views
app.set("views", path.join(__dirname, "views")); // join main dir to views

app.use(express.static(path.join(__dirname, "public"))); // join main dir to public

// Create database to show all posts:
let posts = [
  // If we make it const, then we won't be able to delete in future
  {
    id: uuidv4(), // for the searching post by it's id
    username: "Jayy",
    content: "I love tech",
  },
  {
    id: uuidv4(),
    username: "Yash",
    content: "I love Chemistry",
  },
  {
    id: uuidv4(),
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
  let id = uuidv4(); // unique id will generate through uuidv4() and will be stored in id
  let { username, content } = req.body;
  posts.push({ id, username, content }); // will create new post
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

// patch request (to update specific context):
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params; // destructure

  let newContent = req.body.content; // store new content into newContent variable

  let post = posts.find((p) => id === p.id); // finding post from the posts based on id
  post.content = newContent; // set existing content to new content
  console.log(post);
  // res.send("patch request is working");
  res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
})

// Delete Post:
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id); // Filter posts they have not this id
  res.redirect("/posts"); // it will redirect to all the posts (filtered)
  // res.send("deleted");
  // console.log(posts);
})

app.listen(port, () => {
  console.log("Server is running");
});
