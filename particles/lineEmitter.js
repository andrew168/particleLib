/**
 * Created by andrewz on 2015/12/1.
 */

function LineEmitter() {
    var pos,
        target = null,
        vel = null,
        color = "red",
        usePhysics = null;

    for (i=0; i< 20; i++ ) {
        pos = {
            x:i * 50
        };
        Fireworks.fire(pos, target, vel, color, usePhysics);
    }
}