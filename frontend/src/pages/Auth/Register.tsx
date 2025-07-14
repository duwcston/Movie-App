import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/users";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
// import registerImage from "../../assets/register.png";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state: RootState) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("Registration successful!");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <section className="lg:pl-10 pl-8 pt-8 flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full lg:w-1/2 lg:mr-[4rem] flex flex-col justify-center items-center max-w-xs sm:max-w-sm md:max-w-md">
                    <div className="w-full max-w-[40rem]">
                        <h1 className="mb-4">Register</h1>

                        <form onSubmit={submitHandler} className="container w-full">
                            <div className="my-[2rem]">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="my-[2rem]">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="my-[2rem]">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="my-[2rem]">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer w-full"
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>

                            {isLoading && <Loader />}
                        </form>

                        <div className="mt-4">
                            <p className="text-md text-gray-500 text-center">
                                Already have an account?{" "}
                                <Link
                                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                    className="text-blue-500 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image container - hidden on mobile, half screen on larger devices */}
                {/* <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center">
                    <img
                        src={registerImage}
                        alt="Register illustration"
                        className="max-w-full max-h-full object-contain"
                    />
                </div> */}
            </section>
        </div>
    );
};

export default Register;
