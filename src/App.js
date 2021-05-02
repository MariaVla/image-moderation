import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ImageModeration from './components/ImageModeration';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank.js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [moderationResult, setModerationResult] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: '',
  });

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`http://localhost:3001/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            })
              .then((response) => response.json())
              .then((user) => {
                if (user && user.email) {
                  loadUser(user);
                  onRouteChange('home');
                }
              });
          }
        })
        .catch(console.log);
    }
  }, []);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age,
    });
  };

  const displayFaceBoxes = (boxes) => {
    if (boxes) {
      setBoxes(boxes);
    }
  };

  const calculateFaceLocations = (data) => {
    if (
      (data && data.outputs === undefined) ||
      data.outputs[0].data.regions === undefined
    ) {
      return;
    }
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('image');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        x: clarifaiFace.left_col * width,
        y: clarifaiFace.top_row * height,
        w: width - clarifaiFace.right_col * width,
        h: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onModerationSubmit = () => {
    const token = window.localStorage.getItem('token');
    if (input === '') {
      return;
    }
    setImageUrl(input);
    fetch('https://moderation-app-backend.herokuapp.com/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
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
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
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

  const onDetectFaceSubmit = () => {
    const token = window.localStorage.getItem('token');
    if (input === '') {
      return;
    }
    setImageUrl(input);
    fetch('https://moderation-app-backend.herokuapp.com/imageurlfacedetect', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://moderation-app-backend.herokuapp.com/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
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
        displayFaceBoxes(calculateFaceLocations(response));
      })
      .catch((error) => console.log(error));
  };

  function resetState() {
    setInput('');
    setImageUrl('');
    setBoxes([]);
    setModerationResult('');
    setIsSignedIn(false);
    setRoute('signin');
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
      pet: '',
      age: '',
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

  const toggleModal = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className='App'>
      <Navigation
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
        toggleModal={toggleModal}
      />

      {isProfileOpen && (
        <Modal>
          <Profile
            isProfileOpen={isProfileOpen}
            toggleModal={toggleModal}
            user={user}
            loadUser={loadUser}
          />
        </Modal>
      )}
      {isSignedIn || route === 'home' ? (
        <>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onModerationSubmit={onModerationSubmit}
            onDetectFaceSubmit={onDetectFaceSubmit}
          />
          <ImageModeration
            boxes={boxes}
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
