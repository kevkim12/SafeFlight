import React from "react";
import { Link } from "react-router-dom";

const AuthNotice = ({ title = "Sign in to continue", message }) => {
  return (
    <main className="content-page auth-notice-page">
      <section className="notice-panel auth-notice-panel">
        <div>
          <p className="eyebrow">Account required</p>
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
        <div className="auth-notice-action">
          <h2>Start a travel watchlist.</h2>
          <p>Sign in once, save destinations, and come back when plans change.</p>
          <Link className="button-primary" to="/login">
            Sign in or create account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AuthNotice;
