export const editorReducer = (state , action) => {
    if(action.type === "CHANGE_PAGE") {
        state.page = action.payload.page;
        return {...state};
    } 

    if(action.type === "CHANGE_FOCUS") {
        state.focus.key = action.payload.key;
        state.focus.type = action.payload.type;
        return {...state};
    }

    // if(action.type === "OPEN_INPUT_SESSION") {
    //     state.inputSession.activate = true;
    //     state.inputSession.value = action.payload.value;
    //     return {...state};
    // }

    // if(action.type === "CLOSE_INPUT_SESSION") {
    //     state.inputSession.activate = false;
    //     state.inputSession.value = '';
    //     return {...state};
    // }


    if(action.type === "MODIFY_FORM") {
        if(state.inputSession.activate) {
            state.inputSession.value = action.payload.value
        }
        return {...state};
    }

    if(action.type === "CHANGE_MAGNET_LINE") {
        if(action.payload.magnetLines.x) {
            state.previewBox.magnetLines = action.payload.magnetLines;
        } else {
            state.previewBox.magnetLines = {x: [], y: []}
        }
        return {...state}
    }
    return state
}
