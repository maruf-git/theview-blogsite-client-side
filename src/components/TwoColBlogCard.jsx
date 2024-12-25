/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { div } from "framer-motion/client";
import { Link } from "react-router-dom";


const TwoColBlogCard = ({ blog, idx }) => {
    const { title, image, _id, post_time } = blog;
    return (
        <div>
            {/* image conditional render */}
            {
                idx === 0 && <div>
                    <Link to={`/blog/${_id}`} >
                        <figure>
                            <img className="h-[300px] w-full object-cover mb-5" src={image} alt="" />
                        </figure>
                    </Link>
                </div>
            }
<div className="">
    {/* publishing time */}
    <p className="">Published on {post_time}</p>
    {/* title */}
    <Link to={`/blog/${_id}`}><h2 className="card-title p-0 m-0 font-bold hover:text-blue-700 hover:underline ">{title}</h2></Link>
    <div className="divider w-[100px] border-b-2 border-red-600"></div>
</div>
        </div >
    );
};

export default TwoColBlogCard;