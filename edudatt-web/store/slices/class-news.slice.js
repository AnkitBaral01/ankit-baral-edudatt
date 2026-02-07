import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getClassNews = createAsyncThunk('classNews/get-classNews', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/class-news");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    classNews: []
};

const classNewsSlice = createSlice({
    name: 'classNews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClassNews.fulfilled, (state, action) => {
                state.loading = false;
                state.classNews = action.payload?.data;
            })
            .addCase(getClassNews.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export const {  } = classNewsSlice.actions;

export default classNewsSlice.reducer;