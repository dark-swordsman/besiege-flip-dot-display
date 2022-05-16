/*
    Make sure to set the PIO for the code block:

    00 will be INPUT_X
    01-16 will be the PixelIDs

    PixelID is recommended as: [row][column], where row is 1 digit, column is 2 digits
    For example: 3rd row, 5th pixel would be `204`, 4th row 1st pixel would be `300`
*/

const FPS = 30;

function main() {
  setTimeout(1/FPS, () => {
    const _data = Math.round(in(0) * 100000).toString(2);
    let data = "";

    if (16 - _data.length > 0) {
      data = (new Array(16 - _data.length).fill(0)).join("") + _data;
    } else {
      data = _data;
    }
    
    const dataArray = data.split("");

    dataArray.forEach((value, i) => {
      out(i + 1, value);
    });
    
    main();
  });
}

main();