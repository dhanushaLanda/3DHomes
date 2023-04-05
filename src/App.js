import './App.css';
import * as THREE from "three";
import {MovingCubes} from "./componenents /MovingCubes";
import {MovingCircleSpear} from "./componenents /MovingCircleSpears";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useRef, useState} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import Model from "./Room-inside";
import Chair from "./componenents /Chair";
import SmallHouse from "./componenents /SmallHouse";
import FurnishedHouse from "./componenents /FurniturecHouse";


function App() {
    return (
        <div className="App">
          <SmallHouse />
        </div>
    );
}

export default App;
