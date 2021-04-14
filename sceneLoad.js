//创建场景
var scene;
function initScene() { scene = new THREE.Scene(); }
//相机的设置
var camera;
function initCamera() {
	var width = window.innerWidth; //窗口宽度
	var height = window.innerHeight; //窗口高度
	camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
	camera.position.set(200, 150, 200); //设置相机位置
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}
//光源设置
var light;
function initLight() {
	scene.add(new THREE.AmbientLight(0x444444)); //平行光
	light = new THREE.PointLight(0xffffff);
	light.position.set(400, 200, 300);
	//告诉平行光需要开启阴影投射
	light.castShadow = true;
	scene.add(light);
}
//手势控制
var controls;
function initControls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableKeys = false //禁用键盘
	controls.maxPolarAngle = Math.PI / 2 //上下翻转的范围
	controls.enablePan = false //取消右键平移
}
//渲染器
var renderer;
function initRender() {
	let center = document.getElementById("center");
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(center.offsetWidth, center.offsetHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor(0xffffff);
	document.getElementById('center').appendChild(renderer.domElement);
}
//窗口监听事件
function onResize() {
	let center = document.getElementById("center");
	renderer.setSize(center.offsetWidth, center.offsetHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

// oldP  相机原来的位置
// oldT  target原来的位置
// newP  相机新的位置
// newT  target新的位置
// callBack  动画结束时的回调函数
function animateCamera(oldP, oldT, newP, newT, callBack) {
	var tween = new TWEEN.Tween({
		x1: oldP.x, // 相机x
		y1: oldP.y, // 相机y
		z1: oldP.z, // 相机z
		x2: oldT.x, // 控制点的中心点x
		y2: oldT.y, // 控制点的中心点y
		z2: oldT.z  // 控制点的中心点z
	});
	tween.to({
		x1: newP.x,
		y1: newP.y,
		z1: newP.z,
		x2: newT.x,
		y2: newT.y,
		z2: newT.z
	}, 1000);
	tween.onUpdate(function (object) {
		console.log(this)
		camera.position.x = this.x1;
		camera.position.y = this.y1;
		camera.position.z = this.z1;
		controls.target.x = this.x2;
		controls.target.y = this.y2;
		controls.target.z = this.z2;
		controls.update();
	})
	tween.onComplete(function () {
		controls.enabled = true;
		controls.dampingFactor = 0.25; 
		callBack && callBack()
	})
	tween.easing(TWEEN.Easing.Cubic.InOut);
	tween.start();
}

// function animateCamera (position, target) {
// 	console.log(target)
// 	let tween = new TWEEN.Tween({
// 		px: camera.position.x, // 起始相机位置x
// 		py: camera.position.y, // 起始相机位置y
// 		pz: camera.position.z, // 起始相机位置z
// 		tx: controls.target.x, // 控制点的中心点x 起始目标位置x
// 		ty: controls.target.y, // 控制点的中心点y 起始目标位置y
// 		tz: controls.target.z // 控制点的中心点z 起始目标位置z
// 	})
// 	tween.to({
// 		px: position.x,
// 		py: position.y,
// 		pz: position.z,
// 		tx: target.x,
// 		ty: target.y,
// 		tz: target.z
// 	}, 1000)
// 	tween.onUpdate(function () {
// 		console.log(this)
// 		camera.position.x = this.px
// 		camera.position.y = this.py
// 		camera.position.z = this.pz
// 		controls.target.x = this.tx
// 		controls.target.y = this.ty
// 		controls.target.z = this.tz
// 		controls.update()
// 	})
// 	tween.easing(TWEEN.Easing.Cubic.InOut)
// 	tween.start()
// }
