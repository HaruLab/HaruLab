// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// // シーンの設定
// const scene = new THREE.Scene();

// // カメラ設定
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
// camera.position.set(0, 0, 100);

// // レンダラーを作成
// const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(3);

// // OrbitControls設定
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = false;
// controls.enableRotate = false;

// // 環境光（Ambient Light）
// const ambientLight = new THREE.AmbientLight(0xffffff, 10); // 強さを0.1から0.05に変更
// scene.add(ambientLight);



// // 指向性ライト（Directional Light）
// const directionalLight = new THREE.DirectionalLight(0xcccccc, 1); // 強さを0.1から0.2に変更
// directionalLight.position.set(0.3, 0.2, 10).normalize();
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// // GLTFLoaderクラスのインスタンス
// const loader = new GLTFLoader();
// let currentModelIndex = 0;
// const modelUrls = [
//     "models/scene1.gltf",
//     "models/scene1.gltf",
//     "models/scene1.gltf",
//     "models/scene4.gltf"
// ];

// let loadedModel;
// let mixer; // アニメーションを制御するためのAnimationMixer
// let isLoadingModel = false;
// let adjustCameraInitialized = false;

// // モデルをロード
// function loadModel(url) {
//     if (isLoadingModel) return;

//     isLoadingModel = true;

//     loader.load(url, gltf => {
//         if (loadedModel) {
//             scene.remove(loadedModel);
//         }
//         loadedModel = gltf.scene;
//         loadedModel.position.set(0, 0, 0);

//         loadedModel.traverse(child => {
//             if (child.isMesh) {
//                 child.castShadow = true;
//                 child.receiveShadow = true;
//             }
//         });

//         scene.add(loadedModel);
//         isLoadingModel = false;

//         // アニメーションがある場合は再生する
//         if (gltf.animations.length > 0) {
//             mixer = new THREE.AnimationMixer(loadedModel);
//             const action = mixer.clipAction(gltf.animations[0]);
//             action.setLoop(THREE.LoopOnce);  // 一度だけ再生
//             action.clampWhenFinished = true; // 終了後に最後のフレームで停止
//             action.play();  // アニメーションを再生
//         }

//         if (!adjustCameraInitialized) {
//             adjustCameraBasedOnScroll(0);
//             adjustCameraInitialized = true;
//         }

//         adjustModelScale(); // モデルのスケールを調整
//     }, undefined, error => {
//         console.error('An error happened:', error);
//         isLoadingModel = false;
//     });
// }

// // 最初のモデルをロード
// loadModel(modelUrls[currentModelIndex]);

// // カメラの目標位置と回転を定義
// const cameraTarget = {
//     position: new THREE.Vector3(),
//     rotation: new THREE.Vector3()
// };

// // スクロール進捗に応じてカメラを調整する関数
// function adjustCameraBasedOnScroll(scrollPercent) {
//     let newIndex;
//     if (scrollPercent < 25) {
//         cameraTarget.position.set(0, 0, 10);
//         cameraTarget.rotation.set(0, 0, 0);
//         newIndex = 0;
//     } else if (scrollPercent < 50) {
//         cameraTarget.position.set(-10, 5, 10);
//         cameraTarget.rotation.set(0, Math.PI / 4, 0);
//         newIndex = 1;
//     } else if (scrollPercent < 75) {
//         cameraTarget.position.set(-5, 0, 5);
//         cameraTarget.rotation.set(0, Math.PI / 2, 2);
//         newIndex = 2;
//     } else {
//         cameraTarget.position.set(-4, 1, 5);
//         cameraTarget.rotation.set(Math.PI / 180, Math.PI / 2, Math.PI / 3);
//         newIndex = 3;
//     }

//     if (newIndex !== currentModelIndex) {
//         currentModelIndex = newIndex;
//         loadModel(modelUrls[currentModelIndex]);
//     }

