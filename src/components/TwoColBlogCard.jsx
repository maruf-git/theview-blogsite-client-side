/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import { Link } from "react-router-dom";
import * as motion from "motion/react-client"
import { format } from 'date-fns';

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
            <motion.div whileHover={{ scale: 1.02 }} className="">
                {/* publishing time */}
                <p className="">Published on {format(new Date(post_time), "MMMM do, yyyy")}</p>
                {/* title */}
                <div >
                    <Link to={`/blog/${_id}`}><h2 className="card-title p-0 m-0 font-bold hover:text-blue-700 hover:underline ">{title}</h2></Link>
                    <div className="divider w-[100px] border-b-2 border-red-600"></div>
                </div>

            </motion.div>
        </div >
    );
};

export default TwoColBlogCard;