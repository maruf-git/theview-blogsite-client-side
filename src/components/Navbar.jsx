import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineNightlight } from "react-icons/md";
import { ThemeContext } from "../providers/ThemeProvider";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const { themeMode, handleThemeBtn } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                // deleting token from browser cookie by sending get request
                // axios.get(`${import.meta.env.VITE_BASE_URI}/logout`, { withCredentials: true })
                //     .then(res => {
                //     })
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className={`shadow-sm ${themeMode === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}>
            {/* Navbar */}
            <div className="max-w-screen-xl mx-auto px-4 2xl:px-0">
                <div className="navbar flex justify-between items-center !mx-0 !px-0">
                    {/* Navbar Start */}
                    <div className="navbar-start flex items-center gap-4">
                        <div className="dropdown lg:hidden z-50">
                            <button
                                tabIndex={0}
                                className="btn btn-ghost !px-0 py-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white shadow-md rounded-lg p-2 w-52">
                                <li><NavLink to="/">Home</NavLink></li>
                                {
                                    user &&
                                    <li><NavLink to="/add-blog">Add Blog</NavLink></li>
                                }
                                <li><NavLink to="/all-blogs">All Blogs</NavLink></li>
                                <li><NavLink to="/featured-blogs">Featured Blogs</NavLink></li>
                                {
                                    user &&
                                    <li><NavLink to="/wishlist">Wishlist</NavLink></li>
                                }
                            </ul>
                        </div>
                        <Link to="/" className={`text-2xl font-semibold tracking-wide ${themeMode === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}>TheView</Link>
                    </div>
                    {/* Navbar Center (Visible on Desktop) */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal gap-6 text-lg">
                        <li><NavLink to="/">Home</NavLink></li>
                                {
                                    user &&
                                    <li><NavLink to="/add-blog">Add Blog</NavLink></li>
                                }
                                <li><NavLink to="/all-blogs">All Blogs</NavLink></li>
                                <li><NavLink to="/featured-blogs">Featured Blogs</NavLink></li>
                                {
                                    user &&
                                    <li><NavLink to="/wishlist">Wishlist</NavLink></li>
                                }
                        </ul>
                    </div>
                    {/* Navbar End */}
                    <div className="navbar-end flex items-center gap-1 sm:gap-3">
                        {/* Theme Toggle Button */}
                        <div>
                            {themeMode === "light" ? (
                                <MdOutlineNightlight
                                    onClick={handleThemeBtn}
                                    size={30}
                                    className="text-gray-700 hover:text-yellow-500 transition-colors cursor-pointer" />
                            ) : (
                                <WiDaySunny
                                    onClick={handleThemeBtn}
                                    size={30}
                                    className="text-white hover:text-yellow-300 transition-colors cursor-pointer" />
                            )}
                        </div>

                        {/* User Authentication */}
                        {user ? (
                            <div className="flex items-center gap-1 sm:gap-3">
                                <div
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={`${user.displayName}`}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700">
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={`${user?.photoURL}`}
                                        className="w-full h-full object-cover rounded-full" />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm  outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold ">
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center gap-3">

                                <Link to="/register" className="btn btn-sm outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold">Register</Link>

                                <Link to="/login" className="btn w-full sm:w-auto btn-sm outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold ">Log in</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default Navbar;
