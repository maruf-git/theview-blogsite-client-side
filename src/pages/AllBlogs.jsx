import axios from "axios";
import { useEffect, useState } from "react";


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
        <div>
            all blogs : {blogs.length}
        </div>
    );
};

export default AllBlogs;