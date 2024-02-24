import * as THREE from 'three';

const numParticles = 10000;
const sizes = [];
const positions = [];
const velocities = [];
const matricies = [];
for (let i = 0; i < numParticles; i++) {
    const size = Math.sqrt((Math.random() * 2) + 0.1);
    sizes.push(size);
    const positionX = (Math.random() * 40) - 20;
    const positionY = (Math.random() * 40) - 20;
    positions.push({ x: positionX, y: positionY });
    const velocityX = (Math.random() * 0.2) - 0.1;
    const velocityY = (Math.random() * 0.2) - 0.1;
    velocities.push({ x: velocityX, y: velocityY });
    const matrix = new THREE.Matrix4();
    matrix.makeScale(size, size, size);
    matricies.push(matrix);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const baseParticleSize = 0.2;
const geometry = new THREE.PlaneGeometry(baseParticleSize, baseParticleSize);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.FrontSide });
const mesh = new THREE.InstancedMesh(geometry, material, numParticles);
scene.add(mesh);

camera.position.z = 100;

const animate = () =>  {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
    for (let i = 0; i < numParticles; i++) {
        const position = positions[i];
        const velocity = velocities[i];
        const matrix = matricies[i];
        const size = sizes[i];

        // Apply forces
        applyGravity(velocity, size);
        applyUpwardWind(position, velocity, size);
        applyRightWind(velocity, size);
        applyLeftWind(position, velocity, size);
        applyPointForce(position, velocity, size);

        position.x += velocity.x;
        position.y += velocity.y;
        matrix.setPosition(position.x, position.y, 0);
        mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
}

const gravityForce = 0.001;
const applyGravity = (velocity, size) => {
    velocity.y -= gravityForce / size;
};

const upwardWindForce = 0.02;
const applyUpwardWind = (position, velocity, size) => {
    if (position.y < -65) {
        velocity.y += upwardWindForce / size;
    }
};

const rightWindfForce = 0.0005;
const applyRightWind = (velocity, size) => {
    velocity.x -= rightWindfForce / size;
};

const leftWindForce = 0.001;
const applyLeftWind = (position, velocity, size) => {
    if (position.x < -30) {
        velocity.x += leftWindForce / size;
    }
};

const pointForce = 0.01;
const pointForcePosition = { x: 0, y: 0 };
const applyPointForce = (position, velocity, size) => {
    const distance = Math.sqrt(
        (position.x - pointForcePosition.x)**2 +
        (position.y - pointForcePosition.y)**2
    );
    const force = pointForce / (distance * size);
    velocity.y -= force;
}

animate();

