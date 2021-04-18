export const elementReducer = function reducer(state, action) {
    if(action.type === "CHANGE_ELEMENT_TITLE") {
        state.pages[action.payload.page].elements[action.payload.element].name = action.payload.title;
        return {...state}
    }
    if(action.type === "CHANGE_ELEMENT_PROPERTY") {
        var property = action.payload.property
        state.pages[action.payload.page].elements[action.payload.element].variables.[property] = action.payload.value;
        return {...state}
    }
}

