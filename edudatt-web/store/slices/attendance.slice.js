import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getAttendance = createAsyncThunk('attendance/get-attendance', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/attendance");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const applyLeave = createAsyncThunk('attendance/apply-leave', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("/attendance/leave-request", data);

        return response.data;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    attendance: []
};

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAttendance.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAttendance.fulfilled, (state, action) => {
                state.loading = false;
                state.attendance = action.payload?.data;          
            })
            .addCase(getAttendance.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export const {  } = attendanceSlice.actions;

export default attendanceSlice.reducer;