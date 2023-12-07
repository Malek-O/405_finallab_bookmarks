import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spinner from "../components/Spinner";
import toast from 'react-hot-toast'
const Signin = () => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [loading, setLoading] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const { auth, setAuth } = useAuth()


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        toast.loading('Signing in..')
        if (!user || !pwd) {
            toast.dismiss()
            toast.error('Please fill all fields!')
            setLoading(false)
            return
        }
        const data = {
            username: user,
            password: pwd
        }
        const url = 'http://localhost/finallab/api/login.php'
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json()
                toast.dismiss()
                toast.success("Signed in successfully!")
                navigate(from, { replace: true })
                setAuth(prev => ({ ...prev, username: data.username }))
                setLoading(false)
            } else {
                toast.dismiss()
                toast.error("Your username or password incorrect")
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.dismiss()
            toast.error("Something went wrong")
            console.log(error);
        }
    }

    if (auth?.username) navigate(from, { replace: true })

    return (
        <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                className="w-full rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#D0D4CA] border-[#A7D397]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-10">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight ">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="user" className="block mb-2 text-lg font-medium">Your
                                username</label>
                            <input type="text" id="user"
                                onChange={(e) => setUser(e.target.value)}
                                className="bg-gray-50 border border-[#A7D397] text-gray-900 sm:text-base rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 "
                                placeholder="random1223" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-lg font-medium ">Password</label>
                            <input type="password" id="password" placeholder="••••••••"
                                onChange={(e) => setPwd(e.target.value)}
                                className="bg-gray-50 border border-[#A7D397] text-gray-900 sm:text-basef rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 "
                            />
                        </div>

                        <button type="submit"
                            disabled={loading}
                            className="w-full  bg-[#A7D397] text-white hover:bg-[#335825] disabled:bg-[#335825] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center  hover:bg-primary-700 focus:ring-primary-800">
                            {loading ? <Spinner /> : <span>Sign in</span>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signin