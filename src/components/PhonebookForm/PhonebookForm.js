import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSlice';
import { getContactValue } from '../../redux/contactsSlice.js';
import css from './Phonebook.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const PhonebookForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactValue);
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = formData;
    const isExistingContact = contacts.some(
      contact => contact.name === name && contact.number === number
    );
    if (isExistingContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));

    reset();
  };

  const reset = () => {
    setFormData({ ...INITIAL_STATE });
  };

  const { name, number } = formData;

  return (
    <form onSubmit={handleSubmit} className={css.Form}>
      <label className={css.Label}>
        Name
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          pattern="[A-Za-z\s]+"
          required
          value={name}
          onChange={handleChange}
          className={css.Input}
        />
      </label>
      <label className={css.Label}>
        Number
        <input
          type="tel"
          placeholder="Enter number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          className={css.Input}
        />
      </label>
      <button type="submit" className={css.Btn}>
        Add contact
      </button>
    </form>
  );
};

export default PhonebookForm;
