import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/users";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";

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
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="mb-4">Sign In</h1>
                    <form
                        className="container w-[40rem]"
                        onSubmit={submitHandler}
                    >
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
                                placeholder="Enter email"
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
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            New customer?{" "}
                            <Link
                                to={
                                    redirect
                                        ? `/register?redirect=${redirect}`
                                        : "/register"
                                }
                                className="text-blue-500 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* <img src="" alt="" className="h-[65rem] w-[55%] xl:block md:hidden sm:hidden rounded:lg" /> */}
            </section>
        </div>
    );
};

export default Login;
