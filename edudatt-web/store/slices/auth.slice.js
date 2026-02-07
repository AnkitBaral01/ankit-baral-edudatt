import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const signup = createAsyncThunk('auth/signup', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post("/user", payload);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post("/auth/login", payload);

        if(response.success) {
            localStorage.setItem('AUTH_TOKEN', response.data?.accessToken);
            localStorage.setItem('REFRESH_TOKEN', response.data?.refreshToken);

            return response;
        }

        return null;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/user");

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const forgotPassword = createAsyncThunk('auth/forgot-password', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post("/user/forgot-password", payload);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const changePassword = createAsyncThunk('auth/change-password', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.patch("/user/update-password", payload);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const verifyToken = createAsyncThunk('auth/verify-account', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get("/user/verify/" + payload);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

export const resetPassword = createAsyncThunk('auth/reset-password', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.patch("/user/reset-password", payload);

        return response;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

const initialState = {
    auth: null,
    currentChild: null,
    loading: false,
    authLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        markUnAuthenticated: (state) => {
            state.auth = null;
            state.authLoading = false;
        },
        setCurrentChild: (state, action) => {
            state.currentChild = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(refresh.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.authLoading = false;
                state.auth = action.payload?.data;

                const existingChild = localStorage.getItem("CURRENT_CHILD") || "undefined";

                if(action.payload?.data?.students?.length > 0 && existingChild === "undefined") {
                    localStorage.setItem('CURRENT_CHILD', action.payload?.data?.students[0]?._id);

                    state.currentChild = action.payload?.data?.students[0];
                } else if (existingChild) {
                    state.currentChild = action.payload?.data?.students?.find(student => student?._id === existingChild)
                }
            })
            .addCase(refresh.rejected, (state, action) => {
                state.authLoading = false;
            })

            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.forgotPasswordLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPasswordLoading = false;
            })

            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
            })

            .addCase(changePassword.pending, (state) => {
                state.changePasswordLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.changePasswordLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changePasswordLoading = false;
            })
    },
});

export const { markUnAuthenticated, setCurrentChild } = authSlice.actions;

export default authSlice.reducer;