import { useEffect, useState, memo, useCallback } from 'react'
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedNote, updateNoteServer, updateNote } from '../features/notes/notesSlice';
import _debounce from 'lodash/debounce';
import { selectUser } from '../features/auth/authSlice';
import { isEmpty } from 'lodash';

export const Main = () => {
    const selectedNote = useSelector(selectSelectedNote)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState({
        type: '',
        timeStr: ''
    })
    const notes = useSelector(state => state.notes);
    const auth = useSelector(state => state.auth.data);

    const debounceUpdate = useCallback(_debounce((updatedObj) => {
        dispatch(updateNoteServer(updatedObj));
    }, 750), [])

    const normalUpdate = (updatedObj) => {
        dispatch(updateNote(updatedObj));
    }

    const handleChange = useCallback((e, type) => {
        const value = e.target.value === '<br>' ? ' ' : e.target.value;
        let _title = title;
        let _content = content;
        switch (type) {
            case 'title':
                setTitle(value);
                _title = value;
                break;
            case 'content':
                setContent(value);
                _content = value;
                break;
        }
        const updatedObj = { ...selectedNote, title: _title, content: { html: _content }, updated_at: new Date() };
        if (isEmpty(auth)) {
            normalUpdate(updatedObj);
            return;
        }
        debounceUpdate(updatedObj);
    })

    const switchTimeStamp = () => {
        if (isEmpty(timestamp)) return;
        timestamp.type == 'created_at' ? setTimestamp({ type: 'updated_at', text: 'Updated at', timeStr: selectedNote.updated_at.toLocaleString() })
            : setTimestamp({ type: 'created_at', text: 'Created at', timeStr: selectedNote.created_at.toLocaleString() })
            ;
    }
    useEffect(() => {
        if (selectedNote.id) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content.html);
            setTimestamp({ type: 'created_at', text: 'Created at', timeStr: selectedNote.created_at.toLocaleString() })
            return;
        }
        setTitle('');
        setContent('');
        setTimestamp('');
    }, [selectedNote.id, selectedNote.title, selectedNote.content])

    return (
        <div className="h-full min-h-full">
            <div onClick={() => switchTimeStamp()}>{timestamp.text} {timestamp.timeStr}</div>
            {selectedNote.title &&
                <div className='text-left h-full min-h-full text-ellipsis overflow-hidden break-all'>
                    <ContentEditable
                        disabled={notes.pending}
                        className='font-bold text-4xl'
                        html={title}
                        onChange={(e) => handleChange(e, 'title')}
                    />
                    <ContentEditable
                        disabled={notes.pending}
                        className='h-5/6 text-lg'
                        html={content}
                        onChange={(e) => handleChange(e, 'content')}
                    />
                </div>
            }
        </div >
    )
};
