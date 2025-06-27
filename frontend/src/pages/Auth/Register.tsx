import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../redux/api/users"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { setCredentials } from "../../redux/features/auth/authSlice"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state: any) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e: any) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {
            const res = await register({ username, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate(redirect)
            toast.success("Registration successful!")
        } catch (error) {
            console.error("Registration failed:", error)
            toast.error("Registration failed. Please try again.")
        }
    }

    return (
        <div className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">
                    Register
                </h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="username" className="block text-sm font-medium text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-sm focus:ring-blue-500 focus:border-blue-500 block"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
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

                    <button disabled={isLoading} type="submit" className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register