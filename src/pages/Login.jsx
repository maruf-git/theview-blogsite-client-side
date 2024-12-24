import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
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
                console.log("redirect:", location?.state);
                axios.post(`${import.meta.env.VITE_BASE_URI}/jwt`, { email: res.user?.email }, { withCredentials: true })
                    .then(res => {
                        console.log("token creation successful.", res.data);
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
                        console.log("token creation successful.", res.data);
                        navigate(location?.state || '/');
                    })



            })
            .catch(() => {
                // console.log(err.message);
            })
    }

    return (
        <div className="hero bg-[rgb(228,235,242)]  py-6">
            {/* <Helmet>
                <title>Login - Discount Pro</title>
            </Helmet> */}
            <div className="hero-content sm:w-[500px]">
                <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body pb-0">
                        {/* register heading */}
                        <div >
                            <h1 className="text-3xl md:text-5xl font-bold">Login Now!</h1>
                        </div>
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={`${showPassword ? "text" : "password"}`} name="password" placeholder="password" className="input input-bordered" required />
                            {
                                showPassword ? <FaEyeSlash onClick={handleShowPassword} className="absolute top-[55px] right-[30px]" /> : <FaEye onClick={handleShowPassword} className="absolute top-[55px] right-[30px]" />
                            }
                        </div>

                        {
                            errorMessage && <div className="form-control">
                                <p className="font-semibold text-red-500">{errorMessage}</p>
                            </div>
                        }
                        <div className="form-control mt-6 space-y-3">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="card-body mt-0 pt-0">
                        <div className="form-control space-y-3">
                            <p className="text-center font-semibold">Or</p>
                            <button type="button" onClick={handleGoogleLogin} className="btn btn-primary">Login with Google</button>
                        </div>
                        <div className="form-control">
                            {/* location?.state */}
                            {/* { destination: location?.state?.destination } */}
                            <p className="font-semibold ">Don't have an Account? <Link state={location?.state} to="/register" className="text-red-500 border-b-2 border-red-500">Register here!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;