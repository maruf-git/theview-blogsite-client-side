/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";


const TechnologyBlogCard = ({ blog }) => {
    const {themeMode}=useContext(ThemeContext)
    const { image, title, _id } = blog;
    return (
        <div className={`w-full `}>
            <figure>
                <img className="h-[280px] sm:h-[180px] w-full object-cover" src={image} alt="" />
            </figure>

            {/* title */}
            <Link to={`/blog/${_id}`}><h2 className="card-title p-0 m-0 font-bold hover:text-blue-700 hover:underline">{title.slice(0, 50)}...</h2></Link>

        </div>
    );
};

export default TechnologyBlogCard;