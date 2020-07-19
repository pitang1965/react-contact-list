import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const type2DisplayStrig = (type) => (type === 'professional' ? '仕事' : '自宅');

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  }

  return (
    <div className='card bg-light'>
      <h3 className='tesxt-primary text-left'>
        {name}
        {'  '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type2DisplayStrig(type)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btun-sm' onClick={() => setCurrent(contact)}>編集</button>
        <button className='btn btn-danger btun-sm' onClick={onDelete}>削除</button>
      </p>
    </div>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
