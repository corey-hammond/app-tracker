import axios from "axios";

import { GET_CONTACTS, DELETE_CONTACT } from "./types";

// GET CONTACTS
export const getContacts = () => dispatch => {
  axios
    .get("/api/contacts/")
    .then(res => {
      // dispatch GET_CONTACTS action type to the reducer
      dispatch({
        type: GET_CONTACTS, // dispatching action type to contacts reducer
        payload: res.data // returning data from the server
      });
    })
    .catch(error => console.log(error));
};

// DELETE CONTACT
export const deleteContact = id => dispatch => {
  axios
    .delete(`/api/contacts/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    })
    .catch(error => console.log(error));
};
