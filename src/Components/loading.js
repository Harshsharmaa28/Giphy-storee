export default function Loading({inputfromsearch}){
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <div className="flex justify-center min-h-screen">
                <div className=" mt-10 flex justify-center gap-5 absolute w-[100%] h-[70px]">
                    <div className="rounded-xl items-center bg-gray-200 flex w-[80%] h-[64px]">
                        <img
                            className="mx-4 mt-1"
                            width="44"
                            height="44"
                            src="https://img.icons8.com/pastel-glyph/64/search--v2.png"
                            alt="search--v2"
                        />
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="bg-gray-200  text-2xl font-semibold outline-0 rounded-xl w-[642px] h-[64px]  placeholder-black"
                            placeholder={inputfromsearch}
                            type="text"
                        />
                    </div>
                    <button
                        type="button"
                        className="text-lg rounded-xl bg-black w-[110px] h-[64px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className={`loading-spinner-container`}>
                <div className="loading-spinner"></div>
            </div>
        </div>
    )
}