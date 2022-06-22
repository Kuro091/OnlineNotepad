import { ViewListIcon, ViewGridIcon, TrashIcon, PencilAltIcon } from '@heroicons/react/solid'

export const TopNav = () => {
    const leftFeatures = [
        {
            name: 'List',
            type: 'list',
            icon: <ViewListIcon />
        },
        {
            name: 'ListGrid',
            type: 'listGrid',
            icon: <ViewGridIcon />
        },
        {
            name: 'Delete',
            type: 'delete',
            icon: <TrashIcon />,
        }
    ]

    const rightFeatures = [{
        name: 'New',
        type: 'new',
        icon: <PencilAltIcon />
    },
    {
        name: 'List',
        type: 'list',
        icon: <ViewListIcon />
    },
    {
        name: 'List',
        type: 'list',
        icon: <ViewListIcon />
    },
    {
        name: 'List',
        type: 'list',
        icon: <ViewListIcon />
    },
    {
        name: 'List',
        type: 'list',
        icon: <ViewListIcon />
    },
    {
        name: 'List',
        type: 'list',
        icon: <ViewListIcon />
    },
    {
        name: 'List',
        type: 'list',
        icon: <ViewListIcon />
    },]

    return (
        <div className="flex flex-row">
            {leftFeatures && leftFeatures.map(feature => (
                <div key={feature.name} className="mt-2 mx-3 p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500">{feature.icon}</div>
            ))}

            <div className="mx-5 my-3 border-r-4 rounded-lg border-gray-100 "></div>

            {rightFeatures && rightFeatures.map(feature => (
                <div key={feature.name} className="mt-2 mx-3 p-4 w-16 h-16 flex items-center justify-center rounded-lg text-gray-500">{feature.icon}</div>
            ))}
        </div>
    )
}
