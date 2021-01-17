import { Component } from 'react';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  render() {
    const { name, number } = this.props;

    return (
      <div>
        <h2 className={s.title}>Phonebook</h2>
        <form className={s.contactForm} onSubmit={this.props.onSubmit}>
          <label htmlFor="new-name">Name</label>
          <input
            type="text"
            name="name"
            id="new-name"
            placeholder="Enter name"
            className={s.inputName}
            onChange={this.props.onChangeName}
            value={name}
          />
          <label htmlFor="new-phone">Number</label>
          <input
            type="tel"
            name="phone"
            id="new-phone"
            placeholder="Enter phone number"
            className={s.inputPhone}
            onChange={this.props.onChangeNum}
            value={number}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
            required
          />
          <span className={s.inputPhonePrompt}>
            Format phone number 000-00-00
          </span>
          <button className={s.btnAdd} type="submit">
            Add contact
          </button>
        </form>
        <h2 className={s.title}>Contacts</h2>
      </div>
    );
  }
}

export default ContactForm;
