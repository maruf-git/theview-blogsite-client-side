import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BlogCard = ({ blog }) => {
    console.log(blog);
    const { title, image, category,_id } = blog;
    return (
        <div className="card card-compact bg-base-100 w-[300px]  rounded-none">
            {/* blog image */}
            <figure>
                <img
                    className="h-[150px] w-full object-cover"
                    src={image}
                    alt={title} />
            </figure>
            {/* blog title */}
            <div className="card-body !p-0 !m-0 !mt-2 gap-0">
                <p className="text-base">{category}</p>
                <Link to={`/blogs/${_id}`}><h2 className="card-title p-0 m-0 hover:underline">{title.slice(0, 50)}...</h2></Link>
            </div>
        </div>
    );
};

export default BlogCard;