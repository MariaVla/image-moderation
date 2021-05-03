import { useState } from 'react';

const Register = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onNameChange = (event) => setName(event.target.value);
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmitRegister = (e) => {
    e.preventDefault();
    fetch('https://moderation-app-backend.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      });
  };

  return (
    <article className='mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5'>
      <main className='pa4 black-80'>
        <form className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Register</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>
                Name
              </label>
              <input
                className='f3 mw6 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='text'
                name='name'
                id='name'
                onChange={onNameChange}
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                className='f3 mw6 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='email'
                name='email-address'
                id='email-address'
                onChange={onEmailChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                className='f3 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='password'
                name='password'
                id='password'
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className=''>
            <button
              className='f2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              onClick={onSubmitRegister}
            >
              Register
            </button>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
