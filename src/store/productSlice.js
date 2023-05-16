import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../base";
import { shuffleArray } from "../utils/helpers";


const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUS.IDLE,
    },

    reducers: {
        setProducts(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
    },
});

export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING));
        try{
            const data = []
            const colRef = collection(db, "products");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach(doc => {
                data.push({ ...doc.data(), id: doc.id });
            });

            dispatch(setProducts(shuffleArray(data)));
            dispatch(setStatus(STATUS.IDLE));
        } catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}
