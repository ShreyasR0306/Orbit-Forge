// Simple Three.js constellation viewer with 12 sample constellations
// For accurate star positions use a JSON of RA/Dec and convert to 3D sphere coords.
// Here we create mock constellations with labeled points and connecting lines.

const container = document.getElementById('container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.enablePan = true;

// star material
const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const starGeom = new THREE.SphereGeometry(0.2, 8, 8);

// sample constellations (mock; replace with real RA/Dec->xyz)
const CONSTELLATIONS = {
  "Orion": [[-8,1,0],[ -6.5,-1,0],[ -5,2,0],[-4,-0.5,0],[-2,0,0]],
  "Ursa Major": [[5,6,0],[6,5,0],[7,4,0],[8,3,0],[9,4,0],[8,6,0]],
  "Cassiopeia": [[-2,6,0],[-1,7,0],[0,6.5,0],[1,7.2,0],[2,6,0]],
  "Scorpius": [[2,-3,0],[3,-2,0],[4,-1,0],[5,-1.5,0],[6,-2.5,0]],
  "Leo": [[3,2,0],[4,3,0],[5,2,0],[6,1,0]],
  "Taurus": [[-6,3,0],[-5,4,0],[-4,3.5,0],[-3,2,0]],
  "Cygnus": [[-1,2,0],[0,3,0],[1,2,0],[2,1,0]],
  "Gemini": [[-3,0,0],[-2,1,0],[-1,0.5,0],[0,-0.5,0]],
  "Aquila": [[4,0,0],[5,1,0],[6,0.5,0]],
  "Andromeda": [[-9,2,0],[-8,3,0],[-7,2.5,0],[-6,1.5,0]],
  "Perseus": [[-4,4,0],[-3,4.5,0],[-2,4,0]],
  "Sagittarius": [[1,-4,0],[2,-3.5,0],[3,-3,0],[4,-3.5,0]]
};

let currentCon = null;

function renderConstellation(name) {
  // clear previous
  while(scene.children.length > 0){ scene.remove(scene.children[0]); }
  // add faint starfield
  for(let i=0;i<300;i++){
    const s = new THREE.Mesh(starGeom, new THREE.MeshBasicMaterial({color:0x222244}));
    s.position.set((Math.random()-0.5)*80, (Math.random()-0.5)*80, (Math.random()-0.5)*40);
    scene.add(s);
  }

  const coords = CONSTELLATIONS[name];
  if(!coords) return;
  const points = [];
  coords.forEach((c,i) => {
    const star = new THREE.Mesh(starGeom, new THREE.MeshBasicMaterial({color:0xffffff}));
    star.position.set(c[0], c[1], c[2]);
    scene.add(star);
    points.push(new THREE.Vector3(c[0], c[1], c[2]));
    // label
    const div = document.createElement('div');
    div.style.position = 'absolute'; div.style.color='#fff'; div.style.fontSize='12px';
  });

  // line
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffddaa });
  const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeom, lineMat);
  scene.add(line);

  document.getElementById('constName').textContent = `Constellation: ${name}`;
  currentCon = name;
}

// UI to pick constellation
const conNames = Object.keys(CONSTELLATIONS);
let idx = 0;
renderConstellation(conNames[idx]);

// cycle on double click or keyboard
window.addEventListener('dblclick', () => { idx = (idx + 1) % conNames.length; renderConstellation(conNames[idx]);});
window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight'){ idx = (idx + 1) % conNames.length; renderConstellation(conNames[idx]);}
  if(e.key === 'ArrowLeft'){ idx = (idx - 1 + conNames.length) % conNames.length; renderConstellation(conNames[idx]);}
  if(e.key === 'Escape'){ window.location.href = '/'; }
});

document.getElementById('backBtn').addEventListener('click', ()=> window.location.href = '/');

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