//     if (newIndex === 3) {
//         cameraRotationSpeed = 0.05;
//     } else {
//         cameraRotationSpeed = 0;
//     }
// }

// // カメラの位置と回転を滑らかに補間する関数
// function updateCamera() {
//     const lerpFactor = 0.1;

//     camera.position.lerp(cameraTarget.position, lerpFactor);

//     camera.rotation.x += (cameraTarget.rotation.x - camera.rotation.x) * lerpFactor;
//     camera.rotation.y += (cameraTarget.rotation.y - camera.rotation.y) * lerpFactor;
//     camera.rotation.z += (cameraTarget.rotation.z - camera.rotation.z) * lerpFactor;
// }

// // カメラを回転させ続ける関数
// let cameraRotationSpeed = 0;

// function animateCameraRotation() {
//     camera.rotation.y += cameraRotationSpeed;
// }

// // マウスの位置に基づいてモデルの向きを調整する関数
// function adjustModelBasedOnMouse(event) {
//     if (!loadedModel) return;

//     const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//     const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

//     loadedModel.rotation.y = mouseX * Math.PI / 60;
//     loadedModel.rotation.x = mouseY * Math.PI / 60;
// }

// // スクロールイベントリスナー
// document.body.onscroll = () => {
//     let scrollPercent = 
//         (document.documentElement.scrollTop /
//         (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
//         100;

//     console.log(`Scroll Percent: ${scrollPercent}`);
//     adjustCameraBasedOnScroll(scrollPercent);
// };

// // 背景色の設定
// const darkBackgroundColor = new THREE.Color(0x000000);
// const lightBackgroundColor = new THREE.Color(0xffffff);

// function setBackgroundBasedOnTheme() {
//     const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     scene.background = prefersDarkScheme ? darkBackgroundColor : lightBackgroundColor;
// }

// // 初期設定
// setBackgroundBasedOnTheme();
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setBackgroundBasedOnTheme);

// // ウィンドウリサイズ
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     updateScreenWidth(); // 画面幅を更新
//     adjustModelScale(); // モデルのスケールを調整
// });

// // マウスホイール回転
// window.addEventListener('wheel', (event) => {
//     if (loadedModel) {
//         // loadedModel.rotation.y += event.deltaY * -0.002;
//     }
// });

// // マウスの動きに応じてモデルを調整
// window.addEventListener('mousemove', adjustModelBasedOnMouse);

// // アニメーションループ
// function animate() {
//     requestAnimationFrame(animate);

//     updateCamera();
//     animateCameraRotation();
    
//     // アニメーションの更新
//     if (mixer) mixer.update(0.01);

//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();

// // モデルのスケールを調整する関数
// function adjustModelScale() {
//     if (!loadedModel) return;

//     let baseWidth;

//     // ウィンドウ幅に応じて基準値を設定
//     if (window.innerWidth < 600) {
//         baseWidth = 800; // スマホサイズ
//     } else if (window.innerWidth < 900) {
//         baseWidth = 1000; // タブレットサイズ
//     } else {
//         baseWidth = 2000; // PCサイズ
//     }

//     // 画面の幅に基づいてスケールを計算
//     const scaleFactor = window.innerWidth / baseWidth; // 基準値を使用してスケールを調整
//     loadedModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
// }

// window.addEventListener('resize', () => {
//     // ウィンドウサイズ変更時にモデルのスケールを再調整
//     adjustModelScale();
// });

// // 画面の幅を変数にセットする関数
// function updateScreenWidth() {
//     screenWidth = window.innerWidth;
// }

// // 照明の強度を変更する関数
// function adjustLightingBasedOnTheme() {
//     const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     ambientLight.intensity = prefersDarkScheme ? 0.1 : 0.5;
//     directionalLight.intensity = prefersDarkScheme ? 0.7 : 1.0;
// }

// // 初期設定で照明の強度を調整
// adjustLightingBasedOnTheme();

// // ダークモードの変更を監視して照明を調整
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', adjustLightingBasedOnTheme);
