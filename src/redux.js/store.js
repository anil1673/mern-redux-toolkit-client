import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./index.js"

const store=configureStore({
    reducer:{
        reducer:dataReducer
    }
})

export default store