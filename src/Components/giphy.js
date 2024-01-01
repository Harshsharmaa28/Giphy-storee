import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

export default function Giphy({ updatesearchterm, fetchData, inputfromsearch, data }) {
    const [searchinput, setSearchInput] = useState(inputfromsearch);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        if (searchinput !== null) {
            updatesearchterm(searchinput);
        }
    }, [searchinput, updatesearchterm]);

    function handlebutton() {
        // fetchData();
    }

    function handlehome() {
        window.location.reload();
    }

    const itemsPerPage = 3;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = data?.data?.slice(startIndex, endIndex);

    const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);

    const showgif = () => {
        if (visibleData && visibleData.length > 0) {
            return visibleData.map((gif, index) => {
                let gifurl = gif.images.original.url;
                return (
                    <div className="flex flex-col items-center gap-2" key={index}>
                        <img
                            className=" border-8 border-black lg:w-[330px] lg:h-[300px] md:w-[250px] md:h-[250px] vsm:max-sm:w-[300px] vsm:max-sm:h-[150px] object-cover"
                            src={gifurl}
                            alt="Error"
                        />
                        {/* <button className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                            Copy URL
                        </button> */}
                    </div>
                );
            });
        } else {
            return <p>No data available</p>;
        }
    };

    return (
        <div className="vsm:max-sm: max-h-screen flex flex-col">
            <div>
                <button onClick={handlehome} className="absolute mx-5 mt-2 text-2xl font-bold">
                    Home
                </button>
            </div>
            <div className="vsm:max-sm:max-w-[70%] vsm:max-sm:flex vsm:max-sm:mx-[4rem] justify-center h-[200px]">
                <div className="mt-12 flex justify-center gap-5 w-[100%] h-[70px]">
                    <div className="vsm:max-sm:item-center rounded-xl items-center bg-gray-200 flex w-[80%] h-[64px]">
                        <img
                            className="mx-4 mt-1"
                            width="44"
                            height="44"
                            src="https://img.icons8.com/pastel-glyph/64/search--v2.png"
                            alt="search--v2"
                        />
                        <input
                            onChange={(e) =>{ 
                                setSearchInput(e.target.value);
                                fetchData();
                            }}
                            className="bg-gray-200 text-2xl font-semibold outline-0 rounded-xl w-[642px] h-[64px] placeholder-black"
                            value={inputfromsearch}
                            type="text"
                        />
                    </div>
                    <button
                        onClick={handlebutton}
                        type="button"
                        className="vsm:max-sm:w-[100px] vsm:max-sm:ml-[6.2rem] vsm:max-sm:text-md text-lg rounded-xl bg-black w-[110px] h-[64px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="max-w-screen justify-between vsm:max-sm:ml-12 vsm:max-sm:mt-10 lg:mx-36  gap-5 flex flex-wrap">
                {showgif()}
            </div>
            <div className="mt-20">
                <div className="mt-2 justify-center flex items-center">
                    <div className="space-x-4 vsm:max-sm:-mt-14">
                        <motion.button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={currentPage === 1}
                        >
                            &larr; Previous
                        </motion.button>

                        <motion.button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1 }}
                            disabled={currentPage === totalPages}
                        >
                            Next &rarr;
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
