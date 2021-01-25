import Tilt from 'react-tilt';
import logo from './moderator.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt4'>
      <Tilt
        className='Tilt br2 shadow-2'
        options={{ max: 25 }}
        style={{ height: 100, width: 100 }}
      >
        <div className='Tilt-inner pa3'>
          <img
            style={{ paddingTop: '5px' }}
            src={logo}
            className=''
            alt='moderation logo'
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
