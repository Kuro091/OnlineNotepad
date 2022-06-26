import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer'


const initialState = {
    data: [
        {
            noteId: 0,
            photoUrl: '',
            photoPath: '',
            photoName: ''
            lineNumber: 0
        }
    ],
    pending: false,
    error: false
}

export const uploadPhotoAsync = createAsyncThunk('photos/upload', async () => {


    return data;
})

export const photosSlice = createSlice(
    name: 'photos',
    initialState,
    reducers: {

},
    extraReducers: builder => {
        builder
            .addCase(uploadPhotoAsync.pending, state => { })
            .addCase(uploadPhotoAsync.fulfilled, (state, { payload }) => { })
            .addCase(uploadPhotoAsync.rejected, state => { })
    }
)

export const { } =
    photosSlice.actions;

export photosSlice.reducers;