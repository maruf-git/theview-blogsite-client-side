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
import { ThemeContext } from "../providers/ThemeProvider";


const Home = () => {
    const {themeMode}=useContext(ThemeContext)
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs/recent`)
            .then(res => {
                // console.log(res.data);
                setRecentBlogs(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs?filter=${''}&search=${''}`)
            .then(res => {
                // console.log(res.data);
                setBlogs([...res.data].reverse());
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    // handle email to subscribe
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        // console.log(email);
        toast.success('Thanks for subscribing our newsletter!')
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
                <div className="max-w-screen-xl mx-auto md:min-h-[60vh]   flex flex-col md:flex-row justify-between items-center">
                    {/* text content */}
                    <div className="w-full py-10 md:py-0 md:w-[60%]">
                        {/* title */}
                        <h1 className="font-bold text-3xl leading-normal md:text-5xl text-white md:leading-[55px]">Where curiosity meets creativity. Explore blogs that captivate your mind and spark new ideas.</h1>
                        {/* features */}
                        <div className="my-8 space-y-1 md:space-y-2">
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-base md:text-xl">Fueling Minds, One Post at a Time.</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-base md:text-xl">Explore. Engage. Elevate.</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-base md:text-xl">Dive Into a World of Ideas and Perspectives.</p>
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
            <section className="mt-10 px-4 2xl:px-0">
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
            <section id="technology" className={`mt-10 px-4 2xl:px-0 bg-[#F2F1ED] ${themeMode === "light" ? "" : "bg-gray-900 text-[rgb(166,173,187)]"}`}>

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

            {/*lifestyle, entertainment */}
            <section className="mt-10 px-4 2xl:px-0">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid gap-10 md:grid-cols-2 md:gap-5">
                        {/* lifestyle */}
                        <div id="lifestyle" className="">
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
                        <div id="entertainment" className="">
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

            {/* science , business */}
            <section className="mt-10 px-4 2xl:px-0">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid gap-10 md:grid-cols-2 md:gap-5">
                        {/* Science */}
                        <div id="science" className="">
                            <div className="mb-5">
                                <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Science</h1>
                            </div>
                            {
                                blogs.filter((blog) => blog.category === "Science")
                                    .slice(0, 6)
                                    .map((blog, idx) => <TwoColBlogCard key={blog._id} blog={blog} idx={idx}></TwoColBlogCard>)
                            }
                        </div>
                        {/* Business */}
                        <div id="business" className="">
                            <div className="mb-5">
                                <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Business</h1>
                            </div>
                            {
                                blogs.filter((blog) => blog.category === "Business")
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
            <section className="my-10 py-10 px-4 2xl:px-0">
                <div className={`max-w-screen-xl mx-auto p-10 bg-[rgb(229,246,255)] ${themeMode === "light" ? "" : "bg-gray-900 text-[rgb(166,173,187)]"} rounded-3xl flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between shadow-xl`}>
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

            {/* FAQ section */}
            <section className={`bg-[rgb(233,239,245)] px-4 2xl:px-0 ${themeMode === "light" ? "" : " !bg-[#1c2229] !text-[#a6adbb]"}`}>
            {/* 101827 */}
                <div className={`max-w-screen-xl mx-auto py-10 lg:py-20 flex flex-col gap-10 `}>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-center">Frequently Asked Questions</h1>
                    </div>
                    {/* accordion */}
                    <div className={`space-y-3 ${themeMode === "light" ? "" : " !bg-[#101827] !text-[#a6adbb]"}`}>
                        <div className={`collapse collapse-arrow bg-white ${themeMode === "light" ? "" : " !bg-[#101827] !text-[#a6adbb]"}`}>
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-[18px] md:text-xl font-medium">What is this platform about?</div>
                            <div className="collapse-content">
                                <p>This is a community-driven blog platform where users can create an account to post their own blogs, comment on others' content, and engage with like-minded individuals.</p>
                            </div>
                        </div>
                        <div className={`collapse collapse-arrow bg-white ${themeMode === "light" ? "" : " !bg-[#101827] !text-[#a6adbb]"}`}>
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-[18px] md:text-xl font-medium">Who can post blogs on this site?</div>
                            <div className="collapse-content">
                                <p>Anyone with a registered account can post blogs. Whether you're a seasoned writer or just starting, our platform welcomes all voices!</p>
                            </div>
                        </div>
                        <div className={`collapse collapse-arrow bg-white ${themeMode === "light" ? "" : " !bg-[#101827] !text-[#a6adbb]"}`}>
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-[18px] md:text-xl font-medium">What types of blogs are allowed?</div>
                            <div className="collapse-content">
                                <p>We encourage blogs on a wide range of topics, but they must comply with our content guidelines to ensure a safe and respectful environment for all users..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;