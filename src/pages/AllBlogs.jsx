import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs`)
            .then(res => {
                console.log(res.data);
                setBlogs(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className="max-w-screen-xl mx-auto px-1">
            {/* blogs card container */}
            <div className="my-10 py-10 grid grid-cols-4 gap-5">
                {
                    blogs.map(blog=><BlogCard key={blog._id} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default AllBlogs;