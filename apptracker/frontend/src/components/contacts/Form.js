import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addContact } from "../../actions/contacts";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    comments: ""
  };

  static propTypes = {
    addContact: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    // construct the new contact
    const { name, email, comments } = this.state;
    const contact = { name, email, comments };
    this.props.addContact(contact);
    this.setState({
      name: "",
      email: "",
      comments: ""
    });
  };

  render() {
    const { name, email, comments } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Contact</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea
              type="text"
              name="comments"
              onChange={this.onChange}
              value={comments}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addContact })(Form);
