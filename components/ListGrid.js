import { PencilIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { setViewMode } from '../features/auth/authSlice'
import { setSelected } from '../features/notes/notesSlice'
import { strip } from '../utils/helper'


export const ListGrid = () => {
    const notes = useSelector(state => state.notes.data)
    const dispatch = useDispatch();

    const switchToEdit = (noteId) => {
        dispatch(setViewMode('list'));
        dispatch(setSelected(noteId));
    }
    return (
        <>
            <div className="h-full px-3 md:lg:xl:px-40  border-t border-b py-20 bg-opacity-10" style={{ backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')" }}>
                <div className="grid grid-cols-1 gap-5 md:lg:xl:grid-cols-6 group">
                    {notes && notes.map(note =>
                    (
                        <div
                            key={note.id}
                            onClick={() => switchToEdit(note.id)}
                            className="bg-white p-10 flex flex-col items-center text-center group md:lg:xl:border hover:bg-slate-50 cursor-pointer break-words">
                            <span className="p-5 rounded-full bg-gray-900 text-white">
                                <PencilIcon className='w-10 h-10' />
                            </span>
                            <p className="text-xl w-[200px] font-medium text-slate-700 mt-3 text-ellipsis overflow-hidden inline-block line-clamp-2">{note.title}</p>
                            <p className="w-[200px] h-[35px] mt-2 text-sm text-slate-500 text-ellipsis overflow-hidden inline-block line-clamp-2">{strip(note.content.html)}</p>
                        </div>

                    )
                    )}
                </div>

            </div >


        </>
    )
}
