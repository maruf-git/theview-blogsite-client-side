import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";
import axios from "axios";
import useAxiosSecure from "../hooks/UseAxiosSecure";
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

        // final
        // axios.post(`${import.meta.env.VITE_BASE_URI}/add-blog`, blog, { withCredentials: true })
        //     .then(res => {
        //         console.log(res.data);
        //         if (res.data.insertedId) {
        //             console.log(res.data);
        //             toast.success('Post Successful!');
        //             navigate('/all-blogs');
        //         }

        //     })
        //     .catch(err => {
        //         console.log(err);
        //         toast.error(err.message)
        //     })

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
        <div>
            {/* helmet */}
            {/* <Helmet>
                <title>Add Review - Chill Gamer</title>
            </Helmet> */}
            <div className={`hero bg-[rgb(228,235,242)] min-h-screen py-6 ${themeMode === "light" ? "" : "!bg-[#1d232a]"}`}>
                <div className="hero-content w-[96%] sm:w-[700px]">
                    <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl">

                        <div >
                            <h1 className="text-3xl md:text-5xl  font-bold text-center pt-8">Add a New Blog </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="card-body grid grid-cols-2 gap-x-5">
                            {/*title */}
                            <div className="form-control col-span-2 sm:col-span-1">
                                <label className="label" htmlFor="title">
                                    <span className="label-text">Blog Title</span>
                                </label>
                                <input id='title' type="text" name="title" placeholder="blog title" className="input input-bordered" required />
                            </div>
                            {/* blog image url */}
                            <div className="form-control col-span-2 sm:col-span-1">
                                <label className="label" htmlFor="image">
                                    <span className="label-text">Blog Image URL</span>
                                </label>
                                <input id='image' type="url" name="image" placeholder="image url" className="input input-bordered" required />
                            </div>

                            {/* category */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="category">
                                    <span className="label-text">Category</span>
                                </label>
                                <select id='category' name="category" className="select select-bordered w-full ">
                                    <option >Business</option>
                                    <option >Entertainment</option>
                                    <option >Lifestyle</option>
                                    <option >Science</option>
                                    <option >Sports</option>
                                    <option >Technology</option>
                                </select>
                            </div>
                            {/*Short Description */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="short_des">
                                    <span className="label-text">Short Description</span>
                                </label>
                                <input id='short_des' name="short_des" type="text" placeholder="write short description" className="input input-bordered" required />
                                {/* <textarea  className="textarea textarea-bordered" ></textarea> */}
                            </div>
                            {/* Description */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="description">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea id='description' name="description" className="textarea textarea-bordered" placeholder="Write detailed review"></textarea>
                            </div>
                            {/* error message print */}
                            <div className="form-control">
                                {
                                    errorMessage && <p className="text-red-700">{errorMessage}</p>
                                }
                            </div>
                            <div className="form-control mt-6 space-y-3 col-span-2">
                                <button className="btn btn-primary">Post Blog</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;