import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    card: []
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            localStorage.removeItem("user")
            state.user = null;
        },
        addCard: (state, action) => {
            state.card.push(action.payload)
        },
        setCard:(state,action)=>{
            state.card=action.payload
        },
        likeCard:(state,action)=>{
            const { postId, userId } = action.payload;
            const card = state.card.find((card) => card._id === postId);
            if (card) {
              const likedByUser = card.like.includes(userId);
      
              if (likedByUser) {
                card.like = card.like.filter((id) => id !== userId);
              } else {
                card.like.push(userId);
              }
            }
            
        }
        
    },
    extraReducers: (builder) => {
        // Disable resetting the state to initial state
        builder
            .addMatcher(
                (action) => action.type.startsWith('redux/reset'),
                (state) => state
            );
    },
})

export const { addCard, login, logout,setCard,likeCard } = dataSlice.actions;
export default dataSlice.reducer



// thunk
export function fetchCard() {
    return async function fetchCardThunk(dispatch,getState) {
        const prop=getState();
        console.log(prop.reducer.user.user._id)
        await axios.get(`http://localhost:5000/post/getallpost/${prop.reducer.user.user._id}`).then((res) => {
            dispatch(setCard(res.data))
        }).catch((error) => {
            console.log(error)
        })
    }
}