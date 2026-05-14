import React from "react";

const Contact = () => {
    const [formStatus, setFormStatus] = React.useState('Send message')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Message noted')
    e.target.reset()
  }
    return (
        <main className="content-page">
        <section className="page-hero compact-hero">
          <p className="eyebrow">Contact</p>
          <h1>Questions about a destination or saved country list?</h1>
          <p>Send a note to the Safe Flight team and we will review it.</p>
        </section>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <label htmlFor="name">
              Name
            </label>
            <input type="text" id="name" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">
              Email
            </label>
            <input type="email" id="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="message">
              Message
            </label>
            <textarea id="message" required />
          </div>
          <button className="button-primary" type="submit">
            {formStatus}
          </button>
        </form>
      </main>
    );
};

export default Contact;
