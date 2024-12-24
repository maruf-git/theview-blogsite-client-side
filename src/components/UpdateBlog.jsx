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

        axiosSecure.patch(`${import.meta.env.VITE_BASE_URI}/update-blog/${id}`, blog)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Blog Updated Successfully!");
                    navigate(`/blog/${id}`);
                }
                
            })

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
                            <h1 className="text-3xl md:text-5xl  font-bold text-center pt-8">Update Blog </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="card-body grid grid-cols-2 gap-x-5">
                            {/*title */}
                            <div className="form-control col-span-2 sm:col-span-1">
                                <label className="label" htmlFor="title">
                                    <span className="label-text">Blog Title</span>
                                </label>
                                <input defaultValue={blog?.title} id='title' type="text" name="title" placeholder="blog title" className="input input-bordered" required />
                            </div>
                            {/* blog image url */}
                            <div className="form-control col-span-2 sm:col-span-1">
                                <label className="label" htmlFor="image">
                                    <span className="label-text">Blog Image URL</span>
                                </label>
                                <input defaultValue={blog?.image} id='image' type="text" name="image" placeholder="image url" className="input input-bordered" required />
                            </div>

                            {/* category */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="category">
                                    <span className="label-text">Category</span>
                                </label>
                                <select id='category' name="category" className="select select-bordered w-full ">
                                    <option selected={blog?.category === "Business"} >Business</option>
                                    <option selected={blog?.category === "Entertainment"} >Entertainment</option>
                                    <option selected={blog?.category === "Lifestyle"}>Lifestyle</option>
                                    <option selected={blog?.category === "Science"}>Science</option>
                                    <option selected={blog?.category === "Sports"}>Sports</option>
                                    <option selected={blog?.category === "Technology"}>Technology</option>
                                </select>
                            </div>
                            {/*Short Description */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="short_des">
                                    <span className="label-text">Short Description</span>
                                </label>
                                <input defaultValue={blog?.short_des} id='short_des' name="short_des" type="text" placeholder="write short description" className="input input-bordered" required />
                                {/* <textarea  className="textarea textarea-bordered" ></textarea> */}
                            </div>
                            {/* Description */}
                            <div className="form-control col-span-2">
                                <label className="label" htmlFor="description">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea defaultValue={blog?.description} id='description' name="description" className="textarea textarea-bordered" placeholder="Write detailed review"></textarea>
                            </div>
                            {/* error message print */}
                            <div className="form-control">
                                {
                                    errorMessage && <p className="text-red-700">{errorMessage}</p>
                                }
                            </div>
                            <div className="form-control mt-6 space-y-3 col-span-2">
                                <button className="btn btn-primary">Update Blog</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;