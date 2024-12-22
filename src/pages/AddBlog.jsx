import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";
// import { Helmet } from "react-helmet-async";

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const { themeMode } = useContext(ThemeContext);
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
        const description = form.description.value;
        // getting blog poster data from logged in user
        const blogger_name = user?.displayName;
        const blogger_email = user?.email;

        const post_time = new Date();
        const blog = { title, image, category, description, blogger_name, blogger_email,post_time }

        console.log(blog);

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
                            <h1 className="text-3xl md:text-5xl  font-bold text-center pt-8">Add Blog </h1>
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
                                <input id='image' type="text" name="image" placeholder="image url" className="input input-bordered" required />
                            </div>

                            {/* category */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="category">
                                    <span className="label-text">Category</span>
                                </label>
                                <select id='category' name="category" className="select select-bordered w-full ">
                                    <option >Education</option>
                                    <option >Entertainment</option>
                                    <option >Lifestyle</option>
                                    <option >Sports</option>
                                    <option >Technology</option>
                                </select>
                            </div>
                            {/* Description */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="description">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea id='description' name="description" className="textarea textarea-bordered" placeholder="Write detailed review"></textarea>
                            </div>
                            {/* User Name */}
                            <div className="form-control col-span-2 sm:col-span-1">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input disabled type="text" defaultValue={user?.displayName} className="input input-bordered" required />
                            </div>
                            {/* email */}
                            <div className="form-control col-span-2 sm:col-span-1">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input disabled type="email" defaultValue={user?.email} className="input input-bordered" required />
                            </div>
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