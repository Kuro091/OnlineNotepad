import {
    ViewListIcon,
    ViewGridIcon,
    TrashIcon,
    PencilAltIcon,
    UsersIcon,
    BanIcon
} from "@heroicons/react/solid";
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { showModal, logOut, selectUser, setViewMode } from '../features/auth/authSlice';
import {
    addNoteServer,
    deleteNoteServer,
    selectSelectedNote,
    addNote,
    deleteNote,
    updateNote,
} from "../features/notes/notesSlice";

import { supabase } from '../utils/supabaseClient';


export const TopNav = () => {
    const dispatch = useDispatch();
    const selectedNote = useSelector(selectSelectedNote);
    const notes = useSelector((state) => state.notes);
    const auth = useSelector(selectUser);
    const viewMode = useSelector(state => state.auth.viewMode);

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
            disabled: notes.data.length <= 0,
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
            name: "Listd",
            type: "list",
            icon: <ViewListIcon />,
        },
        {
            name: "Listw",
            type: "list",
            icon: <ViewListIcon />,
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

    return (
        <div className="flex flex-row">
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
                    <div
                        onClick={feature.clickHandler}
                        key={feature.name}
                        className={`p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500 hover:cursor-pointer  ${feature.disabled ? 'pointer-events-none opacity-10' : ''}`}
                    >
                        {feature.icon}
                    </div>
                ))
            }
        </div >
    );
};
