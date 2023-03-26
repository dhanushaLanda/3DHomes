import * as Three from 'three';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer();
let spears = [];
let effect ;

function createCircleSpears(){
    window.addEventListener( 'mousemove', onWindowResize );
    camera.position.z = 7;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const r = 'textures/cube/pisa/';
    const urls = [
        r + 'px.jpg', r + 'nx.jpg',
        r + 'py.jpg', r + 'ny.jpg',
        r + 'pz.jpg', r + 'nz.jpg'
    ];
    const textureCube = new Three.CubeTextureLoader()
        .load( urls );
    textureCube.mapping = Three.CubeRefractionMapping;
    scene.background = textureCube;

    const ambient = new Three.AmbientLight( 0xffffff );
    scene.add( ambient );

    const pointLight = new Three.PointLight( 0xffffff, 2 );
    scene.add( pointLight );

    const geometry = new Three.SphereGeometry(0.1, 32,16);
    for (let i = 0 ; i <200 ; i++) {
        const spear = new Three.Mesh(geometry, new Three.MeshBasicMaterial({
            color:  Math.random() * 0xffffff,
            envMap: textureCube,
            transparent: true,
            opacity: 0.5,
            refractionRatio: 0.95 }));
        spear.position.x = Math.random() * 10 - 5;
        spear.position.y = Math.random() * 10 - 5;
        spear.position.z = Math.random() * 10 - 5;
        spear.scale.x = spear.scale.y = spear.scale.z = Math.random() * 3 + 1;
        scene.add(spear);
        spears.push(spear);
    }
}
function rotateSpears () {
    const timer = 0.0001 * Date.now();
    for ( let i = 0; i < spears.length; i ++ ) {
        spears[i].position.x = 5 * Math.cos( timer + i );
        spears[i].position.y = 5 * Math.sin( timer + i * 1.1 );
        spears[ i ].rotation.x += 0.01;
        spears[ i ].rotation.y += 0.01;

    }
}

function animate() {
    requestAnimationFrame(animate);
    rotateSpears();
    renderer.render(scene,camera);
    // effect.render( scene, camera );
}
function onWindowResize() {

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    renderer.setSize( canvasWidth, canvasHeight );

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();

    animate();

}
export function MovingCircleSpear(){
    return <div>
        {createCircleSpears()}
        {animate()}
    </div>
}
