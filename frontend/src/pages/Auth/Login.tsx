import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/users";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
// import loginImage from "../../assets/login.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

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

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("Login successful!");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <section className="lg:pl-10 pl-8 pt-8 flex flex-col lg:flex-row justify-center items-center">
                <div className="w-full lg:w-1/2 lg:mr-[4rem] flex flex-col justify-center items-center max-w-xs sm:max-w-sm md:max-w-md">
                    <div className="w-full max-w-[40rem]">
                        <h1 className="mb-4">Sign In</h1>
                        <form className="container w-full" onSubmit={submitHandler}>
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
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer w-full"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                            {isLoading && <Loader />}{" "}
                        </form>
                        <div className="mt-4">
                            <p className="text-md text-gray-400 text-center">
                                Don't have an account?{" "}
                                <Link
                                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                    className="text-blue-500 hover:underline ml-2"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center">
                    <img
                        src={loginImage}
                        alt="Login illustration"
                        className="max-w-full max-h-full object-contain"
                    />
                </div> */}
            </section>
        </div>
    );
};

export default Login;
