import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const spheres = [];
const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
const light = new THREE.DirectionalLight( 0xffffff );

function createCubes() {
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    camera.position.z = 5;
    scene.background = new THREE.Color(0x505050);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    for (let i = 0; i < 100; i++) {
        const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
        object.position.x = Math.random() * 4 - 2;
        object.position.y = Math.random() * 4;
        object.position.z = Math.random() * 4 - 2;
        object.scale.x = object.scale.y = object.scale.z = Math.random() * 3 + 1;
        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;
        scene.add(object);
        spheres.push(object);
    }
}


function rotateCube() {
    const timer = 0.0001 * Date.now();
    for ( let i = 0; i < spheres.length; i ++ ) {
        spheres[ i ].position.x = 1 + Math.cos( timer + i );
        spheres[ i ].position.y =  1 +Math.sin( timer + i * 1.1 );
        spheres[ i ].rotation.x += 0.01;
        spheres[ i ].rotation.y += 0.01;

    }
}
function animate() {
    requestAnimationFrame(animate);
    rotateCube();
    renderer.render(scene, camera);
}

export function MovingCubes() {
    return <div>
        {createCubes()}
        {animate()}
    </div>
}
