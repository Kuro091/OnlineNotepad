import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelect } from 'react-supabase';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../utils/supabaseClient';

const initialState = {
    data: [
        {
            id: 1,
            title: 'Sample note',
            created_at: new Date(2022, 6, 22, 1, 1, 1, 1).toLocaleString(),
            updated_at: new Date(2022, 6, 22, 1, 1, 1, 1).toLocaleString(),
            selected: false,
            content: {
                html: 'Sample note'
            }
        }
    ],
    pending: false,
    error: false
}


export const getNotesServer = createAsyncThunk('notes/getNotes', async (userId) => {
    try {
        let { data, error } = await supabase
            .from('notes')
            .select('*, content(*)')
            .eq('user_id', userId);

        if (data.length > 0) {
            data.forEach(note => {
                note.selected = false;
                note.created_at = new Date(note.created_at);
                note.updated_at = new Date(note.updated_at)
            })
            data[0].selected = true;
            return data;
        }
        return initialState.data
    } catch (err) {
        console.log('getErr', err)
    }
})

export const addNoteServer = createAsyncThunk('notes/addNote', async (userId) => {
    try {
        const newNote = generateNewNote();
        const { data: contentData, error: contentErr } = await supabase
            .from('content')
            .insert([{ html: newNote.content.html }], { upsert: true })
            .single()
        delete newNote['content'];
        delete newNote['id'];

        if (contentData) {
            newNote.content_id = contentData.id;
            newNote.user_id = userId;

            const { data: noteInsertData, error: noteErr } = await supabase
                .from('notes')
                .insert([newNote], { upsert: true })
                .single();

            const { data: noteData, error: selectErr } = await supabase
                .from('notes')
                .select('*, content(*)')
                .eq('id', noteInsertData.id)
                .single();

            noteData.created_at = new Date(noteData.created_at);
            noteData.updated_at = new Date(noteData.updated_at);
            return noteData;
        }
    } catch (err) {
        console.log('errAdd', err);
    }


});
export const deleteNoteServer = createAsyncThunk('notes/deleteNote', async (id) => {
    try {
        const { data: noteData, error: noteErr } = await supabase
            .from('notes')
            .delete()
            .eq('id', id)
            .single()

        const { data: contentData, error: contentErr } = await supabase
            .from('content')
            .delete()
            .eq('id', noteData.content_id)
            .single()

        return noteData.id;
    } catch (err) {
        console.log('errDel', err);
    }

});
export const updateNoteServer = createAsyncThunk('notes/updateNote', async (payload) => {

    try {
        const { id, content_id } = payload;

        delete payload['id'];
        delete payload['content_id'];

        const { data: contentData, error: contentErr } = await supabase
            .from('content')
            .update([{ 'html': payload.content.html }])
            .eq('id', content_id)
            .single()

        delete payload['content'];

        const { data: noteData, error: noteErr } = await supabase
            .from('notes')
            .update([payload])
            .eq('id', id)
            .single()
        noteData.created_at = new Date(noteData.created_at);
        noteData.updated_at = new Date(noteData.updated_at);
        noteData.content = contentData;

        return noteData;
    } catch (err) {
        console.log('errUpdate ', err)
    }



});

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, { payload }) => {
            state.data = payload
        },
        addNote: (state, action) => {
            state.data.forEach(note => note.selected = false);
            const newNote = generateNewNote();
            newNote.selected = true
            state.data.push(newNote);
        },
        setSelected: (state, { payload: id }) => {
            state.data.forEach(note => note.selected = false);
            state.data.find(note => note.id == id).selected = true;
        },
        deleteNote: (state, { payload: id }) => {
            let findIndex = state.data.findIndex(note => note.id == id);

            if (findIndex != -1) {
                state.data.splice(findIndex, 1);
                if (state.data.length > 0) {
                    state.data[findIndex - 1] ?
                        state.data[findIndex - 1].selected = true :
                        state.data[0].selected = true;
                }
            }
        },
        updateNote: (state, { payload }) => {
            let findIndex = state.data.findIndex(note => note.id == payload.id);

            if (findIndex != -1) {
                state.data[findIndex].title = payload.title;
                state.data[findIndex].content.html = payload.content.html;
                state.data[findIndex].updated_at = payload.updated_at;
                state.pending = false
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getNotesServer.pending, state => {
                state.pending = true
            })
            .addCase(getNotesServer.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.data = payload;
            })
            .addCase(getNotesServer.rejected, state => {
                state.pending = false;
                state.error = true;
            })
            .addCase(addNoteServer.pending, state => {
                state.pending = true
            })
            .addCase(addNoteServer.fulfilled, (state, { payload }) => {
                state.data.forEach(note => note.selected = false);
                payload.selected = true;
                state.data.push(payload);
                state.pending = false
            })
            .addCase(deleteNoteServer.pending, state => {
                state.pending = true;
            })
            .addCase(deleteNoteServer.fulfilled, (state, { payload: id }) => {
                const findIndex = state.data.findIndex(note => note.id == id);
                if (findIndex != -1) {
                    state.data.splice(findIndex, 1);
                    if (state.data.length > 0) {
                        state.data[findIndex - 1] ?
                            state.data[findIndex - 1].selected = true :
                            state.data[0].selected = true;
                    }
                }
                state.pending = false;
            })
            .addCase(updateNoteServer.pending, state => {
                state.pending = true;
            })
            .addCase(updateNoteServer.fulfilled, (state, { payload }) => {
                const findIndex = state.data.findIndex(note => note.id == payload.id);

                state.data[findIndex].title = payload.title;
                state.data[findIndex].content.html = payload.content.html;
                state.data[findIndex].updated_at = payload.updated_at;
                state.pending = false
            })
    }
})


const generateNewNote = () => {
    return { id: uuidv4().substr(0, 4), title: 'New Note', content: { html: 'New Note' }, created_at: new Date(), updated_at: new Date(), selected: false }
}

export const {
    setSelected,
    updateNote,
    deleteNote,
    addNote,
    setNotes
} = notesSlice.actions

export const selectSelectedNote = (state) => {
    const note = state.notes.data.find(note => note.selected);
    if (note) return note;
    return {}
}

export default notesSlice.reducer