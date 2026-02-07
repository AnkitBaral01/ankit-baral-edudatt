import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getProgressReport = createAsyncThunk('progress/get-progress', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/repot-card");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    report: []
};

const progressCardSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProgressReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProgressReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload?.data;          
            })
            .addCase(getProgressReport.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export const {  } = progressCardSlice.actions;

export default progressCardSlice.reducer;