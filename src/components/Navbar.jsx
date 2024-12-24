import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineNightlight } from "react-icons/md";
import { ThemeContext } from "../providers/ThemeProvider";


const Navbar = () => {
    const navigate = useNavigate();
    const { themeMode, handleThemeBtn } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate("/");
            })
            .catch((err) => {

            })
    }



    return (
        // shadow-xl 
        <div className={`py-5 border-b  ${themeMode === "light" ? "light" : "dark"}`}>
            {/* navbar */}
            <div className="">
                <div className="max-w-screen-xl mx-auto px-1">
                    <div className="navbar p-1 lg:p-0">
                        <div className="navbar-start">
                            <div className="dropdown z-[500]">
                                <div tabIndex={0} role="button" className="btn btn-ghost px-0 mx-0 lg:hidden">
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
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/add-blog">Add Blog</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/all-blogs">All Blogs</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/featured-blogs">Featured Blogs</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/wishlist">Wishlist</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <Link to="/" className="text-xl md:text-2xl font-bold ml-1 lg:ml-0">View</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 gap-3">
                                {/* className={(isActive)=>{ isActive?"active":"hi"}} */}
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/add-blog">Add Blog</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/all-blogs">All Blogs</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/featured-blogs">Featured Blogs</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/wishlist">Wishlist</NavLink>
                                </li>

                            </ul>
                        </div>
                        <div className="navbar-end gap-1 md:gap-2">
                            {/* theme buttons */}
                            <div >
                                {
                                    themeMode === "light" ? <MdOutlineNightlight onClick={handleThemeBtn} size={30} /> : <WiDaySunny onClick={handleThemeBtn} size={40} />
                                }
                            </div>
                            {/* navbar user info and login, logout */}
                            {
                                user ?
                                    <div className="flex items-center ml-7 gap-3">
                                        {/* photo */}
                                        <div className="avatar flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-2 lg:gap-3">
                                            {/* react tool tip applied here */}
                                            <div data-tooltip-id="my-tooltip" data-tooltip-content={`${user.displayName}`} className="ring-primary ring-offset-base-100 w-8 md:w-12 rounded-full ring ring-offset-2">
                                                <img referrerPolicy="no-referrer" src={`${user?.photoURL}`} />
                                            </div>

                                            <button onClick={handleLogout} className={`btn btn-sm btn-primary  md:text-sm`}>Log out</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="navbar-end ">
                                        <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-3">
                                            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                                            <Link to="/login" className="btn btn-sm btn-primary">Log in</Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* react tool tip */}
            <Tooltip id="my-tooltip" />
        </div >
    );
};

export default Navbar;