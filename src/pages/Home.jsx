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

const Home = () => {
    const { user } = useContext(AuthContext);
    const [recentBlogs, setRecentBlogs] = useState([]);
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

    const handleSubmit=(event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        console.log(email);
        toast.success('Thanks for subscribing!')
        event.target.reset();
    }

    return (
        <div>
            {/* hero section */}
            <section
                style={{
                    backgroundImage: `url(https://i.ibb.co.com/v4h7JN4/banner.webp)`,
                }}
                className={`bg-cover bg-no-repeat bg-center`}
            >
                <div className="max-w-screen-xl mx-auto min-h-[700px]  flex justify-between items-center">
                    {/* text content */}
                    <div className="w-[70%]">
                        {/* title */}
                        <h1 className="font-bold text-5xl text-white leading-[65px]">Make Confident Business Decisions With Practitioner-Analyst Led Tech Research</h1>
                        {/* features */}
                        <div className="my-8 space-y-2">
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-xl">Accessible, affordable research subscriptions</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-xl">Comprehensive vendor evaluations</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TiTick size={30} className="text-blue-500" />
                                <p className="text-white text-xl">In-depth analysis from industry practitioners</p>
                            </div>
                        </div>
                        {/* join our community button */}
                        <div>
                            <Link to='/register' className="btn outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold uppercase tracking-wide">Join our community</Link>
                        </div>
                    </div>
                    {/* banner right side image content */}
                    <div className="">
                        <img src={bannersvg} alt="" />
                    </div>
                </div>

            </section>

            {/* recent blogs section */}
            <section className="my-20">
                <div className="max-w-screen-xl mx-auto">
                    <div className="mb-10">
                        <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Recent Blogs</h1>
                    </div>
                    {/* cards container */}
                    <div className="grid grid-cols-3 gap-5">
                        {
                            recentBlogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                        }
                    </div>
                    {/* newsletter section */}
                    <section className=" py-10 lg:py-20 px-1 lg:px-0">
                        <div className="max-w-screen-xl mx-auto p-10 bg-[rgb(229,246,255)] rounded-3xl flex flex-col justify-center items-center gap-5 md:items-center md:flex-row md:justify-between shadow-xl">
                            {/* newsletter left side*/}
                            <div className="flex flex-col gap-6 ">
                                <h1 className="text-2xl md:text-3xl font-bold">Stay Connected & Get The Trending Updates</h1>
                                <p className="">35,00,000+ Subscriptions Across Bangladesh! & Counting! Subscribe to have new coupon <br className="md:block hidden" />lists delivered directly to your inbox</p>
                                <form onSubmit={handleSubmit} className="flex gap-1 items-center">
                                    <input name='email' type="email" placeholder="Enter Email Address" className="input input-bordered w-full max-w-xs" required />
                                    {/*  */}
                                    <button  className="btn outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold">Subscribe</button>
                                </form>
                            </div>
                            {/* newsletter  right side */}
                            <div>
                                <Lottie className="w-[300px]" animationData={newsLetterLottie} loop={true} />
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Home;