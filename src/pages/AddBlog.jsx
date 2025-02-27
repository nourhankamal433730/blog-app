import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AddBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("title", formData.title);
      data.append("body", formData.body);
      data.append("tags", formData.tags);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      await axios.post("http://localhost:5000/api/blogs", data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setSuccess("Blog added successfully!");
      setTimeout(() => navigate("/my-blogs"), 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add blog.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-fuchsia-950">Create a Blog</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-fuchsia-950"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="body"
            placeholder="Blog Content"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-fuchsia-950"
            value={formData.body}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-fuchsia-950"
            value={formData.tags}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-fuchsia-950"
            onChange={handleChange}
            required
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover mt-2" />}
          <button
            type="submit"
            className="w-full bg-fuchsia-950 text-white p-3 rounded hover:bg-fuchsia-600 transition"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
