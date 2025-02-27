// import { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/blogs")
//       .then((res) => setBlogs(res.data.blogs))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="container mx-auto p-4 mt-20">
//       <h1 className="text-3xl font-bold text-center mb-6 text-fuchsia-950">All Blogs</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-9">
//         {blogs.map((blog) => (
//           <div key={blog._id} className="bg-gray-200 p-4 shadow rounded-lg">
//             {blog.photo && (
//               <img
//                 src={`http://localhost:5000${blog.photo}`} 
//                 alt={blog.title}
//                 className="w-full h-50 object-cover rounded "
//               />
//             )}
//             <h2 className="text-2xl font-semibold mt-2 text-fuchsia-950">{blog.title}</h2>
//             <p className="text-gray-700 mt-3 text-xl">{blog.body.substring(0, 100)}...</p>
//             {blog.tags && blog.tags.length > 0 && (
//               <div className="mt-2">
//                 {blog.tags.map((tag, idx) => (
//                   <span key={idx} className="inline-block bg-fuchsia-950 text-white text-xs px-3 py-2 font-bold mr-1 rounded">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
         
//               )}
//          </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error(err));
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = blog.title.toLowerCase().includes(term);
    const authorMatch = blog.author && blog.author.name && blog.author.name.toLowerCase().includes(term);
    const tagsMatch = blog.tags && blog.tags.some((tag) => tag.toLowerCase().includes(term));
    return titleMatch || authorMatch || tagsMatch;
  });

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-fuchsia-950">All Blogs</h1>
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input 
          type="text"
          placeholder="Search by title, author, or tags..."
          className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="bg-gray-200 p-3 shadow rounded-lg">
            {blog.photo && (
              <img
                src={`http://localhost:5000${blog.photo}`}
                alt={blog.title}
                className="w-full h-50 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-2 text-fuchsia-950">{blog.title}</h2>
            <p className="text-gray-700 mt-1">{blog.body.substring(0, 80)}...</p>
            {blog.author && blog.author.name && (
              <p className="text-sm text-gray-500 mt-1">By: {blog.author.name}</p>
            )}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="inline-block bg-fuchsia-950 text-white text-xs px-2 py-1 font-bold mr-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

