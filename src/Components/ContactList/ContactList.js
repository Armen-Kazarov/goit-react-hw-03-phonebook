import { Component } from 'react';
import s from './ContactList.module.css';

class ContactList extends Component {
  render() {
    return (
      <ul className={s.listItems}>
        {this.props.contacts.map(contact => (
          <li key={contact.id} className={s.item}>
            &#128578; {contact.name}: {contact.number}
            <button onClick={() => this.props.onRemove(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;
