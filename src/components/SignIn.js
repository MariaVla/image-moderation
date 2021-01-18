import { useState } from 'react';

const SignIn = ({ loadUser, onRouteChange }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (event) => setSignInEmail(event.target.value);

  const onPasswordChange = (event) => setSignInPassword(event.target.value);

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
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
            <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                className='f3 mw6 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
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
                className='f3 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
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
              onClick={onSubmitSignIn}
            >
              Submit
            </button>
          </div>
          <div className='lh-copy mt3'>
            <p
              className='f5 link dim black db pointer'
              onClick={() => onRouteChange('register')}
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
