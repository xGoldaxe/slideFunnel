export const rightClickMenuReducer = (state , action) => {
    if(action.type === "ACTIVATE_MENU") {
        state.activate = action.payload.direction;
        state.x = action.payload.x;
        state.y = action.payload.y;
        state.tools = action.payload.tools;
        return {...state}
    } 
    return state
}
