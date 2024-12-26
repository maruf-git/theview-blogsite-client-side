import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";
import axios from "axios";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
// import { Helmet } from "react-helmet-async";

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const { themeMode } = useContext(ThemeContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

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
        const length = description.length;
        // getting blog poster data from logged in user
        const blogger_name = user?.displayName;
        const blogger_email = user?.email;
        const blogger_image = user?.photoURL;

        const post_time = new Date();
        const blog = { title, image, category, short_des, description, blogger_name, blogger_email, blogger_image, post_time, length }

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

        // experiment
        axiosSecure.post(`${import.meta.env.VITE_BASE_URI}/add-blog`, blog)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    console.log(res.data);
                    toast.success('Post Successful!');
                    navigate('/all-blogs');
                }
            })

        // .catch(err => {
        //     console.log(err);
        //     toast.error(err.message)
        // })

    }

    return (
        <div className={`min-h-screen py-10 ${themeMode === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
            <Helmet>
                <title>Add Blog - TheView</title>
            </Helmet>
            <div className="max-w-3xl mx-auto px-4">
                <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${themeMode === "light" ? "" : "bg-gray-800 text-gray-100"}`}>
                    <div className="py-8 px-6">
                        <h1 className="text-3xl font-semibold text-center mb-6">Add a New Blog</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Blog Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-2">Blog Title</label>
                                <input
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
                                <label htmlFor="image" className="block text-sm font-medium mb-2">Blog Image URL</label>
                                <input
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
                                <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option>Business</option>
                                    <option>Entertainment</option>
                                    <option>Lifestyle</option>
                                    <option>Science</option>
                                    <option>Sports</option>
                                    <option>Technology</option>
                                </select>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label htmlFor="short_des" className="block text-sm font-medium mb-2">Short Description</label>
                                <input
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
                                <label htmlFor="description" className="block text-sm font-medium mb-2">Detailed Description</label>
                                <textarea
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
                                    Post Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;