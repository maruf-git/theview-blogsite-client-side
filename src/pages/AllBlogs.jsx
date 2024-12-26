import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from '../components/LoadingSpinner'
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../providers/ThemeProvider";


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { loading } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const { themeMode } = useContext(ThemeContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs?filter=${filter}&search=${search}`)
            .then(res => {
                // console.log(res.data);
                setBlogs(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [filter, search])

    // get search
    const handleSearch = () => {
        setSearch(searchValue);
    }
    // console.log("search value:", searchValue);
    // console.log("final search:", search);
    // console.log('filter', filter);


    if (loading) return <LoadingSpinner></LoadingSpinner>;

    return (
        <div className="max-w-screen-xl mx-auto px-4 2xl:px-0">
            <Helmet>
                <title>All Blogs - TheView</title>
            </Helmet>
            {/* filter and sorting  */}
            <div className={`flex flex-col gap-5 sm:flex-row justify-center items-center sm:gap-3 md:gap-6 my-8  `}>
                {/* Category Selection */}
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(event) => {
                            if (!event.target.value) {
                                setFilter('');
                            } else {
                                setFilter(event.target.value);
                            }
                        }}
                        name="category"
                        id="category"
                        className={`w-full sm:w-40 md:w-48 lg:w-64 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 bg-white shadow-sm focus:ring focus:ring-blue-300 focus:outline-none `}
                    >
                        <option value="">Filter By Category</option>
                        <option value="Business">Business</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Science">Science</option>
                        <option value="Sports">Sports</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>

                {/* Search Bar */}
                <div className="flex items-center w-auto md:w-auto bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring focus-within:ring-blue-300">
                    <input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 rounded-l-lg focus:outline-none"
                        type="text"
                        name="search"
                        placeholder="Search by title"
                        aria-label="Search by title"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                        Search
                    </button>
                </div>

                {/* Reset Button */}
                <button
                    onClick={() => {
                        setSearchValue('');
                        setSearch('');
                        setFilter('');
                    }}
                    className="px-6 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring focus:ring-gray-300 focus:outline-none shadow-sm"
                >
                    Reset
                </button>
            </div>
            {/* all blogs */}
            <div>
                <div className="mb-10">
                    <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">All Blogs</h1>
                </div>
                {/* blogs card container */}
                <div className="mb-20 grid sm:grid-cols-2 md:gap-5 lg:grid-cols-3 gap-5">
                    {
                        blogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;