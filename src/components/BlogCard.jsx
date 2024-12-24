import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
/* eslint-disable react/prop-types */
const BlogCard = ({ blog }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // console.log(blog);
    const { title, image, category, _id, short_des } = blog;

    const handleAddToWishlist = () => {
        const blog_id = _id;
        const email = user?.email;
        const wishlistInfo = { blog_id, email, title, image, category, short_des };
        

        // posting the data to the database
        axiosSecure.post(`${import.meta.env.VITE_BASE_URI}/wishlist`, wishlistInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Added to wishlist');
                }
            })

    }


    return (
        <div className="card card-compact bg-base-100 w-[300px]  rounded-none">
            {/* blog image */}
            <div >
                {/* <Link to={`/blogs/${_id}`}> */}
                <figure className="relative">
                    <img
                        className="h-[150px] w-full object-cover"
                        src={image}
                        alt={title} />
                    <FaBookmark
                        data-tooltip-id="my-tooltip" data-tooltip-content={`Add to Wishlist`}
                        onClick={handleAddToWishlist}
                        size={30}
                        className="absolute top-0 right-0 text-red-600  cursor-pointer z-10" />
                </figure>
                {/* </Link> */}
            </div>

            {/* blog title and category*/}
            <div className="card-body !p-0 !m-0 !mt-2 gap-0">
                {/* category */}
                <p className="text-base">{category}</p>
                {/* title */}
                <Link to={`/blogs/${_id}`}><h2 className="card-title p-0 m-0 hover:underline font-bold">{title.slice(0, 55)}...</h2></Link>
            </div>
            {/* blog short description */}
            <div className="divider m-0"></div>
            <p className="mb-2">{short_des.slice(0, 100)}...</p>
            {/* <div className="divider m-0"></div> */}
            <div className="flex flex-wrap justify-between items-center gap-2">
                <Link to={`/blog/${_id}`} className="btn btn-sm btn-outline  w-full hover:btn-success hover:!text-white rounded-none">Details</Link>
                {/* <button className="btn btn-sm btn-outline btn-primary w-full rounded-none">Wishlist</button> */}
            </div>
            {/* react tool tip */}
            <Tooltip className="" id="my-tooltip" />
        </div>
    );
};

export default BlogCard;