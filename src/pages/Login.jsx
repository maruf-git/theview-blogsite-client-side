import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
// import { Helmet } from "react-helmet-async";



const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { userLogin, setUser, googleLogin } = useContext(AuthContext);
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage("");
        const email = event.target.email.value;
        const password = event.target.password.value;
        userLogin(email, password)
            .then(res => {
                setUser(res.user);
                // console.log("redirect:", location?.state);
                axios.post(`${import.meta.env.VITE_BASE_URI}/jwt`, { email: res.user?.email }, { withCredentials: true })
                    .then(res => {
                        console.log("token creation successful.", res.data);
                        toast.success('Login successful');
                        navigate(location?.state || '/');
                    })
            })
            .catch(err => {
                setErrorMessage(err.message);
            })
    }

    // handle password show eye button
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // login with google
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                setUser(result.user);
                console.log("redirect:", location?.state);

                axios.post(`${import.meta.env.VITE_BASE_URI}/jwt`, { email: result.user?.email }, { withCredentials: true })
                    .then(res => {
                        // console.log("token creation successful.", res.data);
                        toast.success('Login successful');
                        navigate(location?.state || '/');
                    })



            })
            .catch(() => {
                // console.log(err.message);
            })
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-[#009bff] ">Login</h2>
                <p className="text-center text-gray-500 mt-2">Access your account</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {showPassword ? (
                            <FaEyeSlash
                                onClick={handleShowPassword}
                                className="absolute top-[35px] right-3   text-gray-500 cursor-pointer"
                            />
                        ) : (
                            <FaEye
                                onClick={handleShowPassword}
                                className="absolute top-[35px] right-3 text-gray-500 cursor-pointer"
                            />
                        )}
                    </div>
                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-4 btn outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                    <p className="text-center text-gray-600">Or login with</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="btn w-full outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold"
                    >
                        Login with Google
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            state={location?.state}
                            className="text-[#009bff] font-semibold hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;