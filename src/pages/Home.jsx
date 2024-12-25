import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import bannersvg from "../assets/bannersvg.svg"
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {/* hero section */}
            <section
                style={{
                    backgroundImage: `url(https://i.ibb.co.com/v4h7JN4/banner.webp)`,
                }}
                className={`bg-cover bg-no-repeat mb-[500px] bg-center`}

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
        </div>
    );
};

export default Home;