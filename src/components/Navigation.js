import Logo from './Logo/Logo';
import ProfileIcon from './Profile/ProfileIcon';

const Navigation = ({ isSignedIn, onRouteChange, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      </nav>
    );
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange('signin')}
      >
        Sign In
      </p>
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange('register')}
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
