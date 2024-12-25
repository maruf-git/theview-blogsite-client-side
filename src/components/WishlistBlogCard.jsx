/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const WishlistBlogCard = ({ blog, handleDelete }) => {
    const { image, title, short_des, category, blog_id, _id } = blog;
    return (
        <div className="border-b mb-5">
            <div className="flex justify-between mb-5 items-center">
                {/* blog content */}
                <div className="flex gap-5 items-center">
                    <div className="">
                        <img className="h-[120px] w-[215px] object-cover" src={image} alt="" />
                    </div>
                    <div className="w-[70%]">
                        <p className="text-base">Category: {category}</p>
                        <h1 className="card-title font-bold text-2xl my-1">{title.slice(0, 60)}...</h1>
                        <p className="mb-2">{short_des.slice(0, 180)}...</p>
                    </div>
                </div>
                {/* button container */}
                <div className="flex flex-col gap-3 mt-5 md:mt-0">
                    <Link
                        to={`/blog/${blog_id}`}
                        className="btn btn-sm bg-[#009bff] hover:bg-[#0073bd] text-white py-2 px-4 rounded-md shadow-md transition duration-200"
                    >
                        Details
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-sm bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md shadow-md transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )

};

export default WishlistBlogCard;

{/* <div className="flex flex-col gap-3 mt-5 md:mt-0">
<Link
    to={`/blog/${blog_id}`}
    className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md shadow-md transition duration-200"
>
    Details
</Link>
<button
    onClick={() => handleDelete(_id)}
    className="btn btn-sm bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md shadow-md transition duration-200"
>
    Delete
</button>
</div> */}