import './App.css';
import ContactContext from './ContactContext';
import NavBar from './Components/NavBar';
import Contact from './Components/Contact';


function App() {
  return (
    <div className="App">
      <ContactContext>
        <NavBar/>
        <Contact/>
      </ContactContext>
    </div>
  );
}

export default App;
