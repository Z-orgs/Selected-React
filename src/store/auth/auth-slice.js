const { createSlice } = require("@reduxjs/toolkit");

const authSilce = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
    },
    reducers: {},
    authLogin: (state, action) => ({
        ...state,
        ...action.payload,
    }),
});

export const { authLogin } = authSilce.actions;

export default authSilce.reducer;