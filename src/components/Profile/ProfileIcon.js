import { useState } from 'react';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function ProfileIcon(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className='pa4 tc'>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        drop='left'
        style={{
          cursor: 'pointer',
        }}
      >
        <DropdownToggle
          tag='span'
          onClick={toggle}
          data-toggle='dropdown'
          aria-expanded={dropdownOpen}
        >
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='br-100 h3 w3 dib'
            alt='avatar'
          />
        </DropdownToggle>
        {/* Old <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} right> */}
        <DropdownMenu
          className='b--transparent shadow-5'
          style={{
            marginLeft: '-6rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <DropdownItem onClick={() => props.toggleModal()}>
            View Profile
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              props.onRouteChange('signout');
              window.localStorage.removeItem('token');
            }}
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default ProfileIcon;
