// Add pixels to container
const pixels = [];
const size = 300;
const container = document.querySelector(".container");
for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    const pixelsArray = [];
    for (let j = 0; j < size; j++) {
        const pixel = document.createElement("div");
        row.appendChild(pixel);
        pixelsArray.push(pixel);
    }
    container.appendChild(row);
    pixels.push(pixelsArray);
}

// Handle drawing
let isMouseClickedDown = false;
document.addEventListener("mousedown", () => {
    isMouseClickedDown = true;
});
document.addEventListener("mouseup", () => {
    isMouseClickedDown = false;
});
document.addEventListener("mousemove", (event) => {
    if (isMouseClickedDown) {
        const pixelsNearMouse = getPixelsNearMouse(event.x, event.y);
        for (const pixelNearMouse of pixelsNearMouse) {
            pixelNearMouse.style.backgroundColor = "#ff0000";
        }
    }
});

const brushSize = 10;
const getPixelsNearMouse = (mouseX, mouseY) => {
    const pixelsNearMouse = [];
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            const x = j;
            const y = i;
            const dX = mouseX - x;
            const dY = mouseY - y;
            const distance = Math.sqrt(dX**2 + dY**2);
            if (distance < brushSize) {
                const pixel = pixels[i][j];
                pixelsNearMouse.push(pixel);
            }
        }
    }
    return pixelsNearMouse;
};
