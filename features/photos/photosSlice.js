import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer'
import { isEmpty } from 'lodash';
import { supabase } from '../../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid';

// {
//      id: '',
//     noteId: 0,
//     fileUrl: '',
//     filePath: '',
//     fileName: '',
//     lineNumber: 0,
//     ext: '',
//     status: ''
// }

const initialState = {
    data: [],
    pending: false,
    error: false
}

async function downloadImage(path) {
    console.log('path is ', path);
    try {
        const { data, error } = await supabase.storage.from('photos').getPublicUrl(path);

        if (data) return data.publicURL;

        return ''
    } catch (error) {
        console.log('Error downloading image: ', error.message)
    }
}


export const uploadPhotoAsync = createAsyncThunk('photos/upload', async ({ noteId, filePath, file, lineNumber }) => {

    console.log('noteId ', noteId)
    try {
        let { data, error } = await supabase.storage
            .from('photos')
            .upload(filePath, file)
        if (error) console.log('error ', error);
        if (isEmpty(data)) return;
        const { Key: key } = data;
        const url = await downloadImage(filePath);
        return { noteId, filePath: key, fileUrl: url, fileName: file.name, lineNumber }
    } catch (err) {
        console.log('uploadErr ', err);
    }



    //return data;
})

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotoStatus: (state, { payload }) => {
            const { id, status } = payload;
            const findPhoto = state.data.find(photo => photo.id == id);
            findPhoto.status = status;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(uploadPhotoAsync.pending, state => {
                state.pending = true;
            })
            .addCase(uploadPhotoAsync.fulfilled, (state, { payload }) => {
                state.error = false;
                if (isEmpty(payload)) return;
                payload.status = 'new';
                payload.id = uuidv4().substr(0, 4);
                state.data.push(payload);
                state.pending = false;
            })
            .addCase(uploadPhotoAsync.rejected, state => {
                state.data = []
                state.error = true;
                state.pending = false;
            })
    }
})

export const { setPhotoStatus } =
    photosSlice.actions;


export const selectLastPhotoByNoteId = (state, noteId) => {
    const allPhotos = state.photos.data;
    if (isEmpty(allPhotos)) return;
    //get the last photo
    const lastPhoto = allPhotos.filter(photo => photo.noteId == noteId && photo.status == 'new').at(-1);
    if (lastPhoto) { return lastPhoto; }

    return;
}

export default photosSlice.reducer;