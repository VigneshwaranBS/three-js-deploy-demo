console.log("check")
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import zipson from 'zipson';
import { fetch } from 'whatwg-fetch';
import * as idb1 from 'idb';
// SETUP
const RENDERER = new THREE.WebGLRenderer({canvas:document.querySelector('#here-lies-the-model')});
const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000);

const PANE = new Pane();
const CLOCK = new THREE.Clock();
const ORBIT = new OrbitControls( CAMERA, RENDERER.domElement);

RENDERER.setSize( window.innerWidth, window.innerHeight);
RENDERER.setPixelRatio( window.devicePixelRatio);
CAMERA.position.set( 2, 2, 5);
// ORBIT.update();

// HELPERS
let SKELETON;
const AXES = new THREE.AxesHelper(5);
const GRID = new THREE.GridHelper(5);
// SCENE.add(AXES);
// SCENE.add(GRID);
let helpers = { axes: false, grid: false, wireframe: false, skeleton: false};

// LIGHTING
const AMBIENTLIGHT = new THREE.AmbientLight(0xFFFFFF, 1.0);
const DIRECTIONALLIGHT = new THREE.DirectionalLight(0xFFFFFF, 1.5);

DIRECTIONALLIGHT.position.set( 0, 5, 10);
SCENE.add(DIRECTIONALLIGHT);
SCENE.add(AMBIENTLIGHT);
let lights = { 'ambient light intensity': 1.0, 'ambient light color': 0xFFFFFF, 'directional light intensity': 1.5, 'directional light color': 0xFFFFFF}

// GLOBALS
let animations = {};
let actions = {};
let speed = {'playback speed': 1.0};


// INTERFACE
// const display_folder = PANE.addFolder({ title:'Display', expanded:false});
// const light_folder = PANE.addFolder({ title:'Lighting', expanded:false});
const animation_folder = PANE.addFolder({ title:'Animations', expanded:true});

// LOADING MODEL
const LOADER = new GLTFLoader();
let model;
let mixer; 







// document.getElementById('gltf-file').addEventListener('change', e =>
// {
// 	if(model)
// 	{
// 		SCENE.remove(model);
// 		display_folder.children[2].dispose();
// 		display_folder.children[2].dispose();
// 		for (let i = 0; i < Object.keys(animations).length; i++)
// 			animation_folder.children[animation_folder.children.length-1].dispose();
// 	}
// 	animations = {};
// 	PANE.refresh();
// 	LOADER.load( '/assets/emotions.gltf', gltf => load_model(gltf));
// 	document.querySelector('.overlay').style.display = 'none';
// });

LOADER.load( 'facial_expressions.gltf', gltf => load_model(gltf));

