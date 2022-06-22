import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Main } from '../components/Main'
import { SideBar } from '../components/SideBar'
import { TopNav } from '../components/TopNav'
import { supabase } from '../utils/supabaseClient'

function Home() {

  return (
    <div className="justify-center items-center h-full w-full bg-white font-sans">
      <div className="min-h-screen h-full grid grid-rows-12 grid-cols-6  text-white text-sm text-center">
        <div className="col-span-6 bg-gray-400">
          {/* TopNav */}
          <TopNav />
        </div>
        <div className="row-[span_11_/_span_11] p-4 border bg-white text-black ">
          {/* Sidebar */}
          <SideBar />
        </div>
        <div className="row-[span_11_/_span_11] col-span-5 p-4 border bg-white text-black">
          {/* Main */}
          <Main />
        </div>
      </div>

    </div >

  )
}

export default Home