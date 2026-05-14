import React from "react";

const Contact = () => {
    const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }
    return (
        <main className="page-panel contact-page">
        <h2>Contact Us</h2>
        <form onSubmit={onSubmit}>
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
