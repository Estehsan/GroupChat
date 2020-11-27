export const ADD_NOTE = 'ADD_NOTE'


  let noteID = 0

export function addnote(note) {
  return {
    type: ADD_NOTE,
    id: noteID++,
    note
  }
}


// reducer

const initialState = [];

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note
        }
      ]

    default:
      return state
  }
}

export default notesReducer