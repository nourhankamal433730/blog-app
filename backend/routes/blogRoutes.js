// const express = require("express");
// const { createBlog, getBlogs, updateBlog, deleteBlog } = require("../controllers/blogController");
// const { protect } = require("../middleware/authMiddleware");
// const router = express.Router();

// router.post("/", protect, createBlog);
// router.get("/", getBlogs);
// router.put("/:id", protect, updateBlog);
// router.delete("/:id", protect, deleteBlog);

// module.exports = router;


const express = require("express");
const {
  createBlog,
  getBlogs,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getBlogById
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Import upload middleware

const router = express.Router();

router.post("/", protect, upload.single("photo"), createBlog); // Create blog with image upload
router.get("/", getBlogs); // Get all blogs
router.get("/my-blogs", protect, getUserBlogs); // Get blogs for the logged-in user
router.put("/:id", protect, upload.single("photo"), updateBlog); // Update blog (optional new image)
router.delete("/:id", protect, deleteBlog); // Delete blog
router.get("/:id", protect, getBlogById);

module.exports = router;
