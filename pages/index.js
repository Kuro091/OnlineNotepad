import { useState, useEffect } from 'react'
import { Main } from '../components/Main'
import { SideBar } from '../components/SideBar'
import { TopNav } from '../components/TopNav'
import { supabase } from '../utils/supabaseClient'

export default function Home() {
  const notes = [
    {
      id: 1,
      title: 'Title1',
      content: 'hi',
      timestamp: '9:34 AM'
    },
    {
      id: 2,
      title: 'Title2',
      content: 'hi',
      timestamp: '9:34 AM'
    },
    {
      id: 3,
      title: 'Title3',
      content: 'hi',
      timestamp: '9:34 AM'
    },
    {
      id: 4,
      title: 'Title4',
      content: 'hi',
      timestamp: '9:34 AM'
    },
    {
      id: 5,
      title: 'Title5',
      content: 'hi',
      timestamp: '9:34 AM'
    },
  ]

  return (
    <div className="justify-center items-center h-full w-full bg-white font-sans">
      <div className="min-h-screen h-full grid grid-rows-12 grid-cols-6  text-white text-sm text-center">
        <div className="col-span-6 bg-gray-400">
          {/* TopNav */}
          <TopNav />
        </div>
        <div className="row-[span_11_/_span_11] p-4 border bg-white text-black ">
          {/* Sidebar */}
          <SideBar notes={notes} />
        </div>
        <div className="row-[span_11_/_span_11] col-span-5 p-4 border bg-white text-black">
          {/* Main */}
          <Main note={notes.find(note => note.id == 1)} />
        </div>
      </div>


    </div >

  )
}
