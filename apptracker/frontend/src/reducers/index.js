import { combineReducers } from "redux";
import contacts from './contacts';
import errors from './errors';

export default combineReducers({
  contactsReducer: contacts,
  errorsReducer: errors
})  