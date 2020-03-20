import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts } from "../../actions/contacts";

export class Contacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    return (
      <Fragment>
        <h2>Contacts</h2>
      </Fragment>
    );
  }
}

// Gives this component a prop called "contacts"
const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts
});

export default connect(mapStateToProps, { getContacts })(Contacts);
