import {
    ViewListIcon,
    ViewGridIcon,
    TrashIcon,
    PencilAltIcon,
    UsersIcon,
    BanIcon,
    PhotographIcon,
    MenuAlt1Icon
} from "@heroicons/react/solid";
import { isEmpty, isFinite } from 'lodash';
import _debounce from 'lodash/debounce';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showModal, logOut, selectUser, setViewMode, setDebounceValue, setIsLineModalShow } from '../features/auth/authSlice';
import {
    addNoteServer,
    deleteNoteServer,
    selectSelectedNote,
    addNote,
    deleteNote,
    updateNote,
} from "../features/notes/notesSlice";

import { supabase } from '../utils/supabaseClient';
import { indexOfGroup } from '../utils/helper';


const TopNav = () => {
    const dispatch = useDispatch();
    const selectedNote = useSelector(selectSelectedNote);
    const notes = useSelector((state) => state.notes);
    const auth = useSelector(selectUser);
    const viewMode = useSelector(state => state.auth.viewMode);
    const currentCaretPos = useSelector(state => state.notes.currentCaretPos);

    const debounceValue = useSelector(state => state.auth.debounceValue);
    const [debounceVal, setDebounceVal] = useState(200);

    const [subMenuActivation, setSubMenuActivation] = useState({
        Formatting: false
    })

    useEffect(() => {
        setDebounceVal(debounceValue)
    }, [debounceValue])

    const handleChangeDebounceValue = useCallback((e) => {
        const val = e.target.value;
        if (isFinite(Number(val))) {
            setDebounceVal(val)
            if (val < 200) {
                dispatch(setDebounceValue(200))
                return;
            }
            if (val > 10000) {
                dispatch(setDebounceValue(10000))
                return;
            }
            dispatch(setDebounceValue(val))
        }
    })

    const handleOnBlurDebounceValue = useCallback((e) => {
        const val = e.target.value;
        if (isFinite(Number(val))) {
            setDebounceVal(val)
            if (val < 200) {
                setDebounceVal(200)
                return;
            }
            if (val > 10000) {
                setDebounceVal(10000)
                return;
            }
        }
    })


    const leftFeatures = [
        {
            name: "List",
            type: "list",
            icon: <ViewListIcon />,
            actived: viewMode == 'list',
            clickHandler: () => {
                dispatch(setViewMode('list'))
            }
        },
        {
            name: "ListGrid",
            type: "listGrid",
            icon: <ViewGridIcon />,
            actived: viewMode == 'list_grid',
            clickHandler: () => {
                dispatch(setViewMode('list_grid'))
            }
        },
        {
            name: "Delete",
            type: "delete",
            icon: <TrashIcon />,
            clickHandler: () => {
                if (!isEmpty(auth)) {
                    dispatch(deleteNoteServer(selectedNote.id));
                    return;
                }
                dispatch(deleteNote(selectedNote.id))
            },
            disabled: notes.data.length <= 0 || viewMode == 'list_grid',
        },
    ];

    const rightFeatures = [
        {
            name: "New",
            type: "new",
            icon: <PencilAltIcon />,
            clickHandler: () => {
                if (!isEmpty(auth)) {
                    dispatch(addNoteServer(auth.id));
                    return;
                }
                dispatch(addNote())
            },
        },
        {
            name: "Login",
            type: "login",
            icon: <UsersIcon />,
            clickHandler: () => {
                dispatch(showModal());
            },
            disabled: !isEmpty(auth)
        },
        {
            name: "Logout",
            type: "logout",
            icon: <BanIcon />,
            clickHandler: () => {
                dispatch(logOut());
            },
            disabled: isEmpty(auth)

        },
        {
            name: "Photo",
            type: "photo",
            icon: <PhotographIcon />,
            clickHandler: () => {
                dispatch(setIsLineModalShow(true));
            },
        },
        {
            name: "Formatting",
            type: "format",
            icon: <MenuAlt1Icon />,
            clickHandler: (e) => {
                e.preventDefault();
                boldCommand();
                setSubMenuActivation({ ...subMenuActivation, Formatting: !subMenuActivation['Formatting'] })
            },
            subMenu: [
                {
                    name: 'h1',
                    clickHandler: (e) => {
                        e.preventDefault();
                        document.execCommand('formatBlock', false, 'h1');
                        setSubMenuActivation({ ...subMenuActivation, Formatting: false })
                    },
                    className: 'text-2xl'
                },
                {
                    name: 'h2',
                    clickHandler: () => {
                        document.execCommand('formatBlock', false, 'h2');
                        setSubMenuActivation({ ...subMenuActivation, Formatting: false })

                    },
                    className: 'text-xl'
                },
                {
                    name: 'h3',
                    clickHandler: () => {
                        setSubMenuActivation({ ...subMenuActivation, Formatting: false })
                        document.execCommand('formatBlock', false, 'h3');
                    },
                    className: 'text-lg'
                },
                {
                    name: 'normal',
                    clickHandler: () => {
                        setSubMenuActivation({ ...subMenuActivation, Formatting: false })
                        document.execCommand('formatBlock', false, 'div');
                    },
                    className: ''
                },
            ]
        },
        {
            name: "Listf",
            type: "list",
            icon: <ViewListIcon />,
        },
        {
            name: "Listg",
            type: "list",
            icon: <ViewListIcon />,
        },

    ];

    function boldCommand() {
        const strongElement = document.createElement("strong");
        const userSelection = window.getSelection();
        //console.log(userSelection)
        const selectedTextRange = userSelection.getRangeAt(0);
        selectedTextRange.surroundContents(strongElement);
    }

    return (
        <div className="flex flex-row ">
            {leftFeatures &&
                leftFeatures.map((feature) => (
                    <div
                        onClick={feature.clickHandler}
                        key={feature.name}
                        className={`p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500 hover:cursor-pointer ${feature.disabled ? 'pointer-events-none opacity-10' : ''}
                        ${feature.actived ? 'bg-slate-600' : ''} `}
                    >
                        {feature.icon}
                    </div>
                ))
            }

            <div className="mx-5 my-3 border-r-4 rounded-lg border-gray-100 "></div>

            {
                rightFeatures &&
                rightFeatures.map((feature) => (
                    <div key={feature.name}>
                        <div
                            onClick={feature.clickHandler}
                            className={`p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500 hover:cursor-pointer  ${feature.disabled ? 'pointer-events-none opacity-10' : ''}`}
                        >
                            {feature.icon}
                        </div>

                        {feature.subMenu != undefined && subMenuActivation[feature.name] &&
                            <div className='bg-slate-900 text-left absolute w-fit py-7 px-4 '>
                                {feature.subMenu.map((subMenu) => <div key={subMenu.name} className={subMenu.className + ' hover:bg-slate-100 hover:text-black hover:cursor-pointer'} onClick={subMenu.clickHandler}>Demo</div>)}

                            </div>
                        }
                    </div>
                ))
            }

            <div className='text-black mt-5 ml-auto mr-5'>
                Time to update 750 (0.75s) - 10000 (10s) (if logged in, put it at at least 750):
                <input className='h-6' type="text" max='10000' value={debounceVal} onBlur={(e) => { handleOnBlurDebounceValue(e) }} onChange={(e) => handleChangeDebounceValue(e)} />
            </div>
        </div >
    );
};

export { TopNav }
