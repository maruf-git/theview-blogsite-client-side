import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import WishlistBlogCard from "../components/WishlistBlogCard";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const WishList = () => {

    const [blogs, setBlogs] = useState([]);
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`${import.meta.env.VITE_BASE_URI}/wishlist/${user?.email}`)
                .then(res => {
                    // console.log(res.data);
                    setBlogs(res.data);
                })

        }

    }, [axiosSecure, user.email])

    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`${import.meta.env.VITE_BASE_URI}/delete-wishlist/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.deletedCount) {
                    toast.success('Delete Successful');

                    // refetching wishlist
                    axiosSecure.get(`${import.meta.env.VITE_BASE_URI}/wishlist/${user?.email}`)
                        .then(res => {
                            console.log('pagla:', res);
                            console.log(res.data);
                            setBlogs(res.data);
                        })
                }

            })
    }

    if (loading) return <LoadingSpinner></LoadingSpinner>


    return (
        <div className="max-w-screen-xl mx-auto px-4 2xl:px-0">
            <Helmet>
                <title>Wishlist Blogs - TheView</title>
            </Helmet>
            <div className="my-20">
                <div className="mb-10">
                    <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Watchlist Blogs</h1>
                </div>
                {/* blogs card container */}
                <div className="">
                    {
                        blogs.map(blog => <WishlistBlogCard key={blog._id} blog={blog} handleDelete={handleDelete}></WishlistBlogCard>)
                    }
                </div>
                {
                    blogs.length === 0 && <div>
                        <p className="my-20  text-2xl font-bold text-center">No Blogs Available. Please Add Some Blogs.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default WishList;