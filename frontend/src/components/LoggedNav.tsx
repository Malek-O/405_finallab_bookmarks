import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const LoggedNav = () => {

    const navigate = useNavigate()

    const { setAuth } = useAuth()
    const handleClick = async () => {
        const url = 'http://localhost/finallab/api/logout.php'
        try {
            await fetch(url, {
                credentials: 'include',
            });
            setAuth(null)
            navigate('', { replace: true })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="flex items-center justify-between bg-[#555843] md:px-20 px-3 py-3 ">
            <Link to="/" className="text-white text-lg">Bookmarks</Link>
            <div className="flex items-center gap-3">
                <Link to={'/mybookmarks'} className="cursor-pointer text-white md:text-lg  sm:text-sm text-xs ">MyBookmarks</Link>
                <button
                    onClick={handleClick}
                    className="rounded-lg bg-red-300 p-2 text-lg  text-red-900 transition duration-75 hover:bg-red-400">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default LoggedNav