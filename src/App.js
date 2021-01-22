import { useState } from 'react';
import Navigation from './components/Navigation';
import ImageModeration from './components/ImageModeration';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank.js';
import SignIn from './components/SignIn';
import Register from './components/Register';

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const calculateFaceLocation = (data) => {
    if (data.outputs[0].data.regions === undefined) return;

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
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.outputs[0].data.concepts[0].name);
        console.log(`${response.outputs[0].data.concepts[0].value * 100}%`);
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            })
            .catch((error) => console.log(error));
        }
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
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((error) => console.log(error));
  };

  function resetState() {
    setInput('');
    setImageUrl('');
    setBox({});
    setIsSignedIn(false);
    setRoute('signin');
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    });
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      resetState();
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
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onModerationSubmit={onModerationSubmit}
            onDetectFaceSubmit={onDetectFaceSubmit}
          />
          <ImageModeration box={box} imageUrl={imageUrl} />
        </>
      ) : route === 'signin' || route === 'signout' ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
