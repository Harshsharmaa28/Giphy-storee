'use client'
import { useEffect, useState } from 'react';
import Loading from './loading';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Giphy from './giphy';
import { auth } from '@/app/firebase/firebaseconfig';
import { useRouter } from 'next/navigation';

export function Homepage() {
  const [searchinput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const [gifUrl, setGifUrl] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [array, setarray] = useState();

  const user = auth.currentUser;

  console.log(user)
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user)
      if (!user) {
        router.push('/SignIn');
      }
    });
    return () => unsubscribe();
  }, []);

  const handlelogout = async () => {
    console.log("clicked")
    try {
      await auth.signOut();
      console.log("ho gaya logout")
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  const checkinput = () => {
    if (searchinput != null) {
      fetchData();
    }
    else {
      setShowWarning(true);
      toast.error('Please Enter some Text');
    }
  }
  const updatesearchterm = (newsearchterm) => {
    setSearchInput(newsearchterm);
  };
  const fetchData = async () => {
    try {
      setLoading(true);

      const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
      const searchTerm = searchinput;
      console.log(searchTerm);

      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch data from Giphy API');
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const firstGifUrl = data.data[0].images.original.url;
        setarray(data);
        setGifUrl(firstGifUrl);
        console.log('gift URL found:', firstGifUrl);
      } else {
        console.error('No gifs found for the given search term.');
      }
    } catch (error) {
      console.error('Error fetching data from Giphy API:', error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='h-screen'>
      {loading && <Loading inputfromsearch={searchinput}></Loading>}
      {gifUrl && <Giphy updatesearchterm={updatesearchterm} fetchData={fetchData} inputfromsearch={searchinput} data={array}></Giphy>}
      {!loading && !gifUrl &&
        <div className=' h-screen flex items-center justify-center'>
          <div className="flex flex-col gap-20 mt-10 items-center justify-center ">
            <div className="waviy">
              <span style={{ '--i': 1 }}>S</span>
              <span style={{ '--i': 2 }}>E</span>
              <span style={{ '--i': 3 }}>A</span>
              <span style={{ '--i': 4 }}>R</span>
              <span style={{ '--i': 5 }}>C</span>
              <span style={{ '--i': 6 }}>H</span>
              <span style={{ '--i': 7 }}>.</span>
              <span style={{ '--i': 8 }}>.</span>
              <span style={{ '--i': 9 }}>H</span>
              <span style={{ '--i': 10 }}>E</span>
              <span style={{ '--i': 11 }}>R</span>
              <span style={{ '--i': 12 }}>E</span>
            </div>

            <div className="flex gap-5  w-[816px] h-[122px]">
              <div className="rounded-xl items-center bg-gray-200 flex w-[742px] h-[74px]">
                <img
                  className=" mx-4 mt-1"
                  width="44"
                  height="44"
                  src="https://img.icons8.com/pastel-glyph/64/search--v2.png"
                  alt="search--v2"
                />
                <input
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-gray-200  font-semibold outline-0 rounded-xl w-[642px] h-[64px] text-xl  placeholder-black"
                  placeholder="Article name or keywords..."
                  type="text"
                />
              </div>
              <Link href={'/'}>
                <button
                  onClick={checkinput}
                  type="button"
                  className="text-lg rounded-xl bg-black w-[110px] h-[74px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Search
                </button>
              </Link>
              {showWarning && <ToastContainer></ToastContainer>}
            </div>
            <button onClick={handlelogout}
              className="text-lg rounded-xl bg-black w-[120px] h-[54px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Logout</button>
          </div>

        </div>
      }
    </div>
  );
}