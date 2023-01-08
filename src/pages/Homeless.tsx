import React from "react";
import { Link } from "react-router-dom";

const Homeless = () => {
  return (
    <>
      <h1>Homeless</h1>
      <p>
        You need to <Link to="/Login">login</Link> or{" "}
        <Link to="/Register">register</Link>.
      </p>
    </>
  );
};

export default Homeless;
