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
    setImageUrl(input);
    app.models
      .predict(Clarifai.MODERATION_MODEL, input)
      .then((response) => {
        console.log(response);
        console.log(response.outputs[0].data.concepts[0].name);
        console.log(`${response.outputs[0].data.concepts[0].value * 100}%`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // // This also works
  // const onDetectSubmit = () => {
  //   setImageUrl(input);
  //   app.models
  //     .initModel({
  //       id: Clarifai.MODERATION_MODEL,
  //     })
  //     .then((faceDetectModel) => {
  //       return faceDetectModel.predict(input);
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

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
