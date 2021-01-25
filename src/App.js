import { useState } from 'react';
import Navigation from './components/Navigation';
import ImageModeration from './components/ImageModeration';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank.js';
import SignIn from './components/SignIn';
import Register from './components/Register';

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [moderationResult, setModerationResult] = useState('');
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

  const onModerationSubmit = () => {
    setImageUrl(input);
    fetch('https://moderation-app-backend.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setModerationResult(response.outputs[0].data.concepts[0]);

          fetch('https://moderation-app-backend.herokuapp.com/image', {
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
      });
  };

  const onDetectFaceSubmit = () => {
    setImageUrl(input);
    fetch('https://moderation-app-backend.herokuapp.com/imageurlfacedetect', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://moderation-app-backend.herokuapp.com/image', {
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
      });
  };

  function resetState() {
    setInput('');
    setImageUrl('');
    setBox({});
    setModerationResult('');
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
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onModerationSubmit={onModerationSubmit}
            onDetectFaceSubmit={onDetectFaceSubmit}
          />
          <ImageModeration
            box={box}
            imageUrl={imageUrl}
            moderationResult={moderationResult}
          />
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
