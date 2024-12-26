import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import bannersvg from "../assets/bannersvg.svg"
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import newsLetterLottie from "../assets/newsletter.json"
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import TechnologyBlogCard from "../components/TechnologyBlogCard";
import TwoColBlogCard from "../components/TwoColBlogCard";
import { Helmet } from "react-helmet-async";


const Home = () => {
    const { loading, user } = useContext(AuthContext);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs/recent`)
            .then(res => {
                // console.log(res.data);
                setRecentBlogs(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs?filter=${''}&search=${''}`)
            .then(res => {
                // console.log(res.data);
                setBlogs([...res.data].reverse());
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // handle email to subscribe
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        console.log(email);
        toast.success('Thanks for subscribing!')
        event.target.reset();
    }


    return (
        <div>
            <Helmet>
                <title>Home - TheView</title>
            </Helmet>
            {/* hero section */}
            <section
                style={{
                    backgroundImage: `url(https://i.ibb.co.com/v4h7JN4/banner.webp)`,
                }}
                className={`bg-cover bg-no-repeat bg-center px-4 2xl:px-0`}
            >
                <div className="max-w-screen-xl mx-auto md:min-h-[700px]   flex flex-col md:flex-row justify-between items-center">
                    {/* text content */}
                    <div className="w-full py-10 md:py-0 md:w-[70%]">
                        {/* title */}
                        <h1 className="font-bold text-3xl leading-normal md:text-5xl text-white md:leading-[65px]">Make Confident Business Decisions With Practitioner-Analyst Led Tech Research</h1>
                        {/* features */}
                        <div className="my-8 space-y-1 md:space-y-2">
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-base md:text-xl">Accessible, affordable research subscriptions</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-base md:text-xl">Comprehensive vendor evaluations</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-base md:text-xl">In-depth analysis from industry practitioners</p>
                            </div>
                        </div>
                        {/* join our community button */}
                        <div>
                            <Link to='/' className="btn outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold uppercase tracking-wide">Join our community</Link>
                        </div>
                    </div>
                    {/* banner right side image content */}
                    <div className="hidden md:block">
                        <img className="h-[270px] w-auto md:h-auto object-cover" src={bannersvg} alt="" />
                    </div>
                </div>

            </section>

            {/* recent blogs section */}
            <section className="mt-20 px-4 2xl:px-0">
                <div className="max-w-screen-xl mx-auto">
                    <div className="mb-10">
                        <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Recent Blogs</h1>
                    </div>
                    {/* cards container */}
                    <div className="grid sm:grid-cols-2 md:gap-5 lg:grid-cols-3 gap-5">
                        {
                            recentBlogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                        }
                    </div>
                </div>
            </section>

            {/* technology blogs section */}
            <section className="mt-20 px-4 2xl:px-0 bg-[#F2F1ED]">

                <div className="max-w-screen-xl mx-auto py-14 ">
                    <div className="mb-5">
                        <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Technology</h1>
                    </div>
                    <div className="grid gap-10 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 overflow-hidden">
                        {
                            blogs.filter((blog) => blog.category === "Technology")
                                .slice(0, 8)
                                .map((blog) => <TechnologyBlogCard key={blog._id} blog={blog}></TechnologyBlogCard>)
                        }
                    </div>
                </div>
            </section>

            {/*lifestyle,lifestyle, entertainment */}
            <section className="mt-20 px-4 2xl:px-0">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid gap-10 md:grid-cols-2 md:gap-5">
                        {/* lifestyle */}
                        <div className="">
                            <div className="mb-5">
                                <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Lifestyle</h1>
                            </div>
                            {
                                blogs.filter((blog) => blog.category === "Lifestyle")
                                    .slice(0, 6)
                                    .map((blog, idx) => <TwoColBlogCard key={blog._id} blog={blog} idx={idx}></TwoColBlogCard>)
                            }
                        </div>
                        {/* Entertainment */}
                        <div className="">
                            <div className="mb-5">
                                <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Entertainment</h1>
                            </div>
                            {
                                blogs.filter((blog) => blog.category === "Entertainment")
                                    .slice(0, 6)
                                    .map((blog, idx) => <TwoColBlogCard key={blog._id} blog={blog} idx={idx}></TwoColBlogCard>)
                            }
                        </div>
                        {/* lifestyle
                        <div className="border border-blue-400">

                        </div> */}
                    </div>
                </div>
            </section>

            {/* newsletter section */}
            <section className="my-20 py-10 px-4 2xl:px-0">
                <div className="max-w-screen-xl mx-auto p-10 bg-[rgb(229,246,255)] rounded-3xl flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between shadow-xl">
                    {/* newsletter left side*/}
                    <div className="flex flex-col gap-6 ">
                        <h1 className="text-2xl md:text-3xl font-bold">Stay Connected & Get The Trending Updates</h1>
                        <p className="">35,00,000+ Subscriptions Across Bangladesh! & Counting! Subscribe to have new coupon <br className="md:block hidden" />lists delivered directly to your inbox</p>
                        <form onSubmit={handleSubmit} className="flex gap-1 items-center">
                            <input name='email' type="email" placeholder="Enter Email Address" className="input input-bordered w-full max-w-xs" required />
                            {/*  */}
                            <button className="btn outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold">Subscribe</button>
                        </form>
                    </div>
                    {/* newsletter  right side */}
                    <div>
                        <Lottie className="w-[300px] mb-0" animationData={newsLetterLottie} loop={true} />
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;