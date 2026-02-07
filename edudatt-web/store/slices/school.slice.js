import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getSchools = createAsyncThunk('school/get-schools', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/school");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const getCurrentSchool = createAsyncThunk('school/get-school', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get("/school/" + payload.id);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const linkChild = createAsyncThunk('school/link-child', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post("/student/search", payload);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const getClasses = createAsyncThunk('school/get-classes', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get("/class/" + payload.id);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    schools: [],
    classes: [],
    loading: false,
    schoolLoading: false,
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSchools.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSchools.fulfilled, (state, action) => {
                state.loading = false;
                state.schools = action.payload?.data;
            })
            .addCase(getSchools.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(getClasses.pending, (state) => {
                state.loading = true;
                state.classes = [];
            })
            .addCase(getClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.classes = action.payload?.data;
            })
            .addCase(getClasses.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(linkChild.pending, (state) => {
                state.loading = true;
            })
            .addCase(linkChild.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem("CURRENT_CHILD", action.payload?.data?._id);
            })
            .addCase(linkChild.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(getCurrentSchool.pending, (state) => {
                state.schoolLoading = true;
            })
            .addCase(getCurrentSchool.fulfilled, (state, action) => {
                state.schoolLoading = false;
                state.currentSchool = action.payload?.data;
            })
            .addCase(getCurrentSchool.rejected, (state, action) => {
                state.schoolLoading = false;
            })
    },
});

export const {  } = schoolSlice.actions;

export default schoolSlice.reducer;