function load_model(gltf)
{
	model = gltf.scene;
	 model.scale.set( 0.4, 0.4, 0.4);
	SCENE.add(model);
	model.position.set(-1,-5,0);

	mixer = new THREE.AnimationMixer(model);
	
	console.log(gltf.animations)
	

	//modifying facial expressions


	const angereyes = gltf.animations[1].tracks
	angereyes.splice(0,1119);
	angereyes.splice(699,10);
	const facesad =gltf.animations[11].tracks;
	facesad.splice(0,1119);
	// facesad.splice(699,10);
	const facehappy = gltf.animations[8].tracks;
	facehappy.splice(0,1119);
	facehappy.splice(699,10);
	
	// facesad.splice(699,10);

	//modifying words


	const what = gltf.animations[22].tracks
	what.splice(1119,3);
	what.splice(1125,12);
	what.splice(1131,664);
	what.splice(1172,21);
	const hell = gltf.animations[16].tracks
	hell.splice(1119,3);
	hell.splice(1125,12);
	hell.splice(1131,664);
	hell.splice(1172,21);

	const man = gltf.animations[18].tracks
	man.splice(1119,3);
	man.splice(1125,12);
	man.splice(1131,664);
	man.splice(1172,21);

	const she = gltf.animations[20].tracks
	she.splice(1119,3);
	she.splice(1125,12);
	she.splice(1131,664);
	she.splice(1172,21);

	const live = gltf.animations[17].tracks
	live.splice(1119,3);
	live.splice(1125,12);
	live.splice(1131,664);
	live.splice(1172,21);


	const sad = gltf.animations[19].tracks
	sad.splice(1119,3);
	sad.splice(1125,12);
	sad.splice(1131,664);
	sad.splice(1172,21);

	const he = gltf.animations[15].tracks
	he.splice(1119,3);
	he.splice(1125,12);
	he.splice(1131,664);
	he.splice(1172,21);

	const always = gltf.animations[0].tracks
	always.splice(1119,3);
	always.splice(1125,12);
	always.splice(1131,664);
	always.splice(1172,21);

	const go = gltf.animations[13].tracks
	go.splice(1119,3);
	go.splice(1125,12);
	go.splice(1131,664);
	go.splice(1172,21);
	
	const trip = gltf.animations[21].tracks
	trip.splice(1119,3);
	trip.splice(1125,12);
	trip.splice(1131,664);
	trip.splice(1172,21);

	RENDERER.render( SCENE, CAMERA);
	// const clip =gltf.animations[0];
	// var clip1 = THREE.AnimationUtils.subclip( clip, 'angry', 1, 80 );
	// var Action1 = mixer.clipAction( clip );
	// actions[clip1.name] = mixer.clipAction(clip1)
	// actions[clip1.name].play()

	// LOADER.load('./assets/emotions.gltf'),function ( gltf2 ) {
	// 	scene.add( gltf2.scene );
	// }
	// const clips = gltf2.animations;

	// const clips = gltf.animations;

	// const whatclip = THREE.AnimationClip.findByName(clips, 'what-34')
	// const whataction = mixer.clipAction(whatclip);
	// // whataction.play();
	
	// ADDING ANIMATIONS
	localStorage.clear();
	gltf.animations.forEach( action => { actions[action.name] = mixer.clipAction(action); animations[action.name] = false; } );
	const jsondp =gltf.animations[0].toJSON ();
	const data=JSON.stringify(jsondp);
	
	
	// const zipson = require('zipson');

	
	// const compressedData = zipson.stringify(data);

	// console.log('Compressed data:', compressedData);
	// let filename = 'data.json';
	// let blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
	// let url = URL.createObjectURL(blob);
	
	// let a = document.createElement('a');
	// a.href = url;
	// a.download = filename;
	// document.body.appendChild(a);
	// a.click();
	// document.body.removeChild(a);
	// URL.revokeObjectURL(url);
	// const json = JSON.stringify(c);
	// localStorage.setItem('animation', json);
	// const json2 = localStorage.getItem('animation');



	//load anim from json
	// const data = JSON.parse(json2);
	// const loader2 = new GLTFLoader();
	// loader2.parse(data, '', function (gltf2) {
  	// // Play the animation
  	// // const mixer = new THREE.AnimationMixer(gltf2.scene);
  	// const clip = gltf2.animations[0];
  	// // const action = mixer.clipAction(clip);
  	
	// });


	// const exporter = new GLTFExporter();
	// exporter.parse(gltf, function (gltfls) {
  	// 	const json = JSON.stringify(gltfls);
  	// 	// Store the JSON data in local storage
  	// 	localStorage.setItem('animation', json);
	// },options.animations);


	// const json = localStorage.getItem('animation');
	// const data = JSON.parse(json);

	// const loader2 = new GLTFLoader();
	// loader2.parse(data, '', function (gltf2) {
  	// // Play the animation
  	// // const mixer = new THREE.AnimationMixer(gltf2.scene);
  	// const clip = gltf2.animations[0];
  	// // const action = mixer.clipAction(clip);
  	
	// });





	
	for( const name in animations)
// 		// animation_folder.addInput( animations, name).on( 'change', e => {
// 		// // for( const action in actions)
// 		// // {
// 		// // 	animations[action] = false;
// 		// // }
// 		// // PANE.refresh();
// 		// if(e.value)
// 		// {
// 		// 	for( const action in actions)
// 		// 	{
// 		// 		if (animations[action]!= animations[name]){
// 		// 			animations[action] = false;

// 		// 		}
				
// 		// 		animations[action] = false;
// 		// 	}
// 		// 	animations[name] = true;
			
// 		// 	PANE.refresh();
			
			
// 		// }
		
// 		// PANE.refresh();
// 		// });
		animation_folder.addInput( animations, name);
		// .on( 'change', e => e.value?actions[name].play():actions[name].stop())

// 	// // WIREFRAME
// 	// display_folder.addInput( helpers, 'wireframe').on( 'change', e =>
// 	// 	model.traverse( child => {if(child.isMesh) child.material.wireframe = e.value;}));
// 	// // SKELETON
// 	// SKELETON = new THREE.SkeletonHelper(model);
// 	// display_folder.addInput( helpers, 'skeleton').on( 'change', e => e.value?SCENE.add(SKELETON):SCENE.remove(SKELETON))
// 	// console.log(animation_folder.children.length);

}

