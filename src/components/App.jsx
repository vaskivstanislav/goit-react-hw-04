import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import contactData from './data/contactData.json';
import { nanoid } from 'nanoid';

function App() {
  const [userContacts, setUserContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contactUser')) ?? contactData
    );
  });
  const [searchUser, setSearchUser] = useState('');

  const filteredContacts = userContacts.filter(item =>
    item.name.toLowerCase().includes(searchUser)
  );

  useEffect(() => {
    window.localStorage.setItem('contactUser', JSON.stringify(userContacts));
  }, [userContacts]);

  const addContact = ({ values }) => {
    setUserContacts(prev => [...prev, { id: nanoid(), ...values }]);
  };

  const handleDeleteContactUser = id => {
    setUserContacts(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <h1 className='pageTitle'>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox searchUser={searchUser} setSearchUser={setSearchUser} />
      <ContactList
        userContacts={filteredContacts}
        handleDeleteContactUser={handleDeleteContactUser}
      />
    </>
  );
}

export default App;