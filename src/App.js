import './App.css';
// import {animate} from "./threeJsRenderer";
import {MovingCubes} from "./componenents /MovingCubes";
import {MovingCircleSpear} from "./componenents /MovingCircleSpears";

function App() {
  return (
    <div>
      <header>
        <div>
            {/*<MovingCubes />*/}
            <MovingCircleSpear />
        </div>
      </header>
    </div>
  );
}

export default App;
