export const pageReducer = function reducer(state, action) {
    if(action.type === 'ADD_PAGE') {
        var newPage = {
            name: `Page 1`,
            color: 'grey',
            elements: [{
                name: 'Element 1',
                type: 'title',
                value: 'Default title',
                variables: {
                    color: 'blue',
                    size: '30px',
                    textAlign: 'center'
                }
            }]
        }
        state.pages.push(newPage)
        return {...state}
    } 
    if(action.type === "CHANGE_TITLE_PAGE") {
        state.pages[action.payload.page].name = action.payload.title;
        return {...state}
    }
    if(action.type === "DELETE_PAGE") {
        if(state.pages.length>1) {
            state.pages.splice(action.payload.page,1)
        }
        return {...state}
    }
    if(action.type === "DUPPLICATE_PAGE") {
        state.pages.splice(action.payload.page+1,0,{...action.payload.pageContent})
        return {...state}
    }
}

