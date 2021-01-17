import { Component } from 'react';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';
import './App.css';
import ContactList from './Components/ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    ...INITIAL_STATE,
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  handleChangeNum = e => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { contacts, name } = this.state;

    if (name.length === 0) {
      alert('Some filed is empty');
      return false;
    }

    const isExistContact = contacts.find(contact => contact.name === name);
    if (isExistContact) {
      alert(`${name} is already in contacts.`);
      this.resetForm();
      return;
    }

    return this.handleAddNewContact();
  };

  handleAddNewContact = newContact => {
    const { name, number } = this.state;

    newContact = {
      name: name,
      number: number,
      id: uuidv4(),
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
      name: '',
      number: '',
    }));
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleRemoveContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };
  getVisibleFilterContacts = () => {
    const { contacts, filter } = this.state;
    const filterNameLowerCase = filter.toLowerCase();

    const filterContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNameLowerCase),
    );

    return filterContact;
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if(contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(
        contacts
      ))
    }
  }

  render() {
    const { name, number, filter } = this.state;
    const visibleFilterContacts = this.getVisibleFilterContacts();

    return (
      <div>
        <ContactForm
          name={name}
          number={number}
          onSubmit={this.handleSubmit}
          onChangeName={this.handleChangeName}
          onChangeNum={this.handleChangeNum}
        />
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleFilterContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}

export default App;
