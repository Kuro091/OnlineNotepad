import { createSlice } from '@reduxjs/toolkit'


const initialState = [
    {
        id: 1,
        title: 'Title1',
        content: 'hi',
        timestamp: '9:34 AM',
        selected: false
    },
    {
        id: 2,
        title: 'Title2',
        content: 'hi',
        timestamp: '9:34 AM',
        selected: true
    },
    {
        id: 3,
        title: 'Title3',
        content: 'hi',
        timestamp: '9:34 AM',
        selected: false
    },
    {
        id: 4,
        title: 'Title4',
        content: 'hi',
        timestamp: '9:34 AM',
        selected: false
    },
    {
        id: 5,
        title: 'Title5',
        content: 'hi',
        timestamp: '9:34 AM',
        selected: false
    },
]

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload)
        },
        setSelected: (state, { payload: id }) => {
            state.forEach(note => note.selected = false);
            state.find(note => note.id == id).selected = true;
        }
    }
})

export const {
    addNote,
    setSelected
} = notesSlice.actions

export default notesSlice.reducer