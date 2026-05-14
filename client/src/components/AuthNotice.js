import React from "react";
import { Link } from "react-router-dom";

const AuthNotice = ({ title = "Sign in to continue", message }) => {
  return (
    <main className="page-panel narrow-page">
      <section className="notice-panel">
        <p className="eyebrow">Account required</p>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link className="button-primary" to="/login">
          Sign in or create account
        </Link>
      </section>
    </main>
  );
};

export default AuthNotice;
