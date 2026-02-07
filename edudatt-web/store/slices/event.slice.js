import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getEvents = createAsyncThunk('event/get-events', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/event");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    events: []
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload?.data;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export const {  } = eventSlice.actions;

export default eventSlice.reducer;