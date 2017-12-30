"use strict";

class ThreePanel {

	constructor(id, options) {
		this.bindAll();
		this.initialize(id, options);
	}

	/**
	 * Bind all methods to the instance.
	 */
	bindAll(){
		var instance = this;

		function bind(name) {
			var method = instance[name];
			if (typeof method != "function"){ return; }
			instance[name] = function() { return method.apply(instance, arguments); };
		}

		for (var all in instance){ bind(all); }
	}

	initialize(id, options){

		// want ID to match render and animate to graphic
		this.id = id;
		this.options = options;
		this.parentDiv = options.div;
		this.parentDiv.renderId = id;

		this.camera = new THREE.PerspectiveCamera( 45, this.parentDiv.clientWidth / this.parentDiv.clientHeight, 1, 2000 );
		this.camera.position.z = (options.cameraZ || 500);
		this.renderer =  new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(this.parentDiv.clientWidth, this.parentDiv.clientHeight );

		this.scene = new THREE.Scene();

	    this.parentDiv.appendChild( this.renderer.domElement );

	    if (this.options.expandOff) {
	    	this.parentDiv.getElementsByClassName("expandImg")[0].style.display = "none";
	    }

	    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
	    this.controls.enableZoom = false;
	   
	   
	    // This is what we will do when someone resizes the screen
	    window.addEventListener( 'resize', this.onWindowResize, false );
	}


	onWindowResize(){

		this.camera.aspect = this.parentDiv.clientWidth / this.parentDiv.clientHeight;
		this.camera.updateProjectionMatrix();

	    this.renderer.setSize( this.parentDiv.clientWidth, this.parentDiv.clientHeight );
	}

	animate() {
		switch (this.id) {
			case 0: this.animate0(); break;
			case 1: this.animate1(); break;
			case 2: this.animate2(); break;
			case 3: this.animate3(); break;
		}
	}

	animate0() {    
	 //cancelAnimationFrame(this.animationFrame);
		this.animationFrame = requestAnimationFrame( this.animate0 );

		this.globe.rotation.x += 0.001;
		this.globe.rotation.y += 0.008;

		this.controls.update();

		this.render();
	}

	animate1() {
		this.animationFrame = requestAnimationFrame( this.animate1 );

		this.ring.rotation.y += 0.02;

		this.controls.update();
		this.render();
	}

	animate2() {    
		this.animationFrame = requestAnimationFrame( this.animate2 );

		this.line.rotation.y -= 0.005;

		this.controls.update();
		this.render();
	}

	animate3() {    
		this.animationFrame = requestAnimationFrame( this.animate3 );

		this.box.rotation.x += 0.001;
		this.box.rotation.y += 0.008;


		this.controls.update();
		this.render();
	}


	render () {
		this.renderer.render( this.scene, this.camera );
	}

	add(mesh){
		this.scene.add(mesh);
	}

	expandClick(index){
	    // gets id of two renderes to swap

	    var tMain = (document.getElementById("mainScreen").renderId);
	    var tSwap = (document.getElementById("sideScreen"+index).renderId);

	    console.log(tMain);
	    console.log(tSwap);

	    switch (tMain) {
	        case 0: screen0.parentDiv.removeChild( screen0.renderer.domElement ); break;
	        case 1: screen1.parentDiv.removeChild( screen1.renderer.domElement ); break;
	        case 2: screen2.parentDiv.removeChild( screen2.renderer.domElement ); break;
	        case 3: screen3.parentDiv.removeChild( screen3.renderer.domElement ); break;
	    }

	    switch (tSwap) {
	        case 0: screen0.parentDiv.removeChild( screen0.renderer.domElement ); break;
	        case 1: screen1.parentDiv.removeChild( screen1.renderer.domElement ); break;
	        case 2: screen2.parentDiv.removeChild( screen2.renderer.domElement ); break;
	        case 3: screen3.parentDiv.removeChild( screen3.renderer.domElement ); break;
	    }

	    switch (tMain) {
	        case 0: 
	            screen0.parentDiv = (tSwap == 1 ? screen1.parentDiv :
	                                (tSwap == 2 ? screen2.parentDiv : 
	                                              screen3.parentDiv ));  
	            screen0.parentDiv.appendChild(screen0.renderer.domElement);
	            screen0.onWindowResize();
	            break;
	        case 1: 
	             screen1.parentDiv = (tSwap == 0 ? screen0.parentDiv :
	                                 (tSwap == 2 ? screen2.parentDiv :
	                                               screen3.parentDiv ));
	             screen1.parentDiv.appendChild(screen1.renderer.domElement)
	             screen1.onWindowResize();
	            break;
	        case 2: 
	             screen2.parentDiv = (tSwap == 0 ? screen0.parentDiv :
	                                 (tSwap == 1 ? screen1.parentDiv :
	                                               screen3.parentDiv ));
	             screen2.parentDiv.appendChild(screen2.renderer.domElement)
	             screen2.onWindowResize();
	            break;
	        case 3: 
	             screen3.parentDiv = (tSwap == 0 ? screen0.parentDiv :
	                                 (tSwap == 1 ? screen1.parentDiv :
	                                               screen2.parentDiv ));
	             screen3.parentDiv.appendChild(screen3.renderer.domElement)
	             screen3.onWindowResize();
	            break;
	    }

	    switch (tSwap) {
	        case 0: screen0.parentDiv =  document.getElementById("mainScreen");
	                screen0.parentDiv.appendChild( screen0.renderer.domElement)
	                screen0.onWindowResize();
	                break;
	        case 1: screen1.parentDiv =  document.getElementById("mainScreen");
	                screen1.parentDiv.appendChild( screen1.renderer.domElement)
	                screen1.onWindowResize();
	                break;
	        case 2: screen2.parentDiv =  document.getElementById("mainScreen");
	                screen2.parentDiv.appendChild( screen2.renderer.domElement)
	                screen2.onWindowResize();
	                break;
	        case 3: screen3.parentDiv =  document.getElementById("mainScreen");
	                screen3.parentDiv.appendChild( screen3.renderer.domElement)
	                screen3.onWindowResize();
	                break;
	    }

	    document.getElementById("mainScreen").renderId = tSwap;
	    document.getElementById("sideScreen"+index).renderId = tMain;    
	}

}