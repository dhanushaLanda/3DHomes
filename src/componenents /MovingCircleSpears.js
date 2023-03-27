import * as Three from 'three';

const nx = require('./textures/cube/pisa/nx.jpg');
const px = require('./textures/cube/pisa/px.jpg');
const ny = require('./textures/cube/pisa/ny.jpg');
const py = require('./textures/cube/pisa/py.jpg');
const nz = require('./textures/cube/pisa/nz.jpg');
const pz = require('./textures/cube/pisa/pz.jpg');
let spears = [], renderer, camera, scene, spear;
let mouseY = 0;
let mouseX = 0;


document.addEventListener( 'mousemove', onDocumentMouseMove );
function createCircleSpears(){
    scene = new Three.Scene();
    camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
    const textureCube = new Three.CubeTextureLoader().load( [px,nx,py,ny,pz,nz] );
    const pointLight = new Three.PointLight( 0xffffff, 2 );
    const geometry = new Three.SphereGeometry(100, 32,16);

    textureCube.mapping = Three.CubeRefractionMapping;
    scene.background = textureCube;
    camera.position.z = 3200;
    scene.add( pointLight );
    for (let i = 0 ; i <500 ; i++) {
        spear = new Three.Mesh(geometry, new Three.MeshBasicMaterial({
            color: 0xffffff,
            envMap: textureCube,
            transparent: true,
            refractionRatio: 0.95 }));
        spear.position.x = Math.random() * 10000 - 5000;
        spear.position.y = Math.random() * 10000 - 5000;
        spear.position.z = Math.random() * 10000 - 5000;
        spear.scale.x = spear.scale.y = spear.scale.z = Math.random() * 3 + 1;
        scene.add(spear);
        spears.push(spear);
    }
    renderer = new Three.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize );
}
function rotateSpears () {
    const timer = 0.0001 * Date.now();
    camera.position.x += ( mouseX - camera.position.x ) * .05 ;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    for ( let i = 0; i < spears.length; i ++ ) {
        spears[i].position.x = 5000 * Math.cos( timer + i );
        spears[i].position.y = 5000 * Math.sin( timer + i * 1.1 );
    }
}

function animate() {
    requestAnimationFrame(animate);
    rotateSpears();
    renderer.render(scene,camera);
}
function onWindowResize() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    renderer.setSize( canvasWidth, canvasHeight );
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
}

function onDocumentMouseMove( event ) {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    mouseX = ( event.clientX - canvasWidth/2 ) * 5;
    mouseY = ( event.clientY - canvasHeight/2 ) * 5;
}

export function MovingCircleSpear(){
    return <div>
        {createCircleSpears()}
        {animate()}
    </div>
}
