import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { ThemeContext } from "../providers/ThemeProvider";
// import { Helmet } from "react-helmet-async";


const Register = () => {
    const navigate = useNavigate();
    const { createUser, googleLogin, setUser, updateUserProfile } = useContext(AuthContext);
    const [validationMessage, setValidationMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const {themeMode}=useContext(ThemeContext);


    const handleSubmit = (event) => {
        event.preventDefault();

        setValidationMessage("");

        const name = event.target.name.value;
        const email = event.target.email.value;
        const photo = event.target.photo_url.value;
        const password = event.target.password.value;
        const updateInfo = {
            displayName: name,
            photoURL: photo
        }
        if (password.length < 6) {
            setValidationMessage("Password must be at least 6 characters");
            return;
        }
        if (name.trim() === "") {
            setValidationMessage("Name can not be empty");
            return;
        }
        if (photo.trim() === "") {
            setValidationMessage("Photo URL can not be empty");
            return;
        }
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /\d/;
        const specialRegex = /[^a-zA-Z0-9\s]/;
        // const lowercaseRegex = /[a-z]/;
        // if (!lowercaseRegex.test(password)) {
        //     setValidationMessage("Password must have at least one lowercase letter");
        //     return;
        // }
        if (!uppercaseRegex.test(password)) {
            setValidationMessage("Password must have at least one uppercase letter");
            return;
        }
        if (!specialRegex.test(password)) {
            setValidationMessage("Password must have at least one special character");
            return;
        }
        if (!numberRegex.test(password)) {
            setValidationMessage("Password must have at least one number");
            return;
        }
        // creating user using email and password
        createUser(email, password)
            .then((result) => {
                // update user profile  during register
                updateUserProfile(updateInfo)
                    .then(() => {
                        // setUser(result.user);
                        toast.success('Registration Successful!');
                        // console.log("redirect:", location?.state);
                        navigate(location?.state || '/');
                        // if (location && location.state && location.state.destination) {
                        //     navigate(`${location?.state?.destination}`)
                        // }
                        // else {
                        //     navigate("/");
                        // }
                    })
                    .catch(() => {
                        // console.log(err.message);
                    })
                // setUser(result.user);

            })
            .catch(err => {
                setValidationMessage(err.message);
            })
    }
    // login with google
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                // setUser(result.user);
                toast.success('Registration Successful');
                // console.log("redirect:", location?.state);
                navigate(location?.state || '/');
                // if (location && location.state && location.state.destination) {
                //     navigate(`${location?.state?.destination}`)
                // }
                // else {
                //     navigate("/");
                // }
            })
            .catch(() => {
                // console.log(err.message);
            })
    }

    // handle password show eye button
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen  flex items-center justify-center py-10">
            <div className={`bg-white shadow-lg rounded-lg max-w-md w-full p-6 sm:p-8 ${themeMode === "light" ? "" : "!bg-gray-900 text-[rgb(166,173,187)]"}`}>
                <h1 className="text-3xl font-bold text-center text-[#009bff]">Register Now</h1>
                <p className="text-center text-gray-600 mt-2">Create your account in seconds</p>
                <form onSubmit={handleSubmit} className={`mt-6 space-y-4 ${themeMode === "light" ? "" : "!bg-gray-900 text-[rgb(166,173,187)]"}`}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your full name"
                            className="mt-1 input input-bordered w-full"
                            required
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email address"
                            className="mt-1 input input-bordered w-full"
                            required
                        />
                    </div>
                    {/* Photo URL */}
                    <div>
                        <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            name="photo_url"
                            id="photo_url"
                            placeholder="Your photo URL"
                            className="mt-1 input input-bordered w-full"
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            name="password"
                            id="password"
                            placeholder="Create a password"
                            className="mt-1 input input-bordered w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleShowPassword}
                            className="absolute inset-y-0 right-3 top-[25px] text-gray-500"
                            aria-label="Toggle Password Visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* Validation Message */}
                    {validationMessage && (
                        <p className="text-red-500 font-semibold text-sm text-center">{validationMessage}</p>
                    )}
                    {/* Register Button */}
                    <button className="btn w-full mt-4 outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold">Register</button>
                </form>
                {/* Or Separator */}
                <div className="flex items-center my-4">
                    <hr className="flex-1 border-gray-300" />
                    <span className="mx-4 text-gray-500">OR</span>
                    <hr className="flex-1 border-gray-300" />
                </div>
                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="btn w-full outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold"
                >
                    Login with Google
                </button>
                {/* Redirect to Login */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#009bff] font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Register;