// Canvas
const canvas = document.querySelector('.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const Geometry = new THREE.BoxGeometry(1, 1, 1)
const Material = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})
const Mesh = new THREE.Mesh(Geometry, Material)
scene.add(Mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)