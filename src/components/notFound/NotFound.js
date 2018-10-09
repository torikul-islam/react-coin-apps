import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound-title">Oops! Page not found!</h1>
      <Link to="/" className="NotFound-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
