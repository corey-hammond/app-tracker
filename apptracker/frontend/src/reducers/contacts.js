import { GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT } from "../actions/types.js";

const initialState = {
  contacts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case ADD_CONTACT:
      return {
        ...state,
        // syntax for adding a new contact to the contacts array
        contacts: [...state.contacts, action.payload]
      };
    default:
      return state;
  }
}
