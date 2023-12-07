import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-[#555843] md:px-20 px-3 py-3">
            <Link to="/" className="text-white text-lg">Bookmarks</Link>
            <div className="flex items-center gap-3">
                <Link to={'/signup'} className="cursor-pointer text-white text-lg">Sign up</Link>
                <Link
                    to={'/signin'}
                    className="rounded-lg bg-[#A7D397] p-2 text-lg  text-green-900 transition duration-75 hover:bg-[#548343]
                    ">
                    Sign in
                </Link>
            </div>
        </nav>
    )
}

export default Navbar