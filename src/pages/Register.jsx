import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
// import { Helmet } from "react-helmet-async";


const Register = () => {
    const navigate = useNavigate();
    const { createUser, googleLogin, setUser, updateUserProfile } = useContext(AuthContext);
    const [validationMessage, setValidationMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();


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
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        if (name.trim() === "") {
            setValidationMessage("Name can not be empty");
            return;
        }
        if (photo.trim() === "") {
            setValidationMessage("Photo URL can not be empty");
            return;
        }
        if (!lowercaseRegex.test(password)) {
            setValidationMessage("Password must have at least one lowercase letter");
            return;
        }
        if (!uppercaseRegex.test(password)) {
            setValidationMessage("Password must have at least one uppercase letter");
            return;
        }
        // creating user using email and password
        createUser(email, password)
            .then((result) => {
                // update user profile  during register
                updateUserProfile(updateInfo)
                    .then(() => {
                        // setUser(result.user);
                        console.log("redirect:", location?.state);
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
                console.log("redirect:", location?.state);
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
        <div className="hero bg-[rgb(228,235,242)] min-h-screen py-6">
            {/* <Helmet>
                <title>Register - Discount Pro</title>
            </Helmet> */}
            <div className="hero-content sm:w-[500px]">
                <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body pb-0">
                        {/* register heading */}
                        <div >
                            <h1 className="text-3xl md:text-5xl  font-bold">Register Now!</h1>
                        </div>
                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        {/* photo url */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo_url" placeholder="photo URL" className="input input-bordered" required />
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
                            validationMessage && <div className="form-control mt-6">
                                <p className="font-semibold text-red-500">{validationMessage}</p>
                            </div>
                        }
                        <div className="form-control mt-6 space-y-3">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <div className="card-body mt-0 pt-0">
                        <div className="form-control space-y-3">
                            <p className="text-center font-semibold">Or</p>
                            <button onClick={handleGoogleLogin} className="btn btn-primary">Login with Google</button>
                        </div>
                        <div className="form-control">
                            <p className="font-semibold ">Already have an Account? <Link to="/login" className="text-red-500 border-b-2 border-red-500">Login here!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;