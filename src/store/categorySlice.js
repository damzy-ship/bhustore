import {
    createSlice
} from "@reduxjs/toolkit";
import {
    STATUS
} from "../utils/status";
import {
    getDocs,
    collection,
    query,
    where
} from "firebase/firestore";
import {
    db
} from "../base";
import { shuffleArray } from "../utils/helpers";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        status: STATUS.IDLE,
        catProductAll: [],
        catProductAllStatus: STATUS.IDLE,
        catProductSingle: [],
        catProductSingleStatus: STATUS.IDLE
    },

    reducers: {
        setCategories(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setCategoriesProductAll(state, action) {
            state.catProductAll.push(action.payload);
        },
        setCategoriesStatusAll(state, action) {
            state.catProductAllStatus = action.payload;
        },
        setCategoriesProductSingle(state, action) {
            state.catProductSingle = action.payload;
        },
        setCategoriesStatusSingle(state, action) {
            state.catProductSingleStatus = action.payload;
        }
    }
});

export const {
    setCategories,
    setStatus,
    setCategoriesProductAll,
    setCategoriesStatusAll,
    setCategoriesProductSingle,
    setCategoriesStatusSingle
} = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => {
    return async function fetchCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const data = []
            const colRef = collection(db, "categories");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach(doc => {
                data.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            dispatch(setCategories(data.slice(0, 5)));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}

const returnQuery = (id, isSearchPage) => {
    if(!isSearchPage){
        return query(collection(db, "products"), where('categories', "array-contains", id));
    }

    const searchWords = [id, ...id.split(' ')];
    return query(collection(db,"products"), where('searchWords', "array-contains-any", searchWords));
}


export const fetchProductsByCategory = (categoryID, dataType, isSearchPage = false) => {
    
    return async function fetchCategoryProductThunk(dispatch) {
        if (dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING));
        if (dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING));

        try {
            const querySnapshot = await getDocs(returnQuery(categoryID, isSearchPage));
            const data = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                data.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

        
            if (dataType === 'all') {
                dispatch(setCategoriesProductAll(shuffleArray(data).slice(0, 10)));
                dispatch(setCategoriesStatusAll(STATUS.IDLE));
            }
            if (dataType === 'single') {
                dispatch(setCategoriesProductSingle(shuffleArray(data).slice(0, 20)));
                dispatch(setCategoriesStatusSingle(STATUS.IDLE));
            }
        } catch (error) {
            dispatch(setCategoriesStatusAll(STATUS.ERROR));
        }
    }
}