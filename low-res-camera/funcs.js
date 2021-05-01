var video = document.querySelector("#videoElement");

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

//Set my "fucked" dimensions
var fWidth = 19;
var fHeight = 51;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true})
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}



// Grab thing, put it in canvas, hide video element, enable text area, show save Memory button, hide take picture button
function takePicture() {
  console.log("is trying ot take a screenshot at least");
  // Take picture and put it on canvas
  context.drawImage(video, 0, 0, fWidth, fHeight );

  // Ruin the fuck out of this thing
  //context.imageSmoothingEnabled = false;
  // enlarge the minimized image to full size    
  context.drawImage(canvas, 0, 0, fWidth, fHeight, 0, 0, canvas.width, canvas.height);

  //show canvas, hide video
  video.style.display = "none";
  canvas.style.display = "block";
  //show memory, hide picture buttons
  document.getElementById("takePicture").style.display = "none";
  document.getElementById("saveMemory").style.display = "block";
}


//save the two together as an img somehow, then show video element, hide canvas, disable text area, show take pic button, hide save memory button
function saveMemory() {
  //show video, hide canvas
  video.style.display = "block";
  canvas.style.display = "none";
  //show picture, hide memory buttons
  document.getElementById("takePicture").style.display = "block";
  document.getElementById("saveMemory").style.display = "none";
}