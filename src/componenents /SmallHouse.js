import {useRef, useState} from "react";
import * as THREE from "three";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Chair from "./Chair";

const WALL_HEIGHT = 4;
const ROOF_HEIGHT = 3;

function Floor() {
    return (
        <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[20, 20]}/>
            <meshStandardMaterial color={"#95AC78"}/>
        </mesh>
    )
}

function Room() {
    const [clicked, setClicked] = useState(false);
    const markedRef = useRef();
    const vec = new THREE.Vector3();
    useFrame(state => {
        if (clicked) {
            console.log("clicked");
            state.camera.lookAt(markedRef.current.position)
            state.camera.position.lerp(vec.set(0, WALL_HEIGHT / 2, 0), 0.01)
            state.camera.updateProjectionMatrix();
        }
        return null;
    })
    return (
        <mesh ref={markedRef} position={[0, WALL_HEIGHT / 2, 0]} onClick={() => setClicked(!clicked)}>
            <boxGeometry args={[7, WALL_HEIGHT, 5]}/>
            <meshStandardMaterial color={"#ffff"}/>
        </mesh>
    )
}

function Door() {
    return (
        <mesh
            position={[0, 1.5, WALL_HEIGHT / 2 + 0.001]}>
            <planeGeometry args={[2.2, 3, 100, 100]}/>
            <meshStandardMaterial color={"#c9581c"}/>
        </mesh>
    )
}

function Roof() {
    return (
        <mesh position={[0, WALL_HEIGHT + ROOF_HEIGHT / 2, 0]}
              rotation={[0, -Math.PI * 0.25, 0]}>
            <coneGeometry args={[7, ROOF_HEIGHT, 4]}/>
            <meshStandardMaterial color={"#8c0f0a"}/>
        </mesh>
    )
}

function DoorLight() {
    return (
        <pointLight
            intensity={1}
            color="#ff74d46"
            position={[0, 3, 2.7]}
            distance={10}/>
    )
}

export default function SmallHouse() {
    return (
        <Canvas camera={{near: 0.1, far: 100, position: [2, 5, 7]}}>
            <OrbitControls/>
            <ambientLight intensity={"0.1"} color={"#e7e1e1"}/>
            <directionalLight color={"#eae1dc"} position={[-4, 5, 2]}/>
            <Floor/>
            <Room/>
            <Door/>
            <Roof/>
            <DoorLight/>
            <Chair/>

        </Canvas>);
}