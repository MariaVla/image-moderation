import { useState } from 'react';
import './Profile.css';

function Profile(props) {
  const [name, setName] = useState(props.user.name);
  const [age, setAge] = useState(props.user.age);
  const [pet, setPet] = useState(props.user.pet);

  const onProfileUpdate = (data) => {
    fetch(
      `https://moderation-app-backend.herokuapp.com/profile/${props.user.id}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: window.localStorage.getItem('token'),
        },
        body: JSON.stringify({
          formInput: data,
        }),
      }
    )
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          props.toggleModal();
          props.loadUser({ ...props.user, ...data });
        }
      })
      .catch(console.log);
  };

  const onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        setName(event.target.value);
        break;
      case 'user-age':
        setAge(event.target.value);
        break;
      case 'user-pet':
        setPet(event.target.value);
        break;
      default:
        return;
    }
  };

  const { toggleModal, user } = props;
  return (
    <div className='profile-modal'>
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80 w-80'>
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='h3 w3 dib'
            alt='avatar'
          />
          <h1>{name}</h1>
          <h4>{`Images submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className='mt2 fw6' htmlFor='user-name'>
            Name:
          </label>
          <input
            onChange={onFormChange}
            type='text'
            name='user-name'
            className='pa2 ba w-100'
            placeholder={name}
          ></input>
          <label className='mt2 fw6' htmlFor='user-age'>
            Age:
          </label>
          <input
            onChange={onFormChange}
            type='text'
            name='user-age'
            className='pa2 ba w-100'
            placeholder={age}
          ></input>
          <label className='mt2 fw6' htmlFor='user-pet'>
            Favourite Pet:
          </label>
          <input
            onChange={onFormChange}
            type='text'
            name='user-pet'
            className='pa2 ba w-100'
            placeholder={pet}
          ></input>
          <div
            className='mt4'
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button
              className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
              onClick={() => onProfileUpdate({ name, age, pet })}
            >
              Save
            </button>
            <button
              className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className='modal-close' onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
}

export default Profile;
