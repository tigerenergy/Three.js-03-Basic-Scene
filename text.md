한국어 번역

시작하려면 4가지 요소가 필요합니다.

개체를 포함할 장면
일부 개체
카메라
렌더러
장면
장면은 컨테이너와 같습니다. 개체, 모델, 입자, 조명 등을 그 안에 배치하고 어느 시점에서 Three.js에 해당 장면을 렌더링하도록 요청합니다.

장면을 만들려면 Scene 클래스를 사용하십시오 .

// Scene
const scene = new THREE.Scene()
자바스크립트
사물
개체는 여러 가지가 될 수 있습니다. 기본 형상, 가져온 모델, 입자, 조명 등을 가질 수 있습니다.

우리는 간단한 빨간색 큐브로 시작할 것입니다.

빨간 큐브를 생성하려면 Mesh 라는 객체 유형을 생성해야 합니다 . 메쉬 기하학 (형상)과 재료 (보이는 방식)의 조합이다.

많은 지오메트리와 많은 머티리얼이 있지만 지금은 간단하게 유지하고 BoxGeometry 및 MeshBasicMaterial 을 만들 것 입니다.

지오메트리를 생성 하기 위해 상자의 크기에 해당하는 처음 3개의 매개변수와 함께 BoxGeometry 클래스를 사용합니다 .

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
자바스크립트
머티리얼을 생성하기 위해 하나의 매개변수와 함께 MeshBasicMaterial 클래스를 사용합니다 : {}모든 옵션을 포함 하는 객체 . color속성 을 지정하기만 하면 됩니다.

Three.js에서 색상을 지정하는 방법에는 여러 가지가 있습니다. JS 16진수로 0xff0000보낼 수도 있고, 문자열 16진수로 보낼 수도 있고, '#ff0000'와 같은 색상 이름을 사용할 'red'수도 있고, Color 클래스 의 인스턴스를 보낼 수도 있습니다 . 나중에 자세히 설명하겠습니다.

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
자바스크립트
최종 메쉬를 만들려면, 우리는 사용 메쉬 클래스와 전송 geometry과를 material매개 변수로.

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
자바스크립트
이제 다음 add(...)방법 을 사용하여 장면에 메시를 추가할 수 있습니다 .

scene.add(mesh)
자바스크립트
장면에 개체를 추가하지 않으면 개체를 볼 수 없습니다.

카메라
카메라가 보이지 않습니다. 이론적인 관점에 가깝습니다. 장면을 렌더링할 때 해당 카메라의 관점에서 수행됩니다.

영화 세트장처럼 여러 대의 카메라를 가질 수 있으며 원하는 대로 카메라를 전환할 수 있습니다. 일반적으로 우리는 하나의 카메라만 사용합니다.

카메라에는 여러 유형이 있으며 이에 대해서는 다음 강의에서 다룰 것입니다. 지금은 원근감을 처리하는 카메라만 있으면 됩니다(가까운 물체가 멀리 있는 물체보다 눈에 띄게 보이게 함).

카메라를 생성하기 위해 PerspectiveCamera 클래스를 사용합니다 .

제공해야 하는 두 가지 필수 매개변수가 있습니다.

시야

시야각은 시야각이 얼마나 큰지를 나타냅니다. 매우 큰 각도를 사용하면 결과가 작은 직사각형에 그려지기 때문에 모든 방향을 한 번에 볼 수 있지만 왜곡이 많이 발생합니다. 작은 각도를 사용하면 사물이 확대되어 보입니다. 시야(또는 fov)는 도 단위로 표시되며 수직 시야각에 해당합니다. 이 연습에서는 75각도를 사용합니다 .

다음은 시야 변화가 어떻게 보이는지 설명하는 비디오입니다.

종횡비

대부분의 경우 종횡비는 캔버스의 너비를 높이로 나눈 값입니다. 지금은 너비나 높이를 지정하지 않았지만 나중에 지정해야 합니다. 그 동안 우리는 재사용할 수 있는 임시 값을 가진 객체를 생성할 것입니다.

장면에 카메라를 추가하는 것을 잊지 마십시오. 장면에 카메라를 추가하지 않고도 모든 것이 작동해야 하지만 나중에 버그가 발생할 수 있습니다.

// Sizes
const sizes = {
width: 800,
height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
자바스크립트
렌더러
렌더러의 작업은 렌더링을 수행하는 것입니다. 당신은 그것이 오는 것을 보지 못했습니까?

카메라 관점에서 장면을 렌더링하도록 렌더러에 요청하면 결과가 캔버스에 그려집니다. 직접 캔버스를 만들거나 렌더러가 캔버스를 생성한 다음 페이지에 추가하도록 할 수 있습니다. 이 연습에서는 캔버스를 html에 추가하고 렌더러로 보냅니다.

스크립트를 로드하고 클래스를 지정 하기 전에<canvas> 요소 를 생성합니다 .

<canvas class="webgl"></canvas>
HTML
렌더러를 생성하기 위해 하나의 매개변수가 있는 WebGLRenderer 클래스를 사용합니다 : {}모든 옵션을 포함 하는 객체 . 페이지에 추가 한 canvas속성에 해당 하는 속성 을 지정해야 합니다 <canvas>.

크리에이트 canvas우리가 사용하는 HTML에서 만든 요소를 코드의 시작 부분에 변수를 다음에서 가져 오기 및 저장 document.querySelector(...)

다음 단원에서 다른 용도로 캔버스를 사용할 것이기 때문에 변수에 캔버스를 할당하는 것이 좋습니다.

또한 이전에 생성한 객체를 setSize(...)사용하는 메서드로 렌더러의 크기를 업데이트해야 합니다 sizes. setSize(...)방법은 자동으로 우리의 크기를 조정합니다 <canvas>따라

// Canvas
const canvas = document.querySelector('canvas.webgl')

// ...

// Renderer
const renderer = new THREE.WebGLRenderer({
canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
자바스크립트
페이지를 새로고침하면 너비가 800px, 크기가 600px인 검은색 캔버스가 표시되어야 합니다.

카메라를 뒤로 이동하려면 해당 속성에 양수 값을 제공해야 합니다. camera변수를 만든 후에는 어디에서나 수행 할 수 있지만 렌더링을 수행하기 전에 수행해야 합니다.

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
