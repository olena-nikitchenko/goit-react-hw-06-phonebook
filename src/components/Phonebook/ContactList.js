import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getContactValue, deleteContact } from '../../redux/contactsSlice.js';
import { getFilterValue } from '../../redux/filterSlice.js';
import css from './Phonebook.module.css';

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
      {contactsItems ? (
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
      ) : null}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;
