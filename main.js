import './style.css'

import * as THREE from 'three'
// IMPORT THE THREE. JS LIBRARY
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// CREATING THE FIRST COMPONENT -----THE SCENE
const scene = new THREE.Scene()

// CREATING THE SECOND COMPONENT ---------THE CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
//THE FIRST ARGUMENT IS FEILD OF VIEW ; THE AMOUNT VISABLE BASED ON 360 WORLD VIEW
// THE SECOND ARGUEMENT IS THE ASPECT RATIO ; BASED OFF THE USERS BROWSER WINDOW
// THE THIRD AND FORTH ARGUEMENTS ARE RELATING TO THE VIEW FUSTRUM ; TO CONTROL WHICH OBJECTS ARE VISABLE RELATIVE TO THE CAMERA ITSELF

// CREATING THE FINAL COMPONENT----------- THE ACTION!
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
// THE RENEDERER NEEDS TO KNOW WHICH DOM ELEMENT TO USE

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3)

renderer.render(scene, camera)
// HERE WE CALL THE RENDER METHOD PASSING SCENE AND CAMERA AS ARGUEMENTS.

// TORUS

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x2c0147 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// LIGHTS ARE WHAT REALLY BRINGS THE SCENE TO LIFE
//POINT LIGHT IS LIKE A LIGHT BULB

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
// EVERYONE LOVES A HEXIDECIMAL LITERAL

// AMBIENT LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Avatar

const jeffTexture = new THREE.TextureLoader().load('drac.png')

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
)

scene.add(jeff)

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)

scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)

jeff.position.z = -5
jeff.position.x = 2

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  jeff.rotation.y += 0.01
  jeff.rotation.z += 0.01

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.rotation.y = t * -0.0002
}

document.body.onscroll = moveCamera
moveCamera()

// ANIMATION LOOP -------------------------------

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  moon.rotation.x += 0.005

  // controls.update();

  renderer.render(scene, camera)
}

animate()
