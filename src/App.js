import { useState } from 'react';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation';
import ImageModeration from './components/ImageModeration';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import UserRank from './components/UserRank.js';
import SignInForm from './components/SignInForm';
import Registration from './components/Registration';

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

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      x: clarifaiFace.left_col * width,
      y: clarifaiFace.top_row * height,
      w: width - clarifaiFace.right_col * width,
      h: height - clarifaiFace.bottom_row * height,
    };
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Clarifai.MODERATION_MODEL defaults to the last onemptied,
  // if one day it fails try replacing Clarifai.MODERATION_MODEL
  // with this modelId
  // Clarifai.MODERATION_MODEL that I know it works:
  // modelId = 'd16f390eb32cad478c7ae150069bd2c6';
  // versionId = 'aa8be956dbaa4b7a858826a84253cab9';

  const onModerationSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.MODERATION_MODEL, input)
      .then((response) => {
        console.log(response);
        console.log(response.outputs[0].data.concepts[0].name);
        console.log(`${response.outputs[0].data.concepts[0].value * 100}%`);
      })
      .catch((error) => console.log(error));
  };

  // Clarifai.FACE_DETECT_MODEL defaults to the last onemptied,
  // if one day it fails try replacing Clarifai.MODERATION_MODEL
  // with this modelId
  // Clarifai.FACE_DETECT_MODEL that I know it works:
  // modelId = "a403429f2ddf4b49b307e318f00e528b";
  // versionId = "34ce21a40cc24b6b96ffee54aabff139";
  const onDetectFaceSubmit = () => {
    setImageUrl(input);
    app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL,
      })
      .then((faceDetectModel) => {
        return faceDetectModel.predict(input);
      })
      .then((response) => {
        console.log(response);
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((error) => console.log(error));
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className='App'>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

      {isSignedIn || route === 'home' ? (
        <>
          <Logo />
          <UserRank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onModerationSubmit={onModerationSubmit}
            onDetectFaceSubmit={onDetectFaceSubmit}
          />
          <ImageModeration box={box} imageUrl={imageUrl} />
        </>
      ) : route === 'signin' || route === 'signout' ? (
        <SignInForm onRouteChange={onRouteChange} />
      ) : (
        <Registration onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
