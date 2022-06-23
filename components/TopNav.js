import {
    ViewListIcon,
    ViewGridIcon,
    TrashIcon,
    PencilAltIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
    addNoteServer,
    deleteNoteServer,
    selectSelectedNote,
} from "../features/notes/notesSlice";
export const TopNav = () => {
    const dispatch = useDispatch();
    const selectedNote = useSelector(selectSelectedNote);
    const notes = useSelector((state) => state.notes);
    const leftFeatures = [
        {
            name: "List",
            type: "list",
            icon: <ViewListIcon />,
        },
        {
            name: "ListGrid",
            type: "listGrid",
            icon: <ViewGridIcon />,
        },
        {
            name: "Delete",
            type: "delete",
            icon: <TrashIcon />,
            clickHandler: () => {
                dispatch(deleteNoteServer(selectedNote.id));
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
                dispatch(addNoteServer());
            },
        },
        {
            name: "Listx",
            type: "list",
            icon: <ViewListIcon />,
        },
        {
            name: "Lista",
            type: "list",
            icon: <ViewListIcon />,
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

    console.log(notes);

    return (
        <div className="flex flex-row">
            {leftFeatures &&
                leftFeatures.map((feature) => (
                    <div
                        onClick={feature.clickHandler}
                        key={feature.name}
                        className={`p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500 hover:cursor-pointer ${feature.disabled ? 'pointer-events-none opacity-10' : ''} `}
                    >
                        {feature.icon}
                    </div>
                ))}

            <div className="mx-5 my-3 border-r-4 rounded-lg border-gray-100 "></div>

            {rightFeatures &&
                rightFeatures.map((feature) => (
                    <div
                        disabled={feature.disabled}
                        onClick={feature.clickHandler}
                        key={feature.name}
                        className="p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500 hover:cursor-pointer"
                    >
                        {feature.icon}
                    </div>
                ))}
        </div>
    );
};
