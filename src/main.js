var renderer;
var scene;
var fluid_animator;
var camera;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var dim;

// Define the global BT2D namespace.

function init() {

    //Create a new scene.
    //FIXME: Import an SVG or some other sort of non hard coded scene.
    scene = new SVE.Scene();
    var rows    = 10;
    var columns = 10;
    dim = {x:0, y:0, w:window.innerWidth, h:innerHeight};
    var density = scene.allocate_grid(rows, columns, dim);

    fluid_animator = new SVE.Fluid(density, rows, columns);


    camera = new THREE.OrthographicCamera( 0, dim.w, 0, dim.h, 1, 1000 );
    camera.position.z = 2;


    container = document.getElementById( 'container' );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );
 
    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false);
    //window.addEventListener("keypress", onKeyPress);
    window.addEventListener("keydown", onKeyPress);

    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("drag", onMouseDrag);

    animate();
}


// Input Events.
function onWindowResize( event )
{
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyPress( event )
{
    var LEFT  = 37
    var RIGHT = 39
    
       
    switch(event.which)
    {
        case LEFT:
            console.log("LEFT")
            break;
        case  RIGHT:
            console.log("RIGHT")
            break;
        default:
            break;
    }
}

function onMouseMove( event )
{

    var mouse_x = (event.x*1.0/window.innerWidth  - .5) * 100;
    var mouse_y = (event.y*1.0/window.innerHeight - .5) * -100;
    var mouse_changed = true;

}

function onMouseDrag( event )
{

    var x = (event.x*1.0/window.innerWidth);
    var y = (event.y*1.0/window.innerHeight);
    var mouse_changed = true;

    fluid_animator.add_fluid(x, y);

}


function animate() {

    requestAnimationFrame( animate );

    // Animate the fluid.
    fluid_animator.update();
    scene.update();

    render();

}

function render() {
    // We render the scene using the three.js screen renderer and the Beam Tracer scene model.
    scene.render(renderer, camera);
}

init();
animate();