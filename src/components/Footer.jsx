import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="max-w-screen-xl container mx-auto px-4 2xl:px-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white">Home</Link>
                            </li>
                            <li>
                                <Link to="/all-blogs" className="hover:text-white">Blogs</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:text-white">Categories</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo and Description */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">TheView</h2>
                        <p className="text-sm leading-relaxed">
                            Share your stories, write your thoughts, and engage with our vibrant community. TheView is a platform that empowers voices and connects people through ideas.
                        </p>
                    </div>

                    {/* Popular Tags */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            <Link to='/' className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700">
                                #Technology
                            </Link>
                            <Link  to='/' className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700">
                                #Lifestyle
                            </Link>
                            <Link  to='/' className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700">
                                #Travel
                            </Link>
                            <Link  to='/' className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700">
                                #Education
                            </Link>
                            <Link to='/' className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700">
                                #Health
                            </Link>
                            <Link  to='/' className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700">
                                #Business
                            </Link>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                        <p className="text-sm">Stay connected through our social channels:</p>
                        <div className="flex mt-4 space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaFacebook size={30} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaTwitter size={30} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaYoutube size={30} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaLinkedin size={30} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
                    <p>© {new Date().getFullYear()} TheView. All rights reserved.</p>
                    <p>
                        Designed with ❤️ by <a href="https://yourwebsite.com" className="hover:text-white">Maroof Ahmed Orion</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
