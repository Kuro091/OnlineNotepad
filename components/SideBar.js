
export const SideBar = ({ notes }) => {
    return (
        <div className="flex flex-col">
            {notes && notes.map((note) => (
                <div key={note.id} className="flex justify-start bg-white w-full h-20 border rounded-lg mt-4">
                    <div className='text-left ml-5 mt-5'>
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
