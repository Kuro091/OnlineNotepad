import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../features/notes/notesSlice'

export const SideBar = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes);
    return (
        <div className="flex flex-col">
            {notes && notes.map((note) => (
                <div onClick={() => dispatch(setSelected(note.id))} key={note.id} className={`flex justify-start w-full h-20 border rounded-lg mt-4 hover:cursor-pointer ${note.selected ? 'bg-gray-200' : 'bg-white'}`}>
                    <div className='text-left ml-5 mt-4'>
                        <p className="text-gray-800 font-bold">{note.title}</p>
                        <span>{note.timestamp}</span>
                        <span className="text-gray-600 ml-4">{note.title}</span>
                    </div>
                </div>
            )
            )}
        </div>
    )
}
