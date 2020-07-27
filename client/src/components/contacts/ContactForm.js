import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const ContactForm = () => {
  const alertContext = useContext(AlertContext);
  const contactContext = useContext(ContactContext);

  const { setAlert } = alertContext;
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
    if (name === '' || email === '') {
      setAlert('任意でない項目はすべて入力してください', 'danger');
      return;
    }
    if (phone !== '') {
      const phoneNumber = parsePhoneNumberFromString(phone, 'JP');
      if (!phoneNumber.isValid()) {
        setAlert('電話番号として適切な数値を入力してください。', 'danger');
        return;
      }
    }

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
        type='email'
        name='email'
        placeholder='メール'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='電話番号（任意、数値のみ）'
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
