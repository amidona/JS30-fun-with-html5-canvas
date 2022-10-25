const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round"; //how the line intersects with another
ctx.lineCap = "round"; //how the line ends
ctx.lineWidth = 100;
//ctx.globalCompositeOperation = "multiply"; //blends the colors as you stack them over each other

let isDrawing = false;
let lastX = 0; //where do you start the line from
let lastY = 0; //where do you end the line
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; //stop the fn from running when they are not moused down
    //console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); //start from
    ctx.lineTo(e.offsetX, e.offsetY); //go to
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++; //incrementally increases it, which changes the color as you draw
    if (hue >= 360) {
        hue = 0
    };
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction; //flips direction width is growing or shrinking
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--; //incrementally decreases
    }

}
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", () => isDrawing = false); //stop drawing when you release the mouse
canvas.addEventListener("mouseout", () => isDrawing = false); //stop drawing whe your mouse leaves the window