// DISPLAY FOLDER
// display_folder.addInput( helpers, 'grid').on( 'change', e => e.value?SCENE.add(GRID):SCENE.remove(GRID));
// display_folder.addInput( helpers, 'axes').on( 'change', e => e.value?SCENE.add(AXES):SCENE.remove(AXES));

// // LIGHTINGS FOLDER
// light_folder.addInput( lights, 'ambient light intensity', { min: 0.0, max: 2.0}).on('change', e => AMBIENTLIGHT.intensity = e.value);
// light_folder.addInput( lights, 'ambient light color', {view:'color'}).on('change', e => AMBIENTLIGHT.color = new THREE.Color(e.value));
// light_folder.addInput( lights, 'directional light intensity', { min: 0.0, max: 3.0}).on('change', e => DIRECTIONALLIGHT.intensity = e.value);
// light_folder.addInput( lights, 'directional light color', {view:'color'}).on('change', e => DIRECTIONALLIGHT.color = new THREE.Color(e.value));

// ANIMATIONS FOLDER
animation_folder.addInput( speed, 'playback speed', { min: 0.1, max: 2.0}).on('change', e =>
{
	for (const name in animations)
		actions[name].setEffectiveTimeScale(e.value);
});
// animation_folder.addButton({title:'play all'}).on( 'click', e =>
// {
// 	for (const name in animations)
// 		animations[name] = true;
// 	PANE.refresh();
// });

// FPS GRPAH
PANE.addSeparator();
PANE.registerPlugin(EssentialsPlugin);
const FPSMONITOR = PANE.addBlade({ view: 'fpsgraph', label: 'FPS', lineCount: 2});

// RESET MODEL
PANE.addSeparator();
PANE.addButton({title:'reset'}).on( 'click', e =>
{
	speed['playback speed'] = 1.0;
	for( const helper in helpers)
		helpers[helper] = false;
	for (const name in animations)
		animations[name] = false;
	lights['ambient light intensity'] = 1.0;
	lights['ambient light color'] = 0xFFFFFF;
	lights['directional light intensity'] = 1.5;
	lights['directional light color'] = 0xFFFFFF;
	PANE.refresh();
});
// let previousAction = null
// let activeAction = null
// function render()
// {
// 	requestAnimationFrame(render);
// 	FPSMONITOR.begin();
// 	if(mixer)
// 	{
// 		for( const name in animations)
// 		{
// 			if(animations[name])
// 			{
// 				actions[name].paused = false;
				

				
// 				actions[name].
// 				play();
				
// 				mixer.update(CLOCK.getDelta());
				
			
// 		}
		 
// 			else
// 			{
// 				actions[name].paused = true;
// 				actions[name].stop();
// 			}
// 			mixer.update(CLOCK.getDelta());
// 		}
// 	}
// 	RENDERER.render( SCENE, CAMERA);
// 	ORBIT.update();
// 	FPSMONITOR.end();
// }
// render();
// function render() {
//     requestAnimationFrame(render);
//     FPSMONITOR.begin();

//     if (mixer) {
//         for (const name in animations) {
//             if (animations[name]) {
//                 if (!actions[name].isRunning()) {
//                     // Crossfade to new animation
//                     actions[name].crossFadeTo(animations[name], 0.3, true);
//                 }

//                 actions[name].paused = false;
//                 actions[name].play();
//                 mixer.update(CLOCK.getDelta());
//             } else {
//                 actions[name].paused = true;
//                 actions[name].stop();
//             }
//         }
//     }

//     RENDERER.render(SCENE, CAMERA);
//     ORBIT.update();
//     FPSMONITOR.end();
// }

// render();
let whataction = actions['what-34'];
let hellaction = actions['hell-54'];
let manaction = actions['man-24'];
let previousAction = null
let activeAction = null


