var scene, camera, renderer, clock, mixer, actions;

init();

//FUnction courtesy of Don McCurdy
// function subclip( sourceClip, name, startFrame, endFrame, fps ) {
// 		fps = fps || 30;
// 		var clip = sourceClip.clone();
// 		clip.name = name;
// 		var tracks = [];
// 		for ( var i = 0; i < clip.tracks.length; ++ i ) {
// 			var track = clip.tracks[ i ];
// 			var valueSize = track.getValueSize();
// 			var times = [];
// 			var values = [];
// 			for ( var j = 0; j < track.times.length; ++ j ) {
// 				var frame = track.times[ j ] * fps;
// 				if ( frame < startFrame || frame >= endFrame ) continue;
// 				times.push( track.times[ j ] );
// 				for ( var k = 0; k < valueSize; ++ k ) {
// 					values.push( track.values[ j * valueSize + k ] );
// 				}
// 			}
// 			if ( times.length === 0 ) continue;
// 			track.times = THREE.AnimationUtils.convertArray( times, track.times.constructor );
// 			track.values = THREE.AnimationUtils.convertArray( values, track.values.constructor );
// 			tracks.push( track );
// 		}

// 		clip.tracks = tracks;
// 		// find minimum .times value across all tracks in the trimmed clip
// 		var minStartTime = Infinity;
// 		for ( var i = 0; i < clip.tracks.length; ++ i ) {
// 			if ( minStartTime > clip.tracks[ i ].times[ 0 ] ) {
// 				minStartTime = clip.tracks[ i ].times[ 0 ];
// 			}
// 		}
// 		// shift all tracks such that clip begins at t=0
// 		for ( var i = 0; i < clip.tracks.length; ++ i ) {
// 			clip.tracks[ i ].shift( - 1 * minStartTime );
// 		}
// 		clip.resetDuration();
// 		return clip;
// 	}

function init(){

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x005c89);

  camera = new THREE.PerspectiveCamera( 90, 200 / 200, 0.1, 1000  );
  //camera.position.set(0, 1.6,1);
  camera.position.y = 1;
  camera.position.z = 2.2;

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xFFFFFF, 1.5);
  light.position.set( 0, 1, 10);
  scene.add(light);

  const light2 = new THREE.DirectionalLight(0xFFFFFF, 1);
  light2.position.set( 10, 5, 10);
  //scene.add(light2);
  sceneSurface = document.getElementById('canvas');

  renderer = new THREE.WebGLRenderer({

    // canvas: sceneSurface,
    antialias:true
  });
  renderer.setSize(  550, 550 );
  sceneSurface.appendChild(renderer.domElement);

  //document.body.appendChild( sceneSurface );
//First one is left and right
  const controls = new THREE.OrbitControls( camera, sceneSurface );
  controls.target.set(0,0,0.2);
  controls.update();

  //Add button actions here
  // let index = 0;
  // const btns = document.getElementById("btns");
  // btns.childNodes.forEach( btn => {
  //   if (btn.innerHTML !== undefined){
  //     btn.addEventListener('click',
  //       playAction.bind(this, index)
  //     );
  //     index++;
  //   }
  // });

  // const anims = [
	// 				{start:489, end:548, name:"idle", loop:true},
  //         {start:300, end:344, name:"hit", loop:false, next:0},
	// 				{start:610, end:659, name:"jump", loop:false, next:0},
  //         {start:225, end:251, name:"die", loop:false},
	// 			];
  //Load meshes here
  const loader = new THREE.GLTFLoader();
  //loader.setPath(assetPath);

  loader.load('waveGltf.gltf', object => {
    mixer = new THREE.AnimationMixer(object.scene);
		//Uncomment block to see all actions
		//object.scene.children[0].rotation.x = 0;
		const action = mixer.clipAction(object.animations[0]);
		action.play();

		//Comment out from here to:
		/*
		mixer.addEventListener( 'finished', e => {
      if (e.action.next != undefined) playAction(e.action.next);
    } );
    object.scene.children[0].rotation.x = 0;
    actions = [];

    anims.forEach(anim => {
			const clip = subclip(object.animations[0], anim.name, anim.start, anim.end);
      const action = mixer.clipAction(clip);
      if (!anim.loop){
        action.loop = THREE.LoopOnce;
        action.clampWhenFinished = true;
      }
      if (anim.next!=undefined) action.next = anim.next;
      actions.push(action);
		});

    actions[0].play();
		*/
		//here ***
    object.scene.scale.set(.007,.007,.007);
    object.scene.position.y =  0; //Up and down
    object.scene.position.x = 0; //Left and right
    object.scene.position.z = 1.5;
    scene.add(object.scene);
    update();
  });

  //window.addEventListener( 'resize', resize, false);

}

function playAction(index){
  const action = actions[index];
  mixer.stopAllAction();
  action.reset();
  action.fadeIn(0.5);
  action.play();
}

function update(){
  requestAnimationFrame( update );
	renderer.render( scene, camera );
  const dt = clock.getDelta();
  mixer.update(dt);
}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( 550, 550);
};

function changeDiv(buttonId){
  // alert("Hello! I am an alert box!!");
  // console.log(buttonId);
  document.getElementById("container3Leadership").style.display = "none";
  document.getElementById("container3Programming").style.display = "none";
  document.getElementById("container3Design").style.display = "none";
  document.getElementById("container3Other").style.display = "none";


if (buttonId == "Leadership") {
document.getElementById("container3Leadership").style.display = "flex";
} 

if (buttonId == "Programming") {
  document.getElementById("container3Programming").style.display = "flex";
  } 

  if (buttonId == "Designing") {
    document.getElementById("container3Design").style.display = "flex";
    } 

    if (buttonId == "Other") {
      document.getElementById("container3Other").style.display = "flex";
      } 

};

function myFunction() {
  alert("Hello! I am an alert box!!");
};