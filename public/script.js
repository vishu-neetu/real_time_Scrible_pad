// getting the element canvas
var canvas = document.getElementById('myCanvas');

// specify the url link where app will be hosted 
// here it is blank since deployed on hereko 
var io = io.connect('')

// getting the 2D context
var ctx = canvas.getContext('2d');
let x;
let y;
// to check wheather is mouse is pressed or not
let mouseDown = false;
let touchStart = false;

colors = ['#ff0000','#99ffcc','#000099'];
colo = colors[Math.floor(Math.random() * 3)];

window.onmousedown = (e) => {
    // moving the mouse to new place for all other people 
    // connected other than the writing one
    ctx.moveTo(x,y);
    io.emit('down', {x,y})
    mouseDown = true;
}
window.ontouchstart = (e) => {
    // moving the mouse to new place for all other people 
    // connected other than the writing one
    ctx.moveTo(x,y);
    io.emit('down', {x,y})
    touchStart = true;
}

// check wheather mouse is not clicked
window.onmouseup = (e) => {
    mouseDown = false;
}

window.ontouchend = (e) => {
    touchStart = false;
}

// drwaing 
io.on('ondraw',({x, y, c})=>{
    ctx.lineTo(x,y);
    ctx.strokeStyle = c;
    ctx.stroke();
    
});

// move the mouse to new place without drawing from the last point
io.on('ondown',({x, y})=>{
    ctx.moveTo(x,y);
});

// checking the event of mouse moving
window.onmousemove = (e)=>{
    // getting x and y coordinate on the canvas screen
    x = e.clientX;
    y = e.clientY;
    c = colo;

    if (mouseDown) {
        io.emit('draw', { x, y, c});
        ctx.lineTo(x, y);
        ctx.strokeStyle = c;
        ctx.stroke();
    };
};

window.ontouchmove = (e)=>{
    // getting x and y coordinate on the canvas screen
    x = e.clientX;
    y = e.clientY;
    c = colo;

    if (touchStart) {
        io.emit('draw', { x, y, c});
        ctx.lineTo(x, y);
        ctx.strokeStyle = c;
        ctx.stroke();
    };
};