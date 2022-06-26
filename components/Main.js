import { useEffect, useState, memo, useCallback, createRef } from 'react'
import { shallowEqual } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedNote, updateNoteServer, updateNote, setCurrentCaretPos } from '../features/notes/notesSlice';
import _debounce from 'lodash/debounce';
import { selectUser } from '../features/auth/authSlice';
import { isEmpty } from 'lodash';
import sanitizeHtml from "sanitize-html";
import { getSelectionCaretAndLine } from '../utils/helper';

export const Main = () => {
    const selectedNote = useSelector(selectSelectedNote)
    const contentRef = createRef();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState({
        type: '',
        timeStr: ''
    })

    const [lines, setLines] = useState([]);

    const debounceValue = useSelector(state => state.auth.debounceValue);

    const notes = useSelector(state => state.notes, shallowEqual);
    const auth = useSelector(state => state.auth.data, shallowEqual);

    //UPDATE HANDLERS
    const debounceUpdateServer = useCallback(_debounce((updatedObj) => {
        dispatch(updateNoteServer(updatedObj));
    }, debounceValue), [debounceValue])

    const debounceUpdate = useCallback(_debounce((updatedObj) => {
        dispatch(updateNote(updatedObj));
    }, debounceValue), [debounceValue])

    const normalUpdate = (updatedObj) => {
        dispatch(updateNote(updatedObj));
    }

    const evaluateCaretPos = () => {
        if (contentRef.current) {
            const currentPos = getSelectionCaretAndLine(contentRef.current.getEl());
            return false;
        }
        return false;
    }

    const handleChange = useCallback((e, type) => {
        const value = e.target.value === '<br>' ? ' ' : e.target.value;
        let _title = title;
        let _content = content;
        switch (type) {
            case 'title':
                setTitle(e.target.value);
                _title = value;
                break;
            case 'content':
                setContent(e.target.value);
                evaluateCaretPos();
                _content = value;
                break;
        }
        const updatedObj = { ...selectedNote, title: sanitizeHtml(_title, sanitizeConf), content: { html: sanitizeHtml(_content, sanitizeConf) }, updated_at: new Date() };
        if (isEmpty(auth)) {
            type == 'content' ? debounceUpdate(updatedObj) : normalUpdate(updatedObj)
            return false;
        }
        debounceUpdateServer(updatedObj);
        contentRef.current.focus()
        return false;
    }, [])

    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "img", "div", "br"],
        allowedAttributes: { a: ["href"], img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'] }
    };

    //SANITIZE HANDLERS 
    const sanitize = () => {
        //setTitle(sanitizeHtml(title, sanitizeConf));
        //console.log(sanitizeHtml(content, sanitizeConf));
        //setContent(sanitizeHtml(content, sanitizeConf))
    }

    const switchTimeStamp = () => {
        if (isEmpty(timestamp)) return;
        timestamp.type == 'created_at' ? setTimestamp({ type: 'updated_at', text: 'Updated at', timeStr: selectedNote.updated_at.toLocaleString() })
            : setTimestamp({ type: 'created_at', text: 'Created at', timeStr: selectedNote.created_at.toLocaleString() })
            ;
    }


    const getNoOfLines = (noOfLines) => {
        let lineArr = [];
        for (let i = 0; i < noOfLines; i++) {
            lineArr.push(i);
        }
        return lineArr
    }
    const re = /(<\/div>)|(img*)/g;
    useEffect(() => {
        if (selectedNote.id) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content.html);
            setTimestamp({ type: 'created_at', text: 'Created at', timeStr: selectedNote.created_at.toLocaleString() })
            const imgCount = 0;
            if (selectedNote.content.html.match(re)) {
                selectedNote.content.html.match(re).forEach((match) => { if (match == 'img') imgCount++ })
                setLines(getNoOfLines(selectedNote.content.html.match(re).length + imgCount * 6));
            } else {
                setLines(getNoOfLines(3))
            }
            return;
        }
        setTitle('');
        setContent('');
        setTimestamp('');
    }, [selectedNote.id, selectedNote.content, re])

    return (
        <div className="h-full min-h-full">
            <div onClick={() => switchTimeStamp()}>{timestamp.text} {timestamp.timeStr}</div>
            {selectedNote.title &&
                <div className='text-left h-fit min-h-full text-ellipsis overflow-hidden break-all'>
                    <div className='grid grid-cols-12 grid-rows-12'>
                        <ContentEditable
                            disabled={notes.pending}
                            className='font-bold text-4xl col-span-full row-end-1'
                            html={title}
                            onChange={(e) => { handleChange(e, 'title') }}
                            onBlur={sanitize}

                        />
                        <div className='text-slate-400 col-span-1 row-[span_11_/_span_11] text-lg'>
                            {lines.map(line => <div key={line}>{line} <br /></div>)}
                        </div>
                        <ContentEditable
                            disabled={notes.pending}
                            className='min-h-screen col-[span_11_/_span_11] row-[span_11_/_span_11]'
                            html={content}
                            onChange={(e) => { handleChange(e, 'content') }}
                            onBlur={sanitize}
                            ref={contentRef}
                            onClick={evaluateCaretPos}
                        />

                    </div>
                </div>
            }
        </div >
    )
};
