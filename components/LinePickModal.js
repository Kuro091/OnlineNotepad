import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLineModalShow } from '../features/auth/authSlice';
import { selectSelectedNote, updateNote } from '../features/notes/notesSlice';
import { selectLastPhotoByNoteId, uploadPhotoAsync, setPhotoStatus } from '../features/photos/photosSlice';
import { indexOfGroup } from '../utils/helper';
import { lineCount } from '../utils/lineCountHelper';

export const LinePickModal = ({ contentRef }) => {
    const [lineNumber, setLineNumber] = useState(0);
    const [uploading, setUploading] = useState();
    const dispatch = useDispatch();
    const currentCaretPos = useSelector(state => state.notes.currentCaretPos);
    const selectedNote = useSelector(selectSelectedNote);
    console.log(useSelector(state => state.notes))
    const allPhotos = useSelector(state => state.photos)
    const photo = useSelector(state => selectLastPhotoByNoteId(state, selectedNote ? selectedNote.id : 0));


    useEffect(() => {
        console.log('photo is', photo)
        if (photo) {
            console.log('just uploaded this one ', photo);
            dispatch(setPhotoStatus({ id: photo.id, status: 'old' }))
            insertImageIntoNote(photo.fileUrl);
        }

    }, [photo, allPhotos])

    const insertImageIntoNote = (imgPath) => {
        const currentHtml = selectedNote.content.html;
        dispatch(updateNote({
            ...selectedNote, content: {
                html: currentHtml.slice(0, 0) + `<img width=\'400\' src=\'${imgPath}\'/>` + currentHtml.slice(0)
            }
        }))
    }

    async function uploadImage(event) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                alert('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            dispatch(uploadPhotoAsync({ noteId: selectedNote.id, filePath, file, lineNumber }));
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-slate-800 min-h-screen bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-500">
                    Upload image
            </h1>
                <div>
                    <div>
                        <label className="bg-blue-700  p-4 button primary block" htmlFor="single">
                            {allPhotos.pending ? 'Loading....' : 'Upload'}
                        </label>
                        <input
                            style={{
                                visibility: 'hidden',
                                position: 'absolute',
                            }}
                            type="file"
                            id="single"
                            accept="image/*"
                            onChange={uploadImage}
                            disabled={uploading}
                        />
                        {/* <input
                            className="border-4 mt-5 text-black"
                            type="number"
                            placeholder="Line number"
                            value={lineNumber}
                            onChange={(e) => setLineNumber(e.target.value)}
                            disabled={true}
                        /> */}
                    </div>

                    <button onClick={() => { dispatch(setIsLineModalShow(false)) }} className="bg-red-500 p-4 mt-5 ml-5 rounded-md text-md text-white">Cancel</button>
                </div>
            </div >
        </div>

    )
}
