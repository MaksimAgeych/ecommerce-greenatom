import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    name: null,
}

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            setUser: (state, action) => {
                state.email = action.payload.email;
                state.id = action.payload.id;
                state.token = action.payload.token;
                state.name = action.payload.name;
            },
            removeUser: (state) => {
                state.email = null;
                state.id = null;
                state.token = null;
            },
        }
    }

)  
 export const {setUser, removeUser} = authSlice.actions
 export default authSlice.reducer
//  export const getUser = useAppSelector(state => state.user)
 