import axios from "axios";

import { GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT, GET_ERRORS } from "./types";

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
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
};

// ADD CONTACT
export const addContact = contact => dispatch => {
  axios
    .post("/api/contacts/", contact)
    .then(res => {
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      console.log(errors);
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
