import { useEffect, useState } from 'react'
import axios from 'axios';
const Bookmark = () => {

    const [loading, setLoading] = useState(false);
    const [bookmraks, setBookmarks] = useState<any>(null);
    const [searchFilter, setSearchFilter] = useState<any>('');
    const [inputSearch, setInputSearch] = useState<any>('');

    useEffect(() => {
        const getAllBookmarks = async () => {
            setLoading(true)
            try {
                const response = await axios('http://localhost/finallab/api/bookmarks.php')
                setBookmarks(response.data)
                setSearchFilter(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getAllBookmarks()
    }, [])


    useEffect(() => {
        if (inputSearch) {
            const filteredData = bookmraks.filter((item: any) => item.title.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setSearchFilter(filteredData)
        } else {
            setSearchFilter(bookmraks);
        }
    }, [inputSearch])


    return (
        <section className="mt-10">
            <div className="flex justify-center gap-2">
                <input type="text"
                    className="p-3 md:w-[800px] w-full mx-5 rounded-lg placeholder:text-[#5F5F5F] shadow-lg bg-[#D0D4CA] outline-none "
                    onChange={(e) => setInputSearch(e.target.value)}
                    placeholder="Search for specific bookmark in the world..." />
            </div>
            <div className="flex justify-center">
                {!loading ? <div className="content-center mt-20 grid lg:grid-cols-3 md:grid-cols-2 sm: grid-cols-1 xl:gap-x-48 lg:gap-x-32 gap-y-10">
                    {searchFilter?.length ? searchFilter.map((item: any) => {
                        return (
                            <div key={item.bookmarkId} className="lg:mx-0 mx-10 md:w-72 p-5 my-5 bg-[#D0D4CA] rounded-lg shadow-lg  border-solid border-t-[#A7D397] border-t-[30px]">
                                <h1 className="text-lg mb-5 font-bold text-center text-[#555843]">Published by @{item?.username}</h1>
                                <div className="text-left">
                                    <a href={item?.url.startsWith('http') ? item?.url : `https://${item?.url}`} target="_blank" className='flex gap-2'>
                                        {item?.title}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                        </svg></a>
                                </div>
                            </div>
                        )
                    }) : <h1>No bookmark found</h1>}
                </div> : <h1 className='text-center text-xl my-20'>Loading...</h1>}

            </div>

        </section>
    )
}

export default Bookmark