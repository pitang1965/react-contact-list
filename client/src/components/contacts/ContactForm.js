import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? '連絡先の更新' : '連絡先の作成'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='名前'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        placeholder='メール'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='電話'
        value={phone}
        onChange={onChange}
      />
      <h5>連絡先の種類</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      自宅{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      仕事{' '}
      <div>
        <input
          type='submit'
          value={current ? '連絡先の更新' : '連絡先の作成'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            クリア
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
