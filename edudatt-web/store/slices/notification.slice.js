import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const getNotifications = createAsyncThunk('notification/get-notifications', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/notification");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const markAllAsRead = createAsyncThunk('notification/mark-all-as-read', async (payload, { rejectWithValue }) => {
    try {
        axios.post("/notification/mark-read", { notification_ids: payload });

        return payload;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    notifications: []
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload?.data;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(markAllAsRead.fulfilled, (state, action) => {
                state.notifications = state.notifications?.map((notification) => action.payload?.includes(notification?._id) ? { ...notification, read_at: new Date() } : notification );
            })
    },
});

export const {  } = notificationSlice.actions;

export default notificationSlice.reducer;