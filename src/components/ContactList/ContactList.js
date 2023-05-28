import { useDispatch, useSelector } from 'react-redux';
import { getContactValue, deleteContact } from '../../redux/contactsSlice.js';
import { getFilterValue } from '../../redux/filterSlice.js';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactValue);
  const filter = useSelector(getFilterValue);

  const filterToLowerCase = filter.toLowerCase();
  const contactsItems = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterToLowerCase)
  );
  return (
    <ul className={css.ContactList}>
      {contactsItems.length > 0 ? (
        <>
          {contactsItems.map(({ id, name, number }) => (
            <li key={id} className={css.ContactListItem}>
              <span className={css.ContactListSpan}>
                {name}: {number}
              </span>
              <button
                className={css.Btn}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </button>
            </li>
          ))}
        </>
      ) : (
        <p>No added contacts</p>
      )}
    </ul>
  );
};

export default ContactList;
