import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from '../components/LoadingSpinner'


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { loading } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/blogs?filter=${filter}&search=${search}`)
            .then(res => {
                // console.log(res.data);
                setBlogs(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [filter, search])

    // get search
    const handleSearch = () => {
        setSearch(searchValue);
    }
    // console.log("search value:", searchValue);
    console.log("final search:", search);
    console.log('filter', filter);


    if (loading) return <LoadingSpinner></LoadingSpinner>;

    return (
        <div className="max-w-screen-xl mx-auto px-1">
            {/* filter and sorting  */}
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 my-10 '>
                {/* category selection */}
                <div>
                    <select
                        value={filter}
                        onChange={(event) => {
                            setFilter(event.target.value)
                        }}
                        name='category'
                        id='category'
                        className='border p-4 rounded-lg '
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Business'>Business</option>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Lifestyle'>Lifestyle</option>
                        <option value='Science'>Science</option>
                        <option value='Sports'>Sports</option>
                        <option value='Technology'>Technology</option>
                    </select>
                </div>
                {/* search bar */}
                <div>
                    <div className='flex p-1 overflow-hidden border rounded-lg  focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <input
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'
                            placeholder='Enter Job Title'
                            aria-label='Enter Job Title'
                        />

                        <button onClick={handleSearch} className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                            Search
                        </button>
                    </div>
                </div>

                {/* reset button */}
                <button
                    onClick={() => {
                        setSearchValue('');
                        setSearch('');
                        setFilter('');
                    }}
                    className="btn">Reset</button>
            </div>

            {/* blogs card container */}
            <div className="mb-20  grid grid-cols-4 gap-5">
                {
                    blogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default AllBlogs;