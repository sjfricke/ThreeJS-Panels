var mainScreen, sideScreen1, sideScreen2, sideScreen3;

function init() {

    screen0 = new Screen( 0, {
        "div" : document.getElementById("mainScreen"), 
        "expandOff" : true
    });
    screen1 = new Screen( 1, {
        "div" : document.getElementById("sideScreen1"),
         "cameraZ" : 600 
     });
    screen2 = new Screen( 2, {
        "div" : document.getElementById("sideScreen2")
    });
    screen3 = new Screen( 3, {
        "div" : document.getElementById("sideScreen3")
    });

    var texture = new THREE.TextureLoader().load( '../textures/earth.jpg' );
    var geometry = new THREE.SphereGeometry( 200, 128, 128 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    screen0.globe = new THREE.Mesh( geometry, material );
    screen0.add( screen0.globe );

    geometry = new THREE.TorusGeometry( 150, 20, 8, 32 );
    material = new THREE.MeshBasicMaterial( {color: 0x0000FF} );
    screen1.ring = new THREE.Mesh( geometry, material );
    screen1.add( screen1.ring );

    geometry = new THREE.SphereBufferGeometry( 150, 16, 16  );
    var wireframe = new THREE.WireframeGeometry( geometry );
    screen2.line = new THREE.LineSegments( wireframe );
    screen2.line.material.depthTest = false;
    screen2.line.material.opacity = 0.25;
    screen2.line.material.transparent = true;
    screen2.add( screen2.line );

    geometry = new THREE.BoxGeometry( 200, 200, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x00FFFF} );
    screen3.box = new THREE.Mesh( geometry, material );
    geometry = new THREE.PlaneGeometry( 400, 400 );
    material = new THREE.MeshLambertMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide}  );
    mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = -150;
    var directionalLight1 = new THREE.DirectionalLight( 0xFFFFFF, 0.5 );
    var directionalLight2 = new THREE.DirectionalLight( 0xFFFFFF, 0.5 );
    directionalLight2.position.set( 1, 1, 1 );
    screen3.add( screen3.box );
    screen3.add( mesh );
    screen3.add( directionalLight1 );
    screen3.add( directionalLight2 );

    screen0.animate();
    screen1.animate();
    screen2.animate();
    screen3.animate();
}

function expandClick(index){
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