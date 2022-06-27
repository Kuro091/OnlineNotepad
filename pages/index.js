import { isEmpty } from 'lodash'
import { useState, useEffect, useMemo, Fragment, createRef } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { LinePickModal } from '../components/LinePickModal'
import { ListGrid } from '../components/ListGrid'
import { LoginModal } from '../components/LoginModal'
import { Main } from '../components/Main'
import { SideBar } from '../components/SideBar'
import { TopNav } from '../components/TopNav'
import { logIn, logOut, setDebounceValue, setUserData } from '../features/auth/authSlice'
import { getNotes, getNotesServer, setNotes, addNote } from '../features/notes/notesSlice'
import { supabase } from '../utils/supabaseClient'

function Home() {

  const contentRef = createRef();

  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);
  const auth = useSelector(state => state.auth);
  const viewMode = useSelector(state => state.auth.viewMode);
  const user = supabase.auth.user();


  useEffect(() => {
    if (user && isEmpty(auth.data)) {
      dispatch(setUserData(user))
      dispatch(getNotesServer(user.id));
    }
  }, [auth.data]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      switch (_event) {
        case "SIGNED_IN":
          dispatch(setUserData(session.user))
          dispatch(getNotesServer(session.user.id));
          dispatch(setDebounceValue(750))
          break;
        case "SIGNED_OUT":
          dispatch(setUserData({}))
          dispatch(getNotes())
          dispatch(setDebounceValue(200))
          break;

      }
    })
  }, [])

  return (
    <Fragment>

      { notes.pending &&
        <div className='bg-white z-[9999] opacity-50 absolute h-full w-full'>
          <TailSpin className='absolute top-[50%]' color="#00BFFF" height={80} width={80} />

        </div>
      }
      <div className={`justify-center items-center h-full w-full bg-white font-sans ${notes.pending ? 'pointer-events-none' : ''}`}>

        {auth.isModalShow && <LoginModal />}
        <div className="min-h-screen h-full grid grid-rows-12 grid-cols-6 grid-flow-row text-white text-sm text-center">
          {auth.isLineModalShow && <LinePickModal />}
          <div className="row-end-1 col-span-6 bg-gray-300">
            {/* TopNav */}
            <TopNav />
          </div>


          {viewMode && viewMode == 'list' &&
            <>
              <div className="row-[span_12_/_span_12] p-4 border bg-white text-black ">
                {/* Sidebar */}
                <SideBar />
              </div>
              <div className="row-[span_12_/_span_12] col-span-5 p-4 border bg-white text-black">
                {/* Main */}
                <Main contentRef={contentRef} />
              </div>
            </>
          }

          {viewMode && viewMode == 'list_grid' &&
            <div className='row-[span_12_/_span_12] col-span-6'>
              <ListGrid />
            </div>
          }



        </div>

      </div >
    </Fragment>


  )
}

export default Home