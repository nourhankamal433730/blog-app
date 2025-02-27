// import React, { useEffect, useState } from "react";

// import api from "../api/axios";

// const MyBlogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchMyBlogs = async () => {
//       try {
//         const response = await api.get("/blogs/my-blogs"); // Example endpoint for user's blogs
//         setBlogs(response.data.blogs);
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error.response?.data?.message || error.message);
//       }
//     };

//     fetchMyBlogs();
//   }, []);

//   return (
//     <div>
//       <h1>My Blogs</h1>
//       {blogs.map((blog) => (
//         <div key={blog._id}>
//           <h2>{blog.title}</h2>
//           <p>{blog.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyBlogs;



import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/blogs/my-blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error.response?.data?.message || error.message);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if(window.confirm("Are you sure you want to delete this blog?")){
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } catch (err) {
        console.error("Error deleting blog", err);
      }
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/edit/${blogId}`);
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-fuchsia-950">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-9">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-200 p-4 shadow rounded-lg">
            {blog.photo && (
              <img
                src={`http://localhost:5000${blog.photo}`}
                alt={blog.title}
                className="w-full h-50 object-cover rounded"
              />
            )}
            <h2 className="text-2xl font-semibold mt-2 text-fuchsia-950">{blog.title}</h2>
            <p className="text-gray-700 mt-3 text-xl">{blog.body.substring(0, 100)}...</p>
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="inline-block bg-fuchsia-950 text-white text-xs px-3 py-2 mr-1 rounded font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => handleEdit(blog._id)}
                className="bg-blue-950 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(blog._id)}
                className="bg-rose-700 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;

