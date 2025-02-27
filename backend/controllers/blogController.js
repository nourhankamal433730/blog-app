const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Store uploaded image path

    const blog = await Blog.create({
      title,
      body,
      photo,
      author: req.user.id,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
    });

    res.status(201).json({ blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

const getBlogs = async (req, res) => {
  const { tags } = req.query;
  const filter = {};

  if (tags) {
    filter.tags = { $in: tags.split(",") };
  }

  try {
    const blogs = await Blog.find(filter).populate("author", "name");
    res.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};


const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).populate("author", "name");
    res.json({ blogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Failed to fetch user blogs" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    // Handle file update if a new image is uploaded
    if (req.file) {
      req.body.photo = `/uploads/${req.file.filename}`;
    }

    // Process tags if provided as a comma-separated string
    if (req.body.tags && typeof req.body.tags === "string") {
      req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

module.exports = { createBlog, getBlogs, getUserBlogs, getBlogById, updateBlog, deleteBlog };

