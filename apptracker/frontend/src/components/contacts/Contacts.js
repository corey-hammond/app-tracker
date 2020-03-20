import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts, deleteContact } from "../../actions/contacts";

export class Contacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    getContacts: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.props);
    this.props.getContacts();
  }

  render() {
    return (
      <Fragment>
        <h2>Contacts</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comments</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.comments}</td>
                <td>
                  <button
                    onClick={this.props.deleteContact.bind(this, contact.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

// Gives this component a prop called "contacts"
const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts
});

export default connect(mapStateToProps, { getContacts, deleteContact })(
  Contacts
);
