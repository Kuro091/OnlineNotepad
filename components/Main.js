import { useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable';
import { useSelector } from 'react-redux';

export const Main = () => {
    const selectedNote = useSelector(state => state.notes.find(note => note.selected))
    const [title, setTitle] = useState(selectedNote?.title);
    const [content, setContent] = useState(selectedNote?.content);

    const handleChange = (e, type) => {
        const value = e.target.value == '<br>' ? '' : e.target.value;
        switch (type) {
            case 'title':
                setTitle(value);
                break;
            case 'content':
                setContent(value);
                break;
        }
    }

    useEffect(() => {
        setTitle(selectedNote.title);
        setContent(selectedNote.content);
    }, [selectedNote])

    return (
        <div className="h-full min-h-full">
            <div>{selectedNote?.timestamp}</div>
            {selectedNote &&
                <div className='text-left h-full min-h-full'>

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

        </div>
    )
}
