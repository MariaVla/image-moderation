import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import UserRank from './components/UserRank.js';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <UserRank />
      <ImageLinkForm />
      {/* 
      <ImageModeration /> */}
    </div>
  );
}

export default App;
