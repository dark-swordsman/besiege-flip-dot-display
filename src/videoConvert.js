// I recommend putting this file in the same folder as your video + out directory
// for example, ./out would be a folder, sibling to this script

const fs = require("fs");
const path = require("path");

const dataOut = "./data.txt";
const framesOutput = "./out";

const dataFile = path.resolve(dataOut);
fs.writeFile(dataFile, "", (err, data) => {});
const framesDirectory = path.resolve(framesOutput);

// parameters

// RGB24 is 8 bits (indexes) per color. A row of 16 pixels, 3 colors each, is 48 indexes, or the 47th index
// 47th is specific to this display. It's simply PIXELS * 3 - 1, where 3 is RGB, and - 1 is accounting for the 0th index.
// topRow is when to start converting pixels. All pixels before this number are ignored
// bottomRow is when to top converting pixels. All pixels after this number are ignored
//    With 16 pixels, skipping 2 rows would be (16 * 3) * 2 - 1, so 95. (PIXELS * RGB) * ROWS - 1
const topRowSkip = 47;
const bottomRowSkip = 479;

fs.readdir(framesDirectory, (err, filenames) => {
  if (err) throw err;

  filenames.forEach((file) => {
    fs.readFile(`${framesDirectory}/${file}`, (err, buffer) => {
      if (err) throw err;

      const data = buffer.toJSON();
      console.log(data);

      let currentBit = 0;
      let currentRow = new Array();
      let newFrame = [];

      data.data.forEach((value, i) => {
        // ignore first and last two rows of data
        if (i > topRowSkip && i < bottomRowSkip) {
          if (i !== 0 && i % 3 === 0) {
            currentRow.push(currentBit / 3 > 127 ? 1 : 0);
            currentBit = 0;
          }

          if (i !== 0 && i % 47 === 0) {
            let bitValue = 0;

            currentRow.forEach((value, i) => {
              if (value === 1) {
                bitValue += 32768 / Math.pow(2, i);
              }
            });

            newFrame.push(bitValue);
            currentRow = new Array();
          }

          currentBit += value;
        }
      });

      fs.appendFileSync(dataFile, `[${newFrame}],\n`);
    });
  });
});
