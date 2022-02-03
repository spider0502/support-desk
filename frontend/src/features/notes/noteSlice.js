import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from './noteService'

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add a new note to a ticket
export const addNote = createAsyncThunk('notes/add'
    , async (noteData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.addNote(noteData, token)
        } catch (error) {
            const message = (error?.response?.data?.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

// Get notes
export const getNotes = createAsyncThunk('notes/getNotes'
    , async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketId, token)
        } catch (error) {
            const message = (error?.response?.data?.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes.push(action.payload)
            })
            .addCase(addNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer