import { useState } from 'react';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation';
import ImageModeration from './components/ImageModeration';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import UserRank from './components/UserRank.js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '',
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState('signin');

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onDetectSubmit = () => {
    console.log('Submit');
    setImageUrl(input);
    app.models
      .initModel({
        id: Clarifai.MODERATION_MODEL,
        // version: 'aa7f35c01e0642fda5cf400f543e7c40',
      })

      .then((generalModel) => {
        console.log(generalModel);
        return generalModel.predict('@@sampleTrain');
      })

      .then((response) => {
        console.log(response);
        var concepts = response['outputs'][0]['data']['concepts'];
      });
  };

  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <UserRank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onDetectSubmit={onDetectSubmit}
      />
      <ImageModeration box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
