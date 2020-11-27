import { createStore } from 'redux'
import notesReducer from './UserActions'

const store = createStore(notesReducer)

export default store