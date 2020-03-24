import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT } from "./types";

// GET CONTACTS
export const getContacts = () => (dispatch, getState) => {
  axios
    .get("/api/contacts/", tokenConfig(getState))
    .then(res => {
      // dispatch GET_CONTACTS action type to the reducer
      dispatch({
        type: GET_CONTACTS, // dispatching action type to contacts reducer
        payload: res.data // returning data from the server
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE CONTACT
export const deleteContact = id => (dispatch, getState) => {
  axios
    .delete(`/api/contacts/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteLead: "Contact Deleted" }));
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD CONTACT
export const addContact = contact => (dispatch, getState) => {
  axios
    .post("/api/contacts/", contact, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addLead: "Contact Added" }));
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
