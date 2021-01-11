import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* 
      <ImageModeration /> */}
    </div>
  );
}

export default App;
