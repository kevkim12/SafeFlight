import { useState } from "react";
import { createAccount, getCurrentUser, signIn, signOut } from "./auth";

const emptyForm = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState(emptyForm);
  const [user, setUser] = useState(getCurrentUser);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateForm = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const nextUser = mode === "create"
        ? await createAccount(form)
        : await signIn(form);
      setUser(nextUser);
      setForm(emptyForm);
      setMessage(mode === "create" ? "Account created. You are signed in." : "Welcome back.");
    } catch (authError) {
      setError(authError.message);
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
    setMessage("You have been signed out.");
  };

  return (
    <main className="content-page account-page-shell">
      <section className="page-hero account-hero">
        <p className="eyebrow">Traveler account</p>
        <h1>Use Safe Flight with a regular account.</h1>
        <p>Create an email and password account to save destinations without Google sign-in.</p>
      </section>

      <section className="account-layout">
        <aside className="account-benefits">
          <p className="eyebrow">Included</p>
          <h2>Keep trip decisions organized.</h2>
          <ul>
            <li>Save countries to your destination watchlist.</li>
            <li>Return to the same planning view later.</li>
            <li>Use a regular account with no third-party sign-in dependency.</li>
          </ul>
        </aside>

        <section className="account-panel">
          {user ? (
            <div className="account-profile">
              <div className="profile-avatar" aria-hidden="true">
                {user.name?.charAt(0).toUpperCase() || "S"}
              </div>
              <div>
                <p className="eyebrow">Signed in</p>
                <h2>{user.name || "Safe Flight traveler"}</h2>
                <p>{user.email}</p>
              </div>
              <button className="button-secondary" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          ) : (
            <>
              <div className="account-tabs" role="tablist" aria-label="Account options">
                <button
                  className={mode === "signin" ? "account-tab active" : "account-tab"}
                  type="button"
                  onClick={() => setMode("signin")}
                >
                  Sign in
                </button>
                <button
                  className={mode === "create" ? "account-tab active" : "account-tab"}
                  type="button"
                  onClick={() => setMode("create")}
                >
                  Create account
                </button>
              </div>

              <form className="account-form" onSubmit={handleSubmit}>
                {mode === "create" && (
                  <div className="form-row">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      minLength="2"
                      required
                      type="text"
                      value={form.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                    />
                  </div>
                )}
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    minLength="8"
                    required
                    type="password"
                    value={form.password}
                    onChange={(event) => updateForm("password", event.target.value)}
                  />
                </div>
                <button className="button-primary" type="submit">
                  {mode === "create" ? "Create account" : "Sign in"}
                </button>
              </form>
            </>
          )}

          {error && <p className="status-message error-message">{error}</p>}
          {message && <p className="status-message success-message">{message}</p>}
        </section>
      </section>
    </main>
  );
};

export default Login;
