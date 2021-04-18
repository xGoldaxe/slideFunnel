import { pageReducer } from "./slide/pageReducer";
import { elementReducer } from "./slide/elementReducer";


export const slideReducer = (state , action) => {
    pageReducer(state, action);
    elementReducer(state, action);
    return {...state}
}