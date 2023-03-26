import logo from './logo.svg';
import './App.css';
import {animate} from "./threeJsRenderer";

function App() {
  return (
    <div>
      <header>
        <div>
            {animate()}
        </div>
      </header>
    </div>
  );
}

export default App;
