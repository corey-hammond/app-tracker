import React, { Fragment } from "react";
import Form from "./Form";
import Contacts from "./Contacts";

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Contacts />
    </Fragment>
  );
}
