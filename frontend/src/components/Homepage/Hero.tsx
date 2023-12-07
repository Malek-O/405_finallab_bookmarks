import Bro from "../../svgs/Bro"

const Hero = () => {
    return (
        <main className="md:text-left text-center md:mx-20 md:flex-row flex flex-col justify-evenly items-center mt-16">
            <section className='mx-5 md:mx-0 order-2 md:order-1 '>
                <h1 className="font-bold text-5xl ">Unleash Your Favorites,</h1>
                <h1 className="font-bold text-5xl "><span className="text-[#A7D397]">Bookmark</span>, Share, Repeat!</h1>
                <p className="mt-2 text-2xl md:w-3/4 text-[#555843]">Discover the joy of seamless organization and effortless sharing. Elevate your online experience with Bookmark Bliss - where every click counts!</p>
            </section>
            <section className="md:w-2/6 md:h-2/6 w-72 h-72 order-1 md:order-2">
                <Bro />
            </section>
        </main>
    )
}

export default Hero