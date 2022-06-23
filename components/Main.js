import { useEffect, useState, memo, useCallback } from 'react'
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedNote, updateNoteServer, updateNote } from '../features/notes/notesSlice';
import _debounce from 'lodash/debounce';

export const Main = memo(() => {
    const selectedNote = useSelector(selectSelectedNote)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState('')

    const debounceUpdate = useCallback(_debounce((updatedObj) => {
        dispatch(updateNoteServer(updatedObj));
    }, 500), [])

    const handleChange = useCallback((e, type) => {
        const value = e.target.value == '<br>' ? ' ' : e.target.value;
        switch (type) {
            case 'title':
                setTitle(value);
                break;
            case 'content':
                setContent(value);
                break;
        }
        const updatedObj = { ...selectedNote, title: title, content: { html: content }, updated_at: new Date() };
        debounceUpdate(updatedObj);
    })

    useEffect(() => {
        if (selectedNote.id) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content.html);
            //setTimestamp(selectedNote.updated_at.toString())
            return;
        }
        setTitle('');
        setContent('');
        setTimestamp('');
    }, [selectedNote.id, selectedNote.title, selectedNote.content])

    return (
        <div className="h-full min-h-full">
            <div>{timestamp}</div>
            {selectedNote.title &&
                <div className='text-left h-full min-h-full text-ellipsis overflow-hidden '>

                    <ContentEditable
                        className='font-bold'
                        html={title}
                        onChange={(e) => handleChange(e, 'title')}
                    />
                    <ContentEditable
                        className='h-5/6'
                        html={content}
                        onChange={(e) => handleChange(e, 'content')}
                    />
                </div>
            }
        </div >
    )
});
