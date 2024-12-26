import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Comment from "../components/Comment";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
// import { format, parseISO } from "date-fns";

const BlogDetails = () => {
    const { id } = useParams();
    const { user, loading } = useContext(AuthContext);
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const axiosSecure = useAxiosSecure();

    // get specific blog
    useEffect(() => {
        axiosSecure.get(`${import.meta.env.VITE_BASE_URI}/blog/${id}`)
            .then(res => {
                setBlog(res.data);
            })

    }, [axiosSecure, id])
    // destructure the blog
    const { title, image, category, post_time, description, short_des, blogger_image, blogger_name, blogger_email } = blog;
    // const date = parseISO(post_time);
    console.log(description);

    // get all comments on this blog
    const getAllComments = () => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/comments/${id}`)
            .then(res => {
                // console.log(res.data);
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
        const commentDetails = { comment, commenter: user?.displayName, commenter_email: user?.email, commenter_image: user?.photoURL, comment_time, blog_id: id };

        // posting commentDetails to the db
        axiosSecure.post(`${import.meta.env.VITE_BASE_URI}/add-comment`, commentDetails)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Comment Successful');
                    event.target.reset();
                    getAllComments();
                }
            })
        // .catch(err => {
        //     console.log(err);
        //     toast.error(err.message);
        // })
    }

    if (loading) return <LoadingSpinner></LoadingSpinner>;
    // great !
    if (!description) {
        // Provide a fallback if description is undefined
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="max-w-screen-md mx-auto mt-10 mb-20 md:my-20 px-4 lg:px-0">
            <Helmet>
                <title>{title} - TheView</title>
            </Helmet>
            <div className="space-y-6">
                {/* blog title */}
                <h1 className="text-[#242424] font-bold text-4xl">{title}</h1>
                {/* blog short description */}
                <p className="text-[#6B6B6B] font-semibold text-xl">{short_des}</p>
                {/* blogger details and update blog*/}
                <div className="flex justify-between items-center">
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
                            <Link to={`/update-blog/${id}`} className="btn btn-sm outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold ">Update</Link>
                        </div>
                    }
                </div>
                {/* blog image */}
                <figure>
                    <img className="w-full object-cover" src={image} alt={title} />
                </figure>
                {/* blog description */}
                {/* <p className="text-[20px] text-[#242424]">{description}</p> */}
                {description &&
                    description.split('\n').map((paragraph, index) => (
                        <p className="text-[20px] text-[#242424]" key={index}>{paragraph}</p>
                    ))
                }

                {/* comments section*/}
                <div className="!mt-20 !mb-10">
                    {/* comment box */}
                    <p className="text-[#242424] text-2xl font-semibold my-5">Post a comment</p>
                    {
                        user?.email !== blogger_email && <form onSubmit={handleComment} className="mb-10" >
                            <div className="flex flex-col gap-5">
                                {/* text area */}
                                <textarea name='comment' className="textarea textarea-bordered h-[150px]" placeholder="What are your thoughts?"></textarea>
                                {/* comment button */}
                                <div className="flex justify-end">
                                    <button className="btn outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold ">Post Comment</button>
                                </div>

                            </div>
                        </form>
                    }
                    {/* no comment box for blogger */}
                    {
                        user?.email === blogger_email && <div><p className="text-[20px] text-[#242424] my-3">Can not comment on own blog.</p></div>
                    }
                    {/* all comments */}
                    <div className="!my-20 space-y-5">
                        <h3 className="text-[#242424] text-2xl font-semibold">Comments({comments.length})</h3>
                        {
                            comments.length === 0 && user?.email !== blogger_email && <p className="text-[20px] text-[#242424] ">Be the first person to comment on this blog!</p>
                        }
                        {
                            comments.map(comment => <Comment key={comment._id} comment={comment}></Comment>)
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogDetails;