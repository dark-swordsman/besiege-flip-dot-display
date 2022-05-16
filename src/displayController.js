/*
    Make sure to set the PIO for the code block, 00 through 08
    Here, we have 9 outputs, with the format: INPUT_X
*/

let data = [];
let currentFrame = 0;
const startOffset = 0;
const FPS = 30;

function main() {
  setTimeout(1 / FPS, () => {
    for (let i = 0; i < 9; i++) out(i, data[currentFrame][i] / 100000);

    currentFrame++;
    main();
  });
}

// offset, plus half FPS to have a buffer.
// This tries to ensure that the data is sent half a frame before the row processors pull the data
setTimeout(startOffset + 1 / FPS / 2, () => main());

data = []; // replace with video data
