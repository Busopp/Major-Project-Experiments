var video = document.querySelector("#videoElement");

var pixelCanvas = document.getElementById("lowResPic");
var context = pixelCanvas.getContext("2d");

var textArea = document.getElementById("notes");

var saveCanvas = document.getElementById("saveable");
var saveableContext;
textArea.disabled = true;
//Set my "fucked" dimensions
var fWidth = 51;
var fHeight = 99;

var memText = "";

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, facingMode: 'environment'})
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}



// Grab thing, put it in pixelCanvas, hide video element, enable text area, show save Memory button, hide take picture button
function takePicture() {
  console.log("is trying ot take a screenshot at least");
  // Take picture and put it on pixelCanvas
  context.drawImage(video, 0, 0, fWidth, fHeight );

  // Ruin the fuck out of this thing
  //context.imageSmoothingEnabled = false;
  // enlarge the minimized image to full size    
  context.drawImage(pixelCanvas, 0, 0, fWidth, fHeight, 0, 0, pixelCanvas.width, pixelCanvas.height);

  //show pixelCanvas, hide video
  video.style.display = "none";
  pixelCanvas.style.display = "block";
  //show memory, hide picture buttons
  document.getElementById("takePicture").style.display = "none";
  document.getElementById("saveMemory").style.display = "block";

  // Enble text area
  textArea.disabled = false;
}


//save the two together as an img somehow, then show video element, hide pixelCanvas, disable text area, show take pic button, hide save memory button
function saveMemory() {
  //show video, hide pixelCanvas
  video.style.display = "block";
  pixelCanvas.style.display = "none";
  //show picture, hide memory buttons
  document.getElementById("takePicture").style.display = "block";
  document.getElementById("saveMemory").style.display = "none";
  memText = textArea.value;
  // Disable and empty text area
  textArea.disabled = true;
  textArea.value = "";
  // Save the collection as a png somehow
  frankenstein();

}



// add the pixelCanvas on one side of the bottom canvas, and the textArea value 
// on the other in the weird format, and then export is as dataURL
function frankenstein() {
  console.log("defs running the smoosh together function")
  //take current canvas and slap on the left hand side
  saveCanvas.width=1280;//horizontal resolution (?) - increase for better looking text
  saveCanvas.height=720;//vertical resolution (?) - increase for better looking text
  //saveCanvas.style.width=width;//actual width of canvas
  //saveCanvas.style.height=height;
  saveableContext = saveCanvas.getContext("2d");
  saveableContext.drawImage(pixelCanvas, 0, 0, saveCanvas.width/2, saveCanvas.height/2);
  saveableContext.font = saveableContext.font.replace(/\d+px/, "22px");

  // parse memText and make it into commaed /n'd form
  formattedText = addItemEvery(memText, ", ", 30);
  formattedText = memText.match(/.{1,60}/g)
  document.getElementById("testspace").innerHTML = formattedText;
  console.log(formattedText);

  //slap parsed text on the right side of the image
  formattedText.forEach(printArrayCanvas);
  console.log(saveCanvas.width/2, saveCanvas.height/2);

  

  //save to local
  var image = saveCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  window.location.href=image;

}


//Printe array onto canvas
function printArrayCanvas(item, index) {
  saveableContext.fillText(item, 640, (40*(index+1)));
}

// turns "asdyeguio3qwnoqnwwwq" into "asda'item'ysagfq'item'iusfds" or whatever
function addItemEvery (str, item, every){
  for(let i = 0; i < str.length; i++){
    if(!(i % (every + 1))){
      str = str.substring(0, i) + item + str.substring(i);
    }
   }
  return str.substring(1);
}