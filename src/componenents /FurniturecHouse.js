import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Model from "../Room-inside";

export default function FurnishedHouse() {
    return (<Canvas camera={{near: 0.1, far: 100, position: [15, 3, 0]}}>
        <OrbitControls/>
        <ambientLight intensity={"0.1"} color={"#e7e1e1"}/>
        <directionalLight color={"#eae1dc"} position={[-4, 5, 2]}/>

        <Model/>
    </Canvas>)
}
