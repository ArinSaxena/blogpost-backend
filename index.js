const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const Schema = mongoose.Schema;



app.use(express.json());

const port = 6099;

app.listen(port, () => {
  console.log(`Sever has started on port ${port}`);
});
const dbURI = `mongodb+srv://arinsaxena0002:sD6NNWU6x4L6XHOv@cluster1.rgubn.mongodb.net/blogpost`;

//connect to the database

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("connect to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

//  schema

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    sector: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

//creating a model

const Blog = mongoose.model("Blog", blogSchema);


app.use(express.json());
app.get("/", (req, res) => {
  // console.log("");
  res.send("hello")
});

// create blogs
app.post("/blogs", async (req, res) => {
  try {
    const { title, sector, content, author } = req.body;
    console.log(req.body);
    const newblog = await Blog.create({ title, sector, content, author });
    return res.json({ message: "Blog created successfully" });
  } catch (err) {
    console.log(err);
  }
});


// blogs
app.get("/blogs", async (req, res) => {
  let blogpost = await Blog.find({});
  return res.json({ blogpost });
});


// id
app.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    let blogpost = await Blog.findById(id);
    console.log(blogpost)
    if (!blogpost) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ blogpost });
  } catch (err) {
    console.log(err);
  }
});


// DELETE route to remove a blog by its ID
app.delete("/blogs/:id", async (req, res) => {
  try {
    // Extract the blog ID from the request parameters
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    // If the blog is not found, send a 404 response
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send a success response if the blog was deleted
    return res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
});

// async function createBlog(){
//     try{
//         const newblog=await Blog.create({
//             title:"",
//             sector:"",
//             content:"",
//             author:"",
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

// create blog
