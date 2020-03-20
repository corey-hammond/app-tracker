import { combineReducers } from "redux";
import contacts from "./contacts";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  contactsReducer: contacts,
  errorsReducer: errors,
  messagesReducer: messages
});
