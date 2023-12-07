import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'

const MyBookmarks = () => {


    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [selectedOption, setSelectedOption] = useState(1);
    const [loading, setLoading] = useState(false)
    const [bookmraks, setBookmarks] = useState<any>(null);
    const [searchFilter, setSearchFilter] = useState<any>('');
    const [inputSearch, setInputSearch] = useState<any>('');



    const handleAdd = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        toast.loading('Adding bookmark...')
        if (!title || !url || selectedOption < 0) {
            toast.dismiss()
            toast.error('Please fill all the fileds!')
            setLoading(false)
            return
        }
        if (!url.startsWith('https')) {
            toast.dismiss()
            toast.error('Enter a valid URL!')
            return
        }
        const data = {
            title: title,
            url: url,
            shareable: selectedOption
        }
        const endpoint = 'http://localhost/finallab/api/insertBookmark.php'
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })
            if (response.ok) {
                await response.json()
                toast.dismiss()
                toast.success("Bookmark added successfully!")
                setLoading(false)
                setTitle('')
                setUrl('')
                getBookmarks()
            } else {
                toast.dismiss()
                toast.error("Something went wrong")
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.dismiss()
            toast.error("Something went wrong")
            console.log(error);
        }
    }


    const getBookmarks = async () => {
        setLoading(true)
        try {
            const response = await axios('http://localhost/finallab/api/bookmark_user.php', { withCredentials: true })
            setBookmarks(response.data)
            setSearchFilter(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            /* setLoading(false) */
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost/finallab/api/delete_bookmark.php?id=${id}`, { withCredentials: true })
            getBookmarks();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookmarks()
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
        <>
            <section>
                <form onSubmit={handleAdd} className="md:w-[900px] mx-10 md:mx-auto  mt-20 p-5 flex-col items-center justify-center rounded-lg shadow-md bg-[#F5EEC8]">
                    <h1 className="text-lg font-semibold text-center">Add a Bookmark</h1>
                    <div className="flex my-5 gap-2 items-center">
                        <label htmlFor="title" className="text-lg">Title: </label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" className="w-full p-2 rounded-md bg-[#A7D397] outline-none" />
                    </div>
                    <div className="flex my-5 gap-5 items-center">
                        <label htmlFor="url" className="text-lg">Url: </label>
                        <input value={url} onChange={(e) => setUrl(e.target.value)} type="url" id="url" className="w-full p-2 rounded-md bg-[#A7D397] outline-none" />
                    </div>
                    <div className="flex my-5 gap-5 items-center">
                        <label className="text-lg">Shareable</label>
                        <div className="flex gap-1">
                            <input type="radio" value={1} onChange={(e: any) => setSelectedOption(e.target.value)} name="share" defaultChecked />
                            <label htmlFor="sh" className="text-lg">Yes</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" value={0} onChange={(e: any) => setSelectedOption(e.target.value)} name="share" />
                            <label htmlFor="sh" className="text-lg">No</label>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="p-3 rounded-md bg-[#D0D4CA]">Add bookmark</button>
                    </div>
                </form>
            </section>
            <section className="my-10">
                <div className="flex justify-center gap-2">
                    <input type="text"
                        className="p-3 md:w-[800px] w-full mx-5 rounded-lg placeholder:text-[#5F5F5F] shadow-lg bg-[#D0D4CA] outline-none "
                        onChange={(e) => setInputSearch(e.target.value)}
                        placeholder="Search in your bookmarks.." />
                </div>
                <div className="flex justify-center">
                    {!loading ? <div className="content-center mt-20 grid lg:grid-cols-3 md:grid-cols-2 sm: grid-cols-1 xl:gap-x-48 lg:gap-x-32 gap-y-10">
                        {searchFilter?.length ? searchFilter.map((item: any) => {
                            return (
                                <div key={item.id} className="lg:mx-0 mx-10 md:w-72 p-5 relative bg-[#D0D4CA] rounded-lg shadow-lg  border-solid border-t-[#A7D397] border-t-[30px]">
                                    <div >
                                        <a href={item?.url.startsWith('http') ? item?.url : `https://${item?.url}`} target="_blank" className='flex mb-5 gap-2 justify-center text-xl'>
                                            {item?.title}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                            </svg></a>
                                    </div>
                                    <button onClick={() => handleDelete(item.id)} className="absolute bottom-0 left-0 p-1 rounded-se-lg bg-[#FA7070]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        }) : <h1>No bookmark found</h1>}
                    </div> : <h1 className='text-center text-xl my-20'>Loading...</h1>}

                </div>

            </section>
        </>
    )
}

export default MyBookmarks