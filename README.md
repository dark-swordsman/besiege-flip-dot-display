# Besiege Flip-Dot Display

<div align="center">
  <h3>
    <a href="https://www.youtube.com/watch?v=6ODttESd138">Bad Apple Video</a>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="https://www.youtube.com/watch?v=6Qlr-N-vw4A">Video Guide</a>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2809012624">Steam Workshop Page</a>
  </h3>
</div>

<hr />

To see it in action, checkout the <a href="https://www.youtube.com/watch?v=6ODttESd138">Bad Apple Video</a>.

To see an explanation of how it works, checkout the <a href="https://www.youtube.com/watch?v=6Qlr-N-vw4A">Video Guide</a>.

<hr /> 

### What is this?

This is a small project I did with JavaScript and [Besiege](https://store.steampowered.com/app/346010/Besiege/). 

The basic premise is that this is a flip dot display that is powered by JavaScript. I was inspired by [this video](https://www.youtube.com/watch?v=ko0z3SfXpm8).

I wanted to create something like this in Besiege. Of course I could use the Lua mod which would directly interact with the game engine and allow for [more precise control](https://www.youtube.com/watch?v=S1k6Un_VydI) (not my project), but I feel like going beyond the bounds of the game is cheating, kind of. Still good work and is very cool, but it'd be no different than just outputting to really any other display, or say to a JS canvas.

I wanted to have a challenge, which this certainly did present. I was somewhat limited in performance, so to be able to debug real-time I was maxed out to a 16x9 pixel display at 50% physics speed. I was also limited by how fast the steering hinges could turn. Even using FPIO which should theoretically instantly turn the steering hinges (which flip the dots), it was limited by it's mass and the power of the steering hinge.

Not only that, but the Code Blocks in Logic Extensions was limited to 100 PIO variables per Code Block, where each variable could only accept a 16(?) bit floating point number between 0 and 1.

The flow is as follows:

- take any video and run it through ffmpeg
  - example: `ffmpeg -i input.mkv -vf scale=16:-1:flags=neighbor -pix_fmt rgb24 out/frame_%08d.raw`
  - converting it to a small video with nearest neighbor scaling
  - output to raw frames (a grayscale format would be better, but RGB24 worked in this case)
- use the convert.js script to import the raw images and then output a file that is a single array
  - the script combines the RGB values and then binarizes at `127` (<127 was black pixels, 127 or higher is white pixels)
  - the array is a 2D array, where each internal array is 9 length (1 integer for each row)
  - each integer is a decimal representation of a 16 bit binary number
- pasting the data into the data controller, the video will play
  - the data controller reads each decimal number and sends it to the row processors that drive each row of pixels
  - the row processor converts the decimal to a binary array, and iterates over the array to set 1 or 0 for each pixel to display
