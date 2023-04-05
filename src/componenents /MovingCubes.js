import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
const spheres = [];
scene.background= "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/winter-hdri_";
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const light = new THREE.DirectionalLight( 0xffffff );

function createCubes() {
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    camera.position.z = 60;
    scene.background = new THREE.Color(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    for (let i = 0; i < 150; i++) {
        const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
        scene.add(object);
        spheres.push(object);
    }
}


function rotateCube() {
    const timer = 0.0001 * Date.now();
    for ( let i = 0; i < spheres.length; i ++ ) {
        spheres[ i ].position.x = 40 * Math.cos( timer + i );
        spheres[ i ].position.y = 30  * Math.sin( timer + i * 1.1 );
        spheres[ i ].rotation.x += 0.2;
        spheres[ i ].rotation.y += 0.2;

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
