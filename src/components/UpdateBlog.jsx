import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


const UpdateBlog = () => {
    const { id } = useParams();
    const { themeMode } = useContext(ThemeContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [blog, setBlog] = useState({});

    // get specific blog
    useEffect(() => {
        axiosSecure.get(`${import.meta.env.VITE_BASE_URI}/blog/${id}`)
            .then(res => {
                setBlog(res.data);
            })

    }, [axiosSecure, id])


    // handle add post form 
    const handleSubmit = (event) => {
        event.preventDefault();
        // taking form input value
        const form = event.target;
        const title = form.title.value;
        const image = form.image.value;
        const category = form.category.value;
        const short_des = form.short_des.value;
        const description = form.description.value;

        const blog = { title, image, category, description, short_des };
        console.table(blog);

        if (title.trim() === "") {
            setErrorMessage("Title can not be empty!");
            return;
        }
        if (short_des.trim() === "") {
            setErrorMessage("Short description can not be empty!");
            return;
        }
        if (description.trim() === "") {
            setErrorMessage("Description can not be empty!");
            return;
        }


        axiosSecure.patch(`${import.meta.env.VITE_BASE_URI}/update-blog/${id}`, blog)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Blog Updated Successfully!");
                    navigate(`/blog/${id}`);
                }

            })

    }
    return (
        <div className={`min-h-screen py-10 ${themeMode === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
            <div className="max-w-3xl mx-auto px-4">
                <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${themeMode === "light" ? "" : "bg-gray-800 text-gray-100"}`}>
                    <div className="py-8 px-6">
                        <h1 className="text-3xl font-semibold text-center mb-6">Update Blog</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Blog Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-1">Blog Title</label>
                                <input
                                    defaultValue={blog?.title}
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Enter blog title"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Blog Image URL */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium mb-1">Blog Image URL</label>
                                <input
                                    defaultValue={blog?.image}
                                    id="image"
                                    type="url"
                                    name="image"
                                    placeholder="Enter image URL"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option selected={blog?.category === "Business"}>Business</option>
                                    <option selected={blog?.category === "Entertainment"}>Entertainment</option>
                                    <option selected={blog?.category === "Lifestyle"}>Lifestyle</option>
                                    <option selected={blog?.category === "Science"}>Science</option>
                                    <option selected={blog?.category === "Sports"}>Sports</option>
                                    <option selected={blog?.category === "Technology"}>Technology</option>
                                </select>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label htmlFor="short_des" className="block text-sm font-medium mb-1">Short Description</label>
                                <input
                                    defaultValue={blog?.short_des}
                                    id="short_des"
                                    name="short_des"
                                    type="text"
                                    placeholder="Write a short description"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Detailed Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-1">Detailed Description</label>
                                <textarea
                                    defaultValue={blog?.description}
                                    id="description"
                                    name="description"
                                    rows="5"
                                    placeholder="Write detailed content for the blog"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div>
                                    <p className="text-red-500 text-center">{errorMessage}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Update Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UpdateBlog;