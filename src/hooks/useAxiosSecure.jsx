import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI,
    withCredentials: true
})


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, async (error) => {
            console.log(error);
            console.log('error caught from our interceptor--->', error.message);
            if (error.response.status === 401 || error.response.status === 403) {
                // logout
                logout();
                // navigate to login
                navigate('/login');
            }
        })
    }, [logout, navigate])

    return axiosSecure;
};

export default useAxiosSecure;