import { useState } from 'react';

import Navigation from './components/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import UserRank from './components/UserRank.js';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <UserRank />
      <ImageLinkForm onInputChange={onInputChange} />
      {/* 
      <ImageModeration /> */}
    </div>
  );
}

export default App;
