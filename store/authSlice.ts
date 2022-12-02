import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    name: null,
    basket: [],
    fav: [],
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
            setUserName: (state, action) => {
                state.name = action.payload
            }
        }
    }

)  
 export const {setUser, removeUser, setUserName} = authSlice.actions
 export default authSlice.reducer
//  export const getUser = useAppSelector(state => state.user)
 