function render()
{
	requestAnimationFrame(render);
	FPSMONITOR.begin();
	// actions['what-34'].play();
	// actions['what-34'].loop = THREE.LoopOnce;

	
	if(mixer)
	{

		
		
		for( const name in animations)
		{
			
			if(animations[name])
			{
				//what hell man loop:


				// actions['face_exp_anger_eye'].play();
				// actions['what-34'].play();
				// actions['what-34'].loop = THREE.LoopOnce;
				// mixer.addEventListener('finished', function(e) {
				// 	if(e.action._clip.name === 'what-34'){
				// 		actions['hell-54'].reset()
				// 		actions['hell-54'].play()
				// 		actions['hell-54'].loop = THREE.LoopOnce;
				// 	}
				// 	else if(e.action._clip.name === 'hell-54'){
				// 		actions['man-24'].reset()
				// 		actions['man-24'].play()
				// 		actions['man-24'].loop = THREE.LoopOnce;
				// 	}
				// 	if(e.action._clip.name === 'man-24'){
				// 		actions['what-34'].reset();
				// 		actions['what-34'].play();
						
						
				// 	}
				// });

				//she live sad loop




				// actions['face_exp_sad'].play();
				// actions['she-34'].play();
				// actions['she-34'].loop = THREE.LoopOnce;
				// mixer.addEventListener('finished', function(e) {
				// 	if(e.action._clip.name === 'she-34'){
				// 		actions['she-34'].fadeOut(0.2);
				// 		actions['live-23'].reset()
				// 		actions['live-23'].fadeIn(0.2);

				// 		actions['live-23'].play()
				// 		actions['live-23'].loop = THREE.LoopOnce;
				// 	}
				// 	else if(e.action._clip.name === 'live-23'){
				// 		actions['live-23'].fadeOut(0.2)
				// 		actions['sad-50'].reset()
				// 		actions['sad-50']
				// 		.fadeIn(0.2)
				// 		.play();
				// 		actions['sad-50'].loop = THREE.LoopOnce;
				// 	}
				// 	if(e.action._clip.name === 'sad-50'){
				// 		actions['sad-50'].fadeOut(0.2);
				// 		actions['she-34'].reset();
				// 		actions['she-34']
				// 		.fadeIn(0.2)
				// 		.play();
						
						
				// 	}
				// });
				

				//he always go trip happy

				actions['face_exp_happy'].play();
				actions['he-33']._clip.duration=1.2;
				actions['go-35'].loop = THREE.LoopOnce;
				actions['he-33'].play();
				// actions['he-33'].start = 0;
				// actions['he-33'].end = 10;
				actions['he-33'].setLoop(THREE.LoopOnce);
				actions['he-33'].clampWhenFinished = true;
				// actions['he-33'].start = 0; // Start frame
				// actions['he-33'].end = 33;
				actions['he-33'].loop = THREE.LoopOnce;
				mixer.addEventListener('finished', function(e) {
					if(e.action._clip.name === 'he-33'){
						actions['he-33'].fadeOut(0.2);
						
						actions['always-54'].reset()
						actions['always-54']._clip.duration=2.1;
						actions['always-54'].fadeIn(0.2);
						actions['always-54'].loop = THREE.LoopOnce;
						// actions['always-54'].start = 0;
						// actions['always-54'].end = 50;
						
						actions['always-54'].play()
						
					}
					else if(e.action._clip.name === 'always-54'){

						actions['always-54'].fadeOut(0.2)

						actions['go-35'].reset()
						actions['go-35']._clip.duration=1.37;
						actions['go-35']
						.fadeIn(0.2)
						.play();
						
					}
					else if(e.action._clip.name === 'go-35'){
						actions['go-35'].fadeOut(0.5);
						actions['trip-45'].reset();
						actions['trip-45']._clip.duration=1.79;
						actions['trip-45']
						.fadeIn(0.2)
						.play();
						actions['trip-45'].loop = THREE.LoopOnce;
						
						
					}
					else if(e.action._clip.name === 'trip-45'){
						actions['trip-45'].fadeOut(0.2);
						actions['happy-35'].reset();
						actions['happy-35']._clip.duration=1.4;
						actions['happy-35']
						.fadeIn(0.2)
						.play();
						actions['happy-35'].loop = THREE.LoopOnce;
						
						
					}
					else if(e.action._clip.name === 'happy-35'){
						actions['happy-35'].fadeOut(0.2);
						actions['he-33'].reset();
						actions['he-33']
						.fadeIn(0.2)
						.play();
						
						
					}
				});


				// actions[name].paused = false;
				// actions[name].play();
			
			
		}
		 
			// else
			// {
			// 	actions[name].paused = true;
			// 	actions[name].stop();
			// }
			mixer.update(CLOCK.getDelta());
		}

	}
	RENDERER.render( SCENE, CAMERA);
	ORBIT.update();
	FPSMONITOR.end();
}
render();