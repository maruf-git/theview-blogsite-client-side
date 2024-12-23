import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
// import { format, parseISO } from "date-fns";

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const axiosSecure = useAxiosSecure();

    // get specific blog
    useEffect(() => {
        axiosSecure.get(`${import.meta.env.VITE_BASE_URI}/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
            })

    }, [axiosSecure, id])
    // destructure the blog
    const { title, image, category, post_time, description, blogger_image, blogger_name, blogger_email } = blog;
    // const date = parseISO(post_time);

    // get all comments on this blog
    const getAllComments = () => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/comments/${id}`)
            .then(res => {
                console.log(res.data);
                setComments(res.data);
            })
    }
    useEffect(() => {
        getAllComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // handleComment
    const handleComment = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
        const comment_time = new Date();
        const commentDetails = { comment, commenter: user?.displayName, commenter_email: user?.email, comment_time, blog_id: id };

        axios.post(`${import.meta.env.VITE_BASE_URI}/add-comment`, commentDetails)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Comment Successful');
                    getAllComments();
                }
            })
            .catch(err => {
                // console.log(err);
                toast.error(err.message);
            })
    }

    return (
        <div className="max-w-screen-md mx-auto my-20 border border-red-500">
            <div className="space-y-6">
                {/* blog title */}
                <h1 className="text-[#242424] font-bold text-4xl">{title}</h1>
                {/* blog short description */}
                <p className="text-[#6B6B6B] font-semibold text-xl">The shared elegance of neural networks & human psycholinguistics — and a new unified cognitive theory of sparse representation and infinite possibilities.</p>
                {/* blogger details and update blog*/}
                <div className="flex justify-between">
                    {/* blogger details */}
                    <div className="flex gap-3 items-center">
                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                <img referrerPolicy="no-referrer" src={blogger_image} />
                            </div>
                        </div>
                        <div>
                            <p className="text-[#6B6B6B] font-[500] text-base">{blogger_name}</p>
                            <p className="text-[#6B6B6B] text-[14px]">Published on {post_time}, Category: {category}</p>
                        </div>
                    </div>
                    {/* conditionally rendering edit post button */}
                    {
                        user?.email === blogger_email && <div>
                            <Link to={`/update-blog/${id}`} className="btn">Edit Post</Link>
                        </div>
                    }
                </div>
                {/* blog image */}
                <figure>
                    <img src={image} alt={title} />
                </figure>
                {/* blog description */}
                <p className="">{description}</p>

                {/* comments */}
                <div className="!mt-20 !mb-10">
                    <h3 className="text-[#242424] text-2xl font-semibold">Comments(5)</h3>
                    <form onSubmit={handleComment} className="my-10" >
                        <div className="flex flex-col gap-5">
                            {
                                user?.email === blogger_email ? <div><p className="text-[20px]">Can not comment on own blog.</p></div> : <textarea name='comment' className="textarea textarea-bordered h-[150px]" placeholder="What are your thoughts?"></textarea>
                            }
                            {
                                user?.email !== blogger_email ? <div className="flex justify-end">
                                    <button className="btn btn-primary">Comment</button>
                                </div> : <div></div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;