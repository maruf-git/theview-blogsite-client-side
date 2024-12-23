import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const FeaturedBlogs = () => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
            featured blogs
        </div>
    );
};

export default FeaturedBlogs;