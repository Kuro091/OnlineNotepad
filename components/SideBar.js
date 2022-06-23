import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../features/notes/notesSlice'

export const SideBar = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.data);

    return (
        <div className="flex flex-col">
            {notes && notes.map((note) => (
                <div onClick={() => dispatch(setSelected(note.id))} key={note.id} className={`flex justify-start w-full h-20 border rounded-lg mt-4 hover:cursor-pointer ${note.selected ? 'bg-gray-200' : 'bg-white'}`}>
                    <div className='max-h-full text-left ml-5 mr-5 mt-4 h-fit w-fit text-ellipsis overflow-hidden'>
                        <p className="text-gray-800 font-bold">{note.title}</p>
                        <div className='flex'>
                            <span className='mr-3'>{note.updated_at.toString().split('T')[1].substr(0, 5)}</span>
                            <span className="text-gray-600 line-clamp-1">{note.content.html}</span>
                        </div>
                    </div>
                </div>
            )
            )}
            {notes.length == 0 && <div>No notes</div>}
        </div>
    )
}
