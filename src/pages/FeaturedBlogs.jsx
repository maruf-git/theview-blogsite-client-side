import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const FeaturedBlogs = () => {
    const { user, loading } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([])
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`${import.meta.env.VITE_BASE_URI}/featured-blogs`)
            .then(res => {
                // console.log(res.data);
                setBlogs(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosSecure])


    if (loading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
            featured blogs
        </div>
    );
};

export default FeaturedBlogs;