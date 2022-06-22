import { useState } from 'react'
import ContentEditable from 'react-contenteditable';

export const Main = ({ note }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

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

    return (
        <div className="h-full min-h-full">
            <div>{note.timestamp}</div>
            <div className='text-left h-full min-h-full'>
                <ContentEditable
                    html={title}
                    onChange={(e) => handleChange(e, 'title')}
                />
                <ContentEditable
                    className='h-5/6'
                    html={content}
                    onChange={(e) => handleChange(e, 'content')}
                />


                <div>new title is {title}</div>
                <div>new title is {content}</div>
            </div>



        </div>
    )
}
