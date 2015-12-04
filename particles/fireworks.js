/**
 * Created by andrewz on 2015/12/1.
 */
var Fireworks = (function () {
    // declare the variables we need
    var particles = [],
        mainCanvas = null,
        mainContext = null,
        auxCanvas = null,
        auxContext = null,
        viewportWidth = 0,
        viewportHeight = 0;

    /**
     * Create DOM elements and get your game on
     */
    function initialize(option) {
        mainCanvas = option.mainCanvas;
        mainContext = option.mainContext;
        auxCanvas = option.auxCanvas;
        auxContext = option.auxContext;

        // start by measuring the viewport
        onWindowResize();

        // set up the colours for the fireworks
        createPalette(12);

        // set the dimensions on the canvas
        setMainCanvasDimensions();

        // and now we set off
        oneLoop();
    }

    /**
     * Pass through function to create a
     * new firework on touch / click
     */
    function fire(pos, target, vel, color, usePhysics) {
        createParticle(pos, target, vel, color, usePhysics);
    }

    /**
     * Creates a block of colours for the
     * fireworks to use as their colouring
     */
    function createPalette(gridSize) {
        var size = gridSize * 10;
        auxCanvas.width = size;
        auxCanvas.height = size;
        auxContext.globalCompositeOperation = 'source-over';

        // create 100 blocks which cycle through
        // the rainbow... HSL is teh r0xx0rz
        for (var c = 0; c < 100; c++) {
            var marker = (c * gridSize);
            var gridX = marker % size;
            var gridY = Math.floor(marker / size) * gridSize;

            auxContext.fillStyle = "hsl(" + Math.round(c * 3.6) + ",100%,60%)";
            auxContext.fillRect(gridX, gridY, gridSize, gridSize);
            auxContext.drawImage(
                Library.bigGlow,
                gridX,
                gridY);
        }
    }

    /**
     * Update the canvas based on the
     * detected viewport size
     */
    function setMainCanvasDimensions() {
        mainCanvas.width = viewportWidth;
        mainCanvas.height = viewportHeight;
    }

    /**
     * The main loop where everything happens
     */
    function oneLoop() {
        update();
        clearContext();
        render();
        requestAnimFrame(oneLoop);
    }

    /**
     * Clears out the canvas with semi transparent
     * black. The bonus of this is the trails effect we get
     */
    function clearContext() {
        mainContext.fillStyle = "rgba(0,0,0,0.2)";
        mainContext.fillRect(0, 0, viewportWidth, viewportHeight);
    }

    /**
     * Passes over all particles particles
     * and draws them
     */
    function render() {
        var a = particles.length;
        while (a--) {
            particles[a].render(mainContext, auxCanvas);
        }
    }

    function update() {
        var a = particles.length;
        while (a--) {
            var p = particles[a];

            // if the update comes back as true
            // then our firework should explode
            if (p.isDead()) {

                // kill off the firework, replace it
                // with the particles for the exploded version
                particles.splice(a, 1);

                // if the firework isn't using physics
                // then we know we can safely(!) explode it... yeah.
                if (!p.usePhysics) {
                    if (Math.random() < 0.8) {
                        FireworkExplosions.star(p);
                    } else {
                        FireworkExplosions.circle(p);
                    }
                }
            } else {
                p.update();
            }
        }
    }

    /**
     * Creates a new particle / firework
     */
    function createParticle(pos, target, vel, color, usePhysics) {
        pos = pos || {};
        target = target || {};
        vel = vel || {};

        particles.push(
            new Particle(
                // position
                {
                    x: pos.x || viewportWidth * 0.5,
                    y: pos.y || viewportHeight + 10
                },

                // target
                {
                    y: target.y || 150 + Math.random() * 100
                },

                // velocity
                {
                    x: vel.x || Math.random() * 3 - 1.5,
                    y: vel.y || 0
                },

                color || Math.floor(Math.random() * 100) * 12,

                usePhysics)
        );
    }

    /**
     * Callback for window resizing -
     * sets the viewport dimensions
     */
    function onWindowResize() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
    }

    // declare an API
    return {
        initialize: initialize,
        createParticle: createParticle,
        fire: fire
    };
})();
