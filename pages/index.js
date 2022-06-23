import { useState, useEffect, useMemo, Fragment } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Main } from '../components/Main'
import { SideBar } from '../components/SideBar'
import { TopNav } from '../components/TopNav'
import { getNotesServer } from '../features/notes/notesSlice'
import { supabase } from '../utils/supabaseClient'

function Home() {
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(false);
  const notes = useSelector(state => state.notes);
  useEffect(() => {
    setPageLoading(notes.pending)
  }, [notes]);
  useEffect(() => {
    dispatch(getNotesServer());
  }, [dispatch])


  return (
    <Fragment>
      { pageLoading &&
        <div className='bg-white z-[9999] opacity-50 absolute h-full w-full'>
          <TailSpin className='absolute top-[50%]' color="#00BFFF" height={80} width={80} />

        </div>
      }
      <div className={`justify-center items-center h-full w-full bg-white font-sans ${pageLoading ? 'pointer-events-none' : ''}`}>

        <div className="min-h-screen h-full grid grid-rows-12 grid-cols-6 grid-flow-row text-white text-sm text-center">
          <div className="row-end-1 col-span-6 bg-gray-300">
            {/* TopNav */}
            <TopNav />
          </div>
          <div className="row-[span_12_/_span_12] p-4 border bg-white text-black ">
            {/* Sidebar */}
            <SideBar />
          </div>
          <div className="row-[span_12_/_span_12] col-span-5 p-4 border bg-white text-black">
            {/* Main */}
            <Main />
          </div>
        </div>

      </div >
    </Fragment>


  )
}

export